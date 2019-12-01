import { Button, Icon, Layout, PageHeader, Spin, Table, Typography } from 'antd';
import gql from 'graphql-tag';
import React, { useContext, useEffect, useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from 'react-apollo';
import useNotLoggedInRedirection from '../../../components/hocs/useNotLoggedInRedirection';
import { PageContent } from '../../../components/layout/content/page-content';
import Breadcrumb from '../../../components/pages/schedule/Breadcrumb';
import GradeMark from '../../../components/shared/grade-mark/GradeMark';
import AuthContext from '../../../components/stores/AuthContext';
import { getLongGroupName } from '../../../helpers/groups';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import UserAvatar from '../../../components/shared/user-avatar/UserAvatar';

const PAGE_NAME = 'Ocenianie i zarządzanie sprawozdaniami';

const GET_PENDING_REPORTS = gql`
    query PendingReports {
        pendingReports(activeGroups: true) {
            id
            groupId
            classId
            userId
            reportGrade
            reportAddedOn
            reportFile
            groupName
            classTitle
            userName
        }
    }
`

interface ReportsAdminPageProps {}

const ReportsAdminPage: React.FC<ReportsAdminPageProps> = () => {
    useNotLoggedInRedirection();
    const { state: authState } = useContext(AuthContext);
    const router = useRouter();
    const { user, isInitialized } = authState;
    const { data, loading, error } = useQuery(GET_PENDING_REPORTS);

    const handleStudentDetailsClick = (groupId, userId) => {
        router.push('/group/[id]/student/[album]', `/group/${groupId}/student/${userId}`);
    };

    return (
        <Layout className={styles.root} style={{ padding: '0 24px 24px' }}>
            <Breadcrumb />
            <PageContent>
                <PageHeader ghost={false} title={PAGE_NAME} />
                {(!isInitialized || !user) && <Spin size="large" />}
                {data && isInitialized && user && (
                    <>
                        <Table
                            dataSource={data && data.pendingReports}
                            columns={[
                                {
                                    title: 'Album',
                                    dataIndex: 'userId',
                                    key: 'userId',
                                    render: (val, entry: any) => {
                                        return (
                                            <div onClick={() => handleStudentDetailsClick(entry.groupId, val)}>
                                                {val}
                                            </div>
                                        );
                                    },
                                },
                                {
                                    title: 'Student',
                                    dataIndex: 'userName',
                                    key: 'userName',
                                },
                                {
                                    title: 'Kurs',
                                    dataIndex: 'groupName',
                                    key: 'groupName',
                                    width: 200,
                                },
                                {
                                    title: 'Tytuł',
                                    dataIndex: 'classTitle',
                                    key: 'classTitle',
                                    render: val => <strong>{val}</strong>
                                },
                                {
                                    title: 'Raport',
                                    dataIndex: 'reportFile',
                                    key: 'reportFile',
                                    render: (val, entry: any) => (
                                        <>
                                            <Button type="link" href={"http://localhost:4000/" + val} target="blank">pobierz</Button>
                                            {entry.reportAddedOn ? (new Date(entry.reportAddedOn)).toLocaleDateString() : ''}
                                        </>
                                    )
                                },
                                {
                                    title: 'Oceń',
                                    dataIndex: 'reportGrade',
                                    key: 'reportGrade',
                                },
                            ]}
                            pagination={false}
                            rowKey="id"
                        />
                    </>
                )}
            </PageContent>
        </Layout>
    );
};

export default ReportsAdminPage;
