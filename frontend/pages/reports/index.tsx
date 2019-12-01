import { Button, Icon, Layout, PageHeader, Spin, Table, Typography } from 'antd';
import gql from 'graphql-tag';
import React, { useContext, useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from 'react-apollo';
import useNotLoggedInRedirection from '../../components/hocs/useNotLoggedInRedirection';
import { PageContent } from '../../components/layout/content/page-content';
import Breadcrumb from '../../components/pages/schedule/Breadcrumb';
import GradeMark from '../../components/shared/grade-mark/GradeMark';
import AuthContext from '../../components/stores/AuthContext';
import { getLongGroupName } from '../../helpers/groups';
import styles from './index.module.scss';

const PAGE_NAME = 'Sprawozdania';

const UPLOAD_REPORT = gql`
    mutation UploadReport($file: Upload!, $attendance: InputReportAttendance!) {
        uploadReport(file: $file, attendance: $attendance) {
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
`;

const REMOVE_REPORT = gql`
    mutation RemoveReport($attendance: InputReportAttendance!) {
        removeReport(attendance: $attendance) {
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
`;

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

interface ReportsPageProps {}

const ReportsPage: React.FC<ReportsPageProps> = () => {
    useNotLoggedInRedirection();
    const { state: authState, currentGroup } = useContext(AuthContext);
    const { user, isInitialized } = authState;
    const [getCurrentGroup, { data }] = useLazyQuery(GET_GROUP);
    const [uploadReport, { data: uploadData }] = useMutation(UPLOAD_REPORT);
    const [removeReport] = useMutation(REMOVE_REPORT);
    const [grade, setGrade] = useState(null);
    const [classes, setClasses] = useState(null);

    useEffect(() => {
        if (currentGroup) {
            getCurrentGroup({ variables: { id: currentGroup.id } });
        }
    }, [currentGroup]);

    useEffect(() => {
        const group = data && data.group;
        if (group && user) {
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

    useEffect(() => {
        const attendance = uploadData && uploadData.uploadReport;
        if (attendance) {
            setClasses(
                classes.map(cls => {
                    if (cls.id === attendance.classId) {
                        cls.attendance = attendance;
                    }
                    return cls;
                }),
            );
        }
    }, [uploadData]);

    const handleUpload = async (
        {
            target: {
                validity,
                files: [file],
            },
        }: any,
        entry,
    ) => {
        const attendance = {
            id: (entry.attendance && entry.attendance.id) || null,
            classId: entry.id,
            userId: user.album,
            groupId: Number(currentGroup.id),
        };
        validity.valid && uploadReport({ variables: { file, attendance } });
    };

    const handleRemoveReport = entry => {
        const attendance = {
            id: (entry.attendance && entry.attendance.id) || null,
            classId: entry.id,
            userId: user.album,
            groupId: Number(currentGroup.id),
        };
        removeReport({ variables: { attendance } });
    };

    return (
        <Layout className={styles.root} style={{ padding: '0 24px 24px' }}>
            <Breadcrumb />
            <PageContent>
                <PageHeader ghost={false} title={PAGE_NAME} />
                {(!classes || !data || !isInitialized || !user) && <Spin size="large" />}
                {isInitialized && user && data && grade && classes && (
                    <>
                        <Typography.Title level={3}>{data.group.courseName}</Typography.Title>
                        <Typography.Paragraph>{getLongGroupName(data.group)}</Typography.Paragraph>
                        <Typography.Title level={4}>Sprawozdania</Typography.Title>
                        {classes.length > 0 && (
                            <Table
                                dataSource={classes}
                                rowKey="id"
                                pagination={false}
                                columns={[
                                    {
                                        title: 'Numer',
                                        dataIndex: 'classNumber',
                                        key: 'classNumber',
                                    },
                                    {
                                        title: 'Tytuł',
                                        dataIndex: 'title',
                                        key: 'title',
                                        render: val => <strong>{val}</strong>,
                                    },
                                    {
                                        title: 'Wymagane?',
                                        dataIndex: 'isReportRequired',
                                        key: 'isReportRequired',
                                        render: val => (val ? 'tak' : 'nie'),
                                    },
                                    {
                                        title: '',
                                        dataIndex: 'attendance.reportFile',
                                        key: 'action',
                                        render: (val, entry: any) => {
                                            const attendance = entry.attendance || {};
                                            if (attendance.reportGrade) {
                                                return 'już oceniono';
                                            }
                                            if (!entry.isReportRequired) {
                                                return 'niewymagane';
                                            }
                                            return val ? (
                                                <>
                                                    <Button type="danger" onClick={() => handleRemoveReport(entry)}>
                                                        <Icon type="delete" /> usuń
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <input
                                                        type="file"
                                                        required
                                                        onChange={file => handleUpload(file, entry)}
                                                        hidden
                                                        id={entry.classNumber}
                                                    />

                                                    <Button type="primary" htmlType="submit">
                                                        <label htmlFor={entry.classNumber}>
                                                            <Icon type="upload" /> prześlij
                                                        </label>
                                                    </Button>
                                                </>
                                            );
                                        },
                                    },
                                    {
                                        title: 'Plik',
                                        dataIndex: 'attendance.reportFile',
                                        key: 'reportFile',
                                        render: (val, entry: any) =>
                                            val ? (
                                                <a
                                                    href={
                                                        "http://localhost:4000/" + entry.attendance.reportFile
                                                    }
                                                    target="blank"
                                                >
                                                    <Button type="link">zobacz</Button>
                                                </a>
                                            ) : (
                                                'nieprzesłany'
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

export default ReportsPage;
