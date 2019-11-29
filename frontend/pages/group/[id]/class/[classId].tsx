import React, { useContext, useState, useEffect } from 'react';
import { PageHeader, Layout, Spin, Button, Radio, Typography, Result, Descriptions, Table } from 'antd';
import { NextPage, NextPageContext } from 'next';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import Breadcrumb from '../../../../components/pages/group/Breadcrumb';
import styles from './index.module.scss';
import AuthContext from '../../../../components/stores/AuthContext';
import { PageContent } from '../../../../components/layout/content/page-content';
import useNotAdminRedirection from '../../../../components/hocs/useNotAdminRedirection';
import { useMutation, useLazyQuery, useQuery } from 'react-apollo';
import { getLongGroupName } from '../../../../helpers/groups';

const PAGE_NAME = 'Szczegóły tematu zajęć';

export const GET_CLASS = (id, groupId) => gql`
    {
        class(id: ${id}, groupId: ${groupId}) {
            id
            classNumber
            takenOn
            title
            isReportRequired
            group {
                id
                modeOfStudy
                fieldOfStudy
                groupNumber
                groupHalf
                courseName
                users {
                    album
                    firstName
                    lastName
                }
            }
            attendances {
                id
                classId
                groupId
                userId
                isPresent
                isReportRequired
                reportFile
                reportGrade
                reportAddedOn
            }
        }
    }
`;

const PUT_ATTENDANCE = gql`
    mutation PutAttendance(
        $id: Int
        $classId: Int!
        $userId: Int!
        $groupId: Int!
        $isPresent: Boolean
        $reportFile: String
        $reportGrade: Int
        $reportAddedOn: Date
    ) {
        putAttendance(
            attendance: {
                id: $id
                classId: $classId
                userId: $userId
                groupId: $groupId
                isPresent: $isPresent
                reportFile: $reportFile
                reportGrade: $reportGrade
                reportAddedOn: $reportAddedOn
            }
        )
    }
`;

const defaultStudentColumns = (isReportRequired, onPresenceCheck) => [ // TODO isReportRequired, onReportRate, onPresenceCheck, onEmailSend
    {
        title: 'Album',
        dataIndex: 'album',
        key: 'album',
    },
    {
        title: 'Imię',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Nazwisko',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: 'Sprawozdanie',
        dataIndex: 'isReportRequired',
        key: 'isReportRequired',
        render: (_, entry) => {
            const reportFile = entry.reportFile ? `przesłane ${new Date(entry.reportAddedOn).toLocaleDateString()}` : 'jeszcze nieprzesłane';
            return isReportRequired ? reportFile : 'niewymagane';
        },
    },
    {
        title: 'Ocena',
        dataIndex: 'reportGrade',
        key: 'reportGrade',
        render: (val, entry) => {
            const grade = (
                <>
                    <Radio.Group defaultValue={val ? val : ''} buttonStyle="solid">
                        <Radio.Button value="20">2</Radio.Button>
                        <Radio.Button value="30">3</Radio.Button>
                        <Radio.Button value="35">3.5</Radio.Button>
                        <Radio.Button value="40">4</Radio.Button>
                        <Radio.Button value="45">4.5</Radio.Button>
                        <Radio.Button value="50">5</Radio.Button>
                    </Radio.Group>
                </>
            )
            const render = isReportRequired ? grade : 'niewymagane';
            return render;
        },
    },
    {
        title: 'Czy obecny?',
        dataIndex: 'attendance',
        key: 'attendance',
        render: (val, entry) => {
            const handleClick = e => {
                onPresenceCheck(e, entry);
            }
            const isPresent = entry.isPresent ? 'tak' : 'nie';
            const text = val ? isPresent : 'niesprawdzone';
            return (
                <>
                    <Radio.Group defaultValue={val ? val : ''} buttonStyle="solid">
                        <Radio.Button value="0" onClick={handleClick}>nie</Radio.Button>
                        <Radio.Button value="1" onClick={handleClick}>tak</Radio.Button>
                    </Radio.Group>
                </>
            );
        },
    },
];

interface ClassPage {}

const ClassPage: NextPage<ClassPage> = () => {
    useNotAdminRedirection();
    const { state: authState } = useContext(AuthContext);
    const router = useRouter();
    const groupId = router && router.query && router.query.id;
    const classId = router && router.query && router.query.classId;
    const { loading, error, data } = useQuery(GET_CLASS(classId, groupId));
    const [putAttendance, { loading: putAttendanceLoading, data: putAttendanceData, error: putAttendanceError }] = useMutation(PUT_ATTENDANCE);

    if (loading) return <Spin tip="Ładowanie..." style={{ marginTop: 50 }} />;
    if (error) return <Result status="error" title="Wystąpił błąd!" subTitle={error.message} />;

    const { class: classEntity } = data;
    const { group: { users = [] } = {}, attendances } = classEntity;
    const usersAttendances = users.map(user => {
        const attendance = attendances.find(a => a.userId === user.album);
        return {
            ...attendance,
            ...user,
            attendance,
        };
    });

    const handlePresenceCheck = (e, user) => {
        const attendance = {} as any;
        attendance.userId = Number(user.album);
        if (user.attendance && user.attendance.id) {
            attendance.id = Number(user.attendance.id);
        };
        attendance.classId = Number(classId);
        attendance.groupId = Number(groupId);
        attendance.isPresent = !!Number(e.target.value);
        console.log(e.target);
        putAttendance({ variables: attendance });
    };

    const userColumns = defaultStudentColumns(classEntity.isReportRequired, handlePresenceCheck)

    return (
        <Layout className={styles.root}>
            <Breadcrumb id={router && router.query && router.query.id} />
            <PageContent>
                <PageHeader ghost={false} title={PAGE_NAME} />
                {!loading || (!authState.isInitialized && !authState.user && <Spin size="large" />)}
                {data && authState.isInitialized && authState.user && authState.user.isAdmin && (
                    <>
                        <Typography.Title level={3}>Temat: {classEntity && classEntity.title}</Typography.Title>
                        <Typography.Paragraph>dla kursu {getLongGroupName(classEntity.group)}</Typography.Paragraph>
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="ID">{classEntity.id}</Descriptions.Item>
                            <Descriptions.Item label="Numer zajęć">{classEntity.classNumber}</Descriptions.Item>
                            <Descriptions.Item label="Data">
                                {new Date(classEntity.takenOn).toLocaleDateString()}
                            </Descriptions.Item>
                            <Descriptions.Item label="Czy sprawozdanie wymagane?">
                                {classEntity.isReportRequired ? 'tak' : 'nie'}
                            </Descriptions.Item>
                        </Descriptions>
                        <Typography.Title level={4} style={{ marginTop: 30 }}>
                            Obecności i sprawozdania
                        </Typography.Title>
                        <Table
                            dataSource={usersAttendances}
                            columns={userColumns}
                            pagination={false}
                            rowKey="album"
                        />
                    </>
                )}
            </PageContent>
        </Layout>
    );
};

ClassPage.getInitialProps = async (context: NextPageContext) => {
    return {};
};

export default ClassPage;
