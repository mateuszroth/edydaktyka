import React, { useContext, useState, useEffect } from 'react';
import { PageHeader, Layout, Spin, Radio, Typography, Result, Descriptions, Table, Icon, Button, List, Tag } from 'antd';
import { NextPage, NextPageContext } from 'next';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import Breadcrumb from '../../../../components/pages/group/Breadcrumb';
import styles from './index.module.scss';
import AuthContext from '../../../../components/stores/AuthContext';
import UserAvatar from '../../../../components/shared/user-avatar/UserAvatar';
import { PageContent } from '../../../../components/layout/content/page-content';
import useNotAdminRedirection from '../../../../components/hocs/useNotAdminRedirection';
import { useMutation, useQuery } from 'react-apollo';
import { getLongGroupName } from '../../../../helpers/groups';
import { GET_GROUP } from '../index';
import GradeMark from '../../../../components/shared/grade-mark/GradeMark';

const PAGE_NAME = 'Szczegóły studenta w grupie';

export const GET_GROUP_ATTENDANCES = id => gql`
    {
        groupAttendances(id: ${id}) {
            id
            groupId
            classId
            userId
            isPresent
            reportFile
            reportGrade
            reportAddedOn
        }
    }
`;

const PUT_USER_GRADE = gql`
    mutation PutUserGrade($id: Int, $userId: Int!, $groupId: Int!, $grade: Int!, $gradedOn: Date) {
        putUserGrade(grade: { id: $id, userId: $userId, groupId: $groupId, grade: $grade, gradedOn: $gradedOn }) {
            id
            userId
            groupId
            grade
            gradedOn
        }
    }
`;

const renderGrade = (currentGrade, onGradeClick: (e: React.MouseEvent<HTMLInputElement>) => void) => {
    const defaultValue = currentGrade && currentGrade.grade;
    return (
        <>
            <Radio.Group defaultValue={defaultValue} buttonStyle="solid">
                <Radio.Button checked={!defaultValue} value="0" onClick={onGradeClick}>
                    brak oceny
                </Radio.Button>
                <Radio.Button checked={defaultValue === 20} value="20" onClick={onGradeClick}>
                    2
                </Radio.Button>
                <Radio.Button checked={defaultValue === 30} value="30" onClick={onGradeClick}>
                    3
                </Radio.Button>
                <Radio.Button checked={defaultValue === 35} value="35" onClick={onGradeClick}>
                    3.5
                </Radio.Button>
                <Radio.Button checked={defaultValue === 40} value="40" onClick={onGradeClick}>
                    4
                </Radio.Button>
                <Radio.Button checked={defaultValue === 45} value="45" onClick={onGradeClick}>
                    4.5
                </Radio.Button>
                <Radio.Button checked={defaultValue === 50} value="50" onClick={onGradeClick}>
                    5
                </Radio.Button>
            </Radio.Group>
        </>
    );
};

interface StudentPage {}

