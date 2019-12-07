import { Button, Layout, PageHeader, Spin, Table, Typography } from 'antd';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { PageContent } from '../../../components/layout/content/page-content';
import Breadcrumb from '../../../components/pages/reports-admin/Breadcrumb';
import ReportGrade from '../../../components/shared/report-grade';
import AuthContext from '../../../components/stores/AuthContext';
import { getReportUrl } from '../../../helpers/attendances';
import { getTableFilters } from '../../../helpers/ui';
import { PUT_ATTENDANCE } from '../../group/[id]/class/[classId]';
import styles from './index.module.scss';
import useSendEmailForm from '../../../components/hocs/useSendEmailForm';
import useNotAdminRedirection from '../../../components/hocs/useNotAdminRedirection';

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
`;

interface ReportsAdminPageProps {}

const ReportsAdminPage: React.FC<ReportsAdminPageProps> = () => {
    useNotAdminRedirection();
    const { state: authState } = useContext(AuthContext);
    const router = useRouter();
    const { user, isInitialized } = authState;
    const { data } = useQuery(GET_PENDING_REPORTS, { fetchPolicy: 'network-only' });
    const [putAttendance] = useMutation(PUT_ATTENDANCE);
    const { renderEmailModal, showEmailModal } = useSendEmailForm();

    const handleStudentDetailsClick = (groupId, userId) => {
        router.push('/group/[id]/student/[album]', `/group/${groupId}/student/${userId}`);
    };

    const handlePutAttendanceCheck = (attendance, entity) => {
        attendance.id = Number(entity.id);
        attendance.userId = Number(entity.userId);
        attendance.classId = Number(entity.classId);
        attendance.groupId = Number(entity.groupId);
        putAttendance({ variables: attendance });
    };

    const handleReportRateClick = (e, entity) => {
        const attendance = {} as any;
        attendance.reportGrade = Number(e.target.value);
        handlePutAttendanceCheck(attendance, entity);
    };

    return (
        <Layout className={styles.root} style={{ padding: '0 24px 24px' }}>
            <Breadcrumb />
            <PageContent>
                <PageHeader ghost={false} title={PAGE_NAME} />
                {(!isInitialized || !user) && <Spin size="large" />}
                {data && isInitialized && user && (
                    <>
                        <Typography.Title level={4}>Nieocenione sprawozdania</Typography.Title>
                        {renderEmailModal()}
                        <Table
                            dataSource={data && data.pendingReports}
                            columns={[
                                {
                                    title: 'Album',
                                    dataIndex: 'userId',
                                    key: 'userId',
                                    filters: getTableFilters(data && data.pendingReports, 'userId'),
                                    onFilter: (value, record: any) => value === record.userId,
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
                                    filters: getTableFilters(data && data.pendingReports, 'userName'),
                                    onFilter: (value, record: any) => value === record.userName,
                                },
                                {
                                    title: 'Kurs',
                                    dataIndex: 'groupName',
                                    key: 'groupName',
                                    width: 200,
                                    filters: getTableFilters(data && data.pendingReports, 'groupName'),
                                    onFilter: (value, record: any) => value === record.groupName,
                                },
                                {
                                    title: 'Tytuł',
                                    dataIndex: 'classTitle',
                                    key: 'classTitle',
                                    render: val => <strong>{val}</strong>,
                                },
                                {
                                    title: 'Raport',
                                    dataIndex: 'reportFile',
                                    key: 'reportFile',
                                    render: (val, entry: any) => (
                                        <>
                                            <a type="link" href={getReportUrl(val)} target="blank">
                                                pobierz
                                            </a>{' '}
                                            {entry.reportAddedOn
                                                ? new Date(entry.reportAddedOn).toLocaleDateString()
                                                : ''}
                                        </>
                                    ),
                                },
                                {
                                    title: 'Oceń',
                                    dataIndex: 'reportGrade',
                                    key: 'reportGrade',
                                    render: (val, entry: any) => {
                                        const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
                                            handleReportRateClick(e, entry);
                                        };
                                        const defaultValue = val ? val : '';
                                        const grade = <ReportGrade defaultValue={defaultValue} onClick={handleClick} />;
                                        return grade;
                                    },
                                },
                                {
                                    title: 'Email',
                                    dataIndex: 'userId',
                                    key: 'email',
                                    render: (val, entry: any) => {
                                        return (
                                            <Button
                                                type="default"
                                                icon="mail"
                                                shape="circle"
                                                onClick={() =>
                                                    showEmailModal(
                                                        val,
                                                        'user',
                                                        `Wiadomość do sprawozdania ${entry.classTitle} z kursu ${entry.groupName}`,
                                                    )
                                                }
                                            />
                                        );
                                    },
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
