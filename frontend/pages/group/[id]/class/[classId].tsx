import React, { useContext, useState, useEffect } from 'react';
import { PageHeader, Layout, Spin, Radio, Typography, Result, Descriptions, Table, Icon, Button, List } from 'antd';
import { NextPage, NextPageContext } from 'next';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import Breadcrumb from '../../../../components/pages/group/Breadcrumb';
import styles from './index.module.scss';
import AuthContext from '../../../../components/stores/AuthContext';
import { PageContent } from '../../../../components/layout/content/page-content';
import useNotAdminRedirection from '../../../../components/hocs/useNotAdminRedirection';
import { useMutation, useQuery, useLazyQuery } from 'react-apollo';
import { getLongGroupName } from '../../../../helpers/groups';
import UserAvatar from '../../../../components/shared/user-avatar/UserAvatar';
import ReportGrade from '../../../../components/shared/report-grade';
import { getReportUrl } from '../../../../helpers/attendances';
import useSendEmailForm from '../../../../components/hocs/useSendEmailForm';
import Centered from '../../../../components/shared/centered';
import { getTableFilters } from '../../../../helpers/ui';

const PAGE_NAME = 'Szczegóły tematu zajęć';

export const GET_CLASS = gql`
    query Class($id: Int!, $groupId: Int!) {
        class(id: $id, groupId: $groupId) {
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
                classes {
                    id
                    title
                }
            }
            attendances {
                id
                classId
                groupId
                userId
                isPresent
                reportFile
                reportGrade
                reportAddedOn
            }
        }
    }
`;

export const PUT_ATTENDANCE = gql`
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
        ) {
            id
            userId
            classId
            groupId
            isPresent
            reportFile
            reportGrade
            reportAddedOn
        }
    }
`;

