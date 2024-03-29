import React, { useContext, useEffect, useState } from 'react';
import { PageHeader, Layout, Spin, Typography, Table, Tag } from 'antd';
import Breadcrumb from '../../components/pages/schedule/Breadcrumb';
import styles from './index.module.scss';
import AuthContext from '../../components/stores/AuthContext';
import useNotLoggedInRedirection from '../../components/hocs/useNotLoggedInRedirection';
import { PageContent } from '../../components/layout/content/page-content';
import gql from 'graphql-tag';
import { useLazyQuery } from 'react-apollo';
import { getLongGroupName } from '../../helpers/groups';
import GradeMark, { getReadableGrade } from '../../components/shared/grade-mark/GradeMark';
import Link from 'next/link';

const PAGE_NAME = 'Zajęcia i obecności';

export const GET_GROUP = gql`
    query Group($id: ID!) {
        group(id: $id) {
            id
            modeOfStudy
            fieldOfStudy
            groupNumber
            groupHalf
            courseName
            link
            description
            isActive
            classes {
                id
                classNumber
                takenOn
                title
                isReportRequired
            }
            grades {
                id
                groupId
                userId
                grade
                gradedOn
            }
            attendances {
                id
                groupId
                classId
                userId
                isPresent
                reportGrade
                reportAddedOn
                reportFile
            }
        }
    }
`;

interface SchedulePageProps {}

const SchedulePage: React.FC<SchedulePageProps> = () => {
    useNotLoggedInRedirection();
    const { state: authState, currentGroup } = useContext(AuthContext);
    const { user, isInitialized } = authState;
    const [getCurrentGroup, { data }] = useLazyQuery(GET_GROUP);
    const [grade, setGrade] = useState(null);
    const [classes, setClasses] = useState(null);

    useEffect(() => {
        if (currentGroup) {
            getCurrentGroup({ variables: { id: currentGroup.id } });
        }
    }, [currentGroup]);

    useEffect(() => {
        if (data && data.group && user) {
            const group = data.group;
            setGrade(group.grades.find(grade => grade.userId === user.album) || {});
            setClasses(
                group.classes.map(cls => {
                    const attendance = group.attendances.find(a => a.classId === cls.id);
                    cls.attendance = attendance;
                    return cls;
                }) || [],
            );
        }
    }, [data, user]);

    return (
        <Layout className={styles.root} style={{ padding: '0 24px 24px' }}>
            <Breadcrumb />
            <PageContent>
                <PageHeader ghost={false} title={PAGE_NAME} />
                {(!data || !isInitialized || !user) && <Spin size="large" />}
                {isInitialized && user && data && grade && classes && (
                    <>
                        <Typography.Title level={3}>{data.group.courseName}</Typography.Title>
                        <Typography.Paragraph>{getLongGroupName(data.group)}</Typography.Paragraph>
                        <Typography.Paragraph><strong>Link do materiałów:</strong> {data.group.link ? <a href={data.group.link}>{data.group.link}</a> : 'brak'}</Typography.Paragraph>
                        <Typography.Paragraph>
                            <strong>Ocena końcowa:</strong>{' '}
                            {grade.grade ? (
                                <GradeMark grade={grade.grade} gradedOn={grade.gradedOn} />
                            ) : (
                                'jeszcze niewystawiona'
                            )}
                        </Typography.Paragraph>
                        <Typography.Title level={4}>Zajęcia</Typography.Title>
                        {classes.length > 0 && (
                            <Table
                                dataSource={classes}
                                rowKey="id"
                                pagination={false}
                                columns={[
                                    {
                                        title: '#',
                                        dataIndex: 'classNumber',
                                        key: 'classNumber',
                                    },
                                    {
                                        title: 'Data',
                                        dataIndex: 'takenOn',
                                        key: 'takenOn',
                                        render: val => new Date(val).toLocaleDateString(),
                                    },
                                    {
                                        title: 'Tytuł',
                                        dataIndex: 'title',
                                        key: 'title',
                                        render: val => <strong>{val}</strong>,
                                    },
                                    {
                                        title: 'Raport wymagany?',
                                        dataIndex: 'isReportRequired',
                                        key: 'isReportRequired',
                                        render: val => (val ? 'tak' : 'nie'),
                                    },
                                    {
                                        title: 'Raport przesłany?',
                                        dataIndex: 'attendance.reportFile',
                                        key: 'reportFile',
                                        render: (val, entry: any) => {
                                            if (!entry.isReportRequired) {
                                                return 'niewymagany';
                                            }
                                            const date = entry.attendance && entry.attendance.reportAddedOn;
                                            return val ? (
                                                <>
                                                    tak {date ? `(${new Date(date).toLocaleDateString()})` : ''}
                                                </>
                                            ) : (
                                                <>
                                                    nie (
                                                    <Link href="/reports">
                                                        <a>prześlij</a>
                                                    </Link>
                                                    )
                                                </>
                                            );
                                        },
                                    },
                                    {
                                        title: 'Obecność',
                                        dataIndex: 'attendance.isPresent',
                                        key: 'isPresent',
                                        render: (val, entry: any) =>
                                            entry.attendance ? (
                                                val ? (
                                                    <Tag color="green">obecność</Tag>
                                                ) : (
                                                    <Tag color="red">nieobecność</Tag>
                                                )
                                            ) : (
                                                <Tag color="gray">niesprawdzona</Tag>
                                            ),
                                    },
                                    {
                                        title: 'Ocena',
                                        dataIndex: 'attendance.reportGrade',
                                        key: 'reportGrade',
                                        render: val => (val ? <GradeMark grade={val} /> : 'brak'),
                                    },
                                ]}
                            />
                        )}
                        {classes.length === 0 && (
                            <Typography.Paragraph>Jeszcze nie odbyły się żadne zajęcia.</Typography.Paragraph>
                        )}
                    </>
                )}
            </PageContent>
        </Layout>
    );
};

export default SchedulePage;