const StudentPage: NextPage<StudentPage> = () => {
    useNotAdminRedirection();
    const { state: authState } = useContext(AuthContext);
    const router = useRouter();
    const groupId = router && router.query && router.query.id;
    const album = router && router.query && router.query.album;
    const { loading: groupLoading, error: groupError, data } = groupId ? useQuery(GET_GROUP(groupId)) : {} as any;
    const { loading: attendancesLoading, error: attendancesError, data: attendancesData } = groupId ? useQuery(
        GET_GROUP_ATTENDANCES(groupId),
    ) : {} as any;
    const [putUserGrade, { data: putUserGradeData, error: putUserGradeError }] = useMutation(PUT_USER_GRADE);
    const loading = groupLoading || attendancesLoading;
    const error = groupError || attendancesError || putUserGradeError;
    const [user, setUser] = useState(null);
    const [classes, setClasses] = useState(null);
    const [attendances, setAttendances] = useState(null);
    const [userGrade, setUserGrade] = useState(null);

    useEffect(() => {
        if (data && data.group) {
            const group = data.group;
            const user = group.users.find(u => u.album === Number(album));
            const classes = group.classes;
            const grade = group.grades.find(grade => grade.userId === Number(album));
            setUser(user);
            setClasses(classes);
            setUserGrade(grade);
        }
    }, [data]);

    useEffect(() => {
        if (attendancesData && attendancesData.groupAttendances) {
            const attendances = attendancesData.groupAttendances;
            const userAttendances = attendances.filter(a => a.userId === Number(album));
            setAttendances(userAttendances);
        }
    }, [attendancesData]);

    useEffect(() => {
        if (attendances && classes) {
            const updatedClasses = classes.map(cls => {
                return {
                    ...cls,
                    attendance: attendances.find(a => a.classId === cls.id),
                };
            });
            setClasses(updatedClasses);
        }
    }, [data, attendances]);

    useEffect(() => {
        if (putUserGradeData) {
            setUserGrade(putUserGradeData.putUserGrade);
        }
    }, [putUserGradeData]);

    if (loading) return <Spin tip="Ładowanie..." style={{ marginTop: 50 }} />;
    if (error) return <Result status="error" title="Wystąpił błąd!" subTitle={error.message} />;

    const handleClassDetailsClick = classId => {
        router.push('/group/[id]/class/[classId]', `/group/${groupId}/class/${classId}`);
    };

    const columns = [
        {
            title: 'Numer',
            dataIndex: 'classNumber',
            key: 'classNumber',
        },
        {
            title: 'Tytuł',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Data',
            dataIndex: 'takenOn',
            key: 'takenOn',
            render: val => new Date(val).toLocaleDateString(),
        },
        {
            title: 'Ocena',
            dataIndex: 'isReportRequired',
            key: 'isReportRequired',
            render: (val, entry) =>
                val
                    ? entry.attendance && (entry.attendance.reportFile || entry.attendance.reportGrade)
                        ? entry.attendance.reportGrade
                            ? <GradeMark grade={entry.attendance.reportGrade} />
                            : 'nieocenione'
                        : 'nieprzesłane'
                    : 'niewymagane',
        },
        {
            title: 'Czy obecny?',
            dataIndex: 'attendance',
            key: 'attendance.isPresent',
            render: val => (val ? (val.isPresent ? <Tag color="green">tak</Tag> : <Tag color="red">nie</Tag>) : 'niesprawdzone'),
        },
        {
            title: 'Szczegóły',
            dataIndex: 'id',
            key: 'classDetails',
            render: val => <Button onClick={() => handleClassDetailsClick(val)}>Zajęcia</Button>,
        },
    ];
    const handleGroupRateClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const newGrade = {
            id: userGrade ? userGrade.id : null,
            userId: Number(album),
            groupId: Number(groupId),
            grade: Number(e.currentTarget.value),
        };
        putUserGrade({ variables: newGrade });
    };

    return (
        <Layout className={styles.root}>
            <Breadcrumb
                id={groupId}
                groupName={data && data.group.courseName}
                userId={user && user.album}
                userName={user && `${user.firstName} ${user.lastName}`}
            />
            <PageContent>
                <PageHeader
                    ghost={false}
                    title={PAGE_NAME}
                    onBack={() => router.push('/group/[id]', `/group/${groupId}`, { shallow: true })}
                />
                {!loading || (!authState.isInitialized && !authState.user && <Spin size="large" />)}
                {data && user && classes && authState.isInitialized && authState.user && authState.user.isAdmin && (
                    <>
                        <Typography.Title level={3}>
                            <UserAvatar user={user} />Student {user.firstName} {user.lastName} (indeks {album})
                        </Typography.Title>
                        <Typography.Paragraph>dla kursu {getLongGroupName(data.group)}</Typography.Paragraph>
                        <Typography.Title level={4} style={{ marginTop: 30 }}>
                            Ocena semestralna
                        </Typography.Title>
                        {renderGrade(userGrade, handleGroupRateClick)}
                        <Typography.Title level={4} style={{ marginTop: 30 }}>
                            Obecności i oceny na zajęciach
                        </Typography.Title>
                        <Table dataSource={classes} columns={columns} pagination={false} rowKey="id" />
                    </>
                )}
            </PageContent>
        </Layout>
    );
};

StudentPage.getInitialProps = async (context: NextPageContext) => {
    return {};
};

export default StudentPage;