const defaultStudentColumns = (
    data,
    isReportRequired,
    onPresenceCheck,
    onReportRateClick,
    onEmailSendClick,
    onStudentDetailsClick,
    defaultFilteredUser = null,
) => [
    {
        title: 'Album',
        dataIndex: 'album',
        key: 'album',
        filteredValue: defaultFilteredUser ? [defaultFilteredUser] : null,
        filters: getTableFilters(data, 'album'),
        onFilter: (value, record: any) => {
            return Number(value) === Number(record.album);
        },
        render: (val, entry) => {
            return (
                <div onClick={() => onStudentDetailsClick(val)}>
                    <UserAvatar size="large" user={entry} />
                    {val}
                </div>
            );
        },
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
            const reportFile =
                entry.attendance && entry.attendance.reportFile ? (
                    <a href={getReportUrl(entry.attendance.reportFile)} target="blank">
                        przesłane {new Date(entry.attendance && entry.attendance.reportAddedOn).toLocaleDateString()}
                    </a>
                ) : (
                    'jeszcze nieprzesłane'
                );
            return isReportRequired ? reportFile : 'niewymagane';
        },
    },
    {
        title: 'Ocena',
        dataIndex: 'attendance.reportGrade',
        key: 'attendance.reportGrade',
        render: (val, entry) => {
            const handleClick = e => {
                onReportRateClick(e, entry);
            };
            const defaultValue = val ? val : '';
            const grade = <ReportGrade defaultValue={defaultValue} onClick={handleClick} />;
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
            };
            const isPresent = entry.attendance && entry.attendance.isPresent ? 'tak' : 'nie';
            const text = val ? isPresent : 'niesprawdzone';
            const defaultValue =
                entry.attendance && entry.attendance.isPresent != null
                    ? Number(entry.attendance.isPresent).toString()
                    : '';
            return (
                <>
                    <Radio.Group defaultValue={defaultValue} buttonStyle="solid">
                        <Radio.Button value="0" checked={defaultValue === '0'} onClick={handleClick}>
                            nie
                        </Radio.Button>
                        <Radio.Button value="1" checked={defaultValue === '1'} onClick={handleClick}>
                            tak
                        </Radio.Button>
                    </Radio.Group>
                </>
            );
        },
    },
    {
        title: 'Akcje',
        dataIndex: 'album',
        key: 'actions',
        render: (album, entry) => {
            return (
                <>
                    <Button
                        type="default"
                        icon="mail"
                        shape="circle"
                        onClick={() => onEmailSendClick(album)}
                        style={{ marginRight: 5 }}
                    />
                    <Button type="default" icon="user" shape="circle" onClick={() => onStudentDetailsClick(album)} />
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
    const userId = router && router.query && router.query.album;
    const [getClass, { loading, error, data }] = useLazyQuery(GET_CLASS);
    const [usersAttendances, setUsersAttendances] = useState([]);
    const { renderEmailModal, showEmailModal } = useSendEmailForm();
    const [putAttendance, { data: putAttendanceData, error: putAttendanceError }] = useMutation(PUT_ATTENDANCE);
    const [filterUserId, setFilterUserId] = useState(userId);

    useEffect(() => {
        if (groupId && classId) {
            getClass({
                variables: {
                    id: Number(classId),
                    groupId: Number(groupId),
                },
            });
        }
    }, [groupId, classId]);

    useEffect(() => {
        if (data && data.class) {
            const group = data.class.group;
            setUsersAttendances(
                group &&
                    group.users &&
                    group.users.map(user => {
                        const attendance = data.class.attendances.find(a => a.userId === user.album);
                        return {
                            ...user,
                            attendance,
                        };
                    }),
            );
        }
    }, [data]);

    useEffect(() => {
        const attendance = putAttendanceData && putAttendanceData.putAttendance;
        if (attendance) {
            const user = usersAttendances.find(user => user.album === attendance.userId);
            user.attendance = attendance;
            setUsersAttendances([...usersAttendances]);
        }
    }, [putAttendanceData]);

    if (error || putAttendanceError)
        return <Result status="error" title="Wystąpił błąd!" subTitle={(error || putAttendanceError).message} />;

    const { class: classEntity = {} } = data || {};

    const handlePutAttendanceCheck = (attendance, user) => {
        attendance.userId = Number(user.album);
        if (user.attendance && user.attendance.id) {
            attendance.id = Number(user.attendance.id);
        }
        attendance.classId = Number(classId);
        attendance.groupId = Number(groupId);
        putAttendance({ variables: attendance });
    };

    const handlePresenceCheck = (e, user) => {
        const attendance = {} as any;
        attendance.isPresent = !!Number(e.target.value);
        handlePutAttendanceCheck(attendance, user);
    };

    const handleReportRateClick = (e, user) => {
        const attendance = {} as any;
        if (user.attendance && user.attendance.isPresent) {
            attendance.isPresent = !!Number(user.attendance.isPresent);
        } else {
            attendance.isPresent = null;
        }
        attendance.reportGrade = Number(e.target.value);
        handlePutAttendanceCheck(attendance, user);
    };

    const handleStudentDetailsClick = album => {
        router.push('/group/[id]/student/[album]', `/group/${groupId}/student/${album}`);
    };

    const handleEmailSendClick = album => {
        showEmailModal(album, 'user');
    };

    const userColumns = defaultStudentColumns(
        [...usersAttendances],
        classEntity.isReportRequired,
        handlePresenceCheck,
        handleReportRateClick,
        handleEmailSendClick,
        handleStudentDetailsClick,
        filterUserId,
    );
    return (
        <Layout className={styles.root}>
            <Breadcrumb
                id={groupId}
                groupName={classEntity.group && classEntity.group.courseName}
                classId={classId}
                className={classEntity.title}
            />
            <PageContent>
                <PageHeader ghost={false} title={PAGE_NAME} onBack={() => router.back()} />
                {(!data || loading || !authState.isInitialized || !authState.user) && (
                    <Centered>
                        <Spin tip="Ładowanie..." style={{ marginTop: 50 }} />
                    </Centered>
                )}
                {data && authState.isInitialized && authState.user && authState.user.isAdmin && (
                    <>
                        {renderEmailModal()}
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
                        {filterUserId && (
                            <Typography.Title level={4} style={{ marginTop: 30 }}>
                                Filtrowane dla studenta z album {filterUserId}{' '}
                                <Button onClick={() => setFilterUserId(null)}>usuń filtr</Button>
                            </Typography.Title>
                        )}
                        <Table
                            dataSource={[...usersAttendances]}
                            columns={[...userColumns]}
                            pagination={false}
                            rowKey="album"
                        />
                        <Typography.Title level={4} style={{ marginTop: 30 }}>
                            Lista wszystkich zajęć
                        </Typography.Title>
                        <List
                            size="small"
                            bordered
                            dataSource={classEntity.group.classes}
                            renderItem={item => {
                                const i = item as any;
                                return (
                                    <List.Item
                                        onClick={() =>
                                            router.push(
                                                '/group/[id]/class/[classId]',
                                                `/group/${groupId}/class/${i.id}`,
                                                { shallow: true },
                                            )
                                        }
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {i.title}
                                    </List.Item>
                                );
                            }}
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
