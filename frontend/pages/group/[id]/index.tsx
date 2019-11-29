import React, { useContext, useState, useEffect } from 'react';
import { PageHeader, Layout, Spin, Button, Modal, Typography, Result, Descriptions, Table } from 'antd';
import { NextPage, NextPageContext } from 'next';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import Breadcrumb from '../../../components/pages/group/Breadcrumb';
import styles from './index.module.scss';
import AuthContext from '../../../components/stores/AuthContext';
import { PageContent } from '../../../components/layout/content/page-content';
import useNotAdminRedirection from '../../../components/hocs/useNotAdminRedirection';
import { useMutation, useLazyQuery, useQuery } from 'react-apollo';
import { getLongGroupName, getReadableModeOfStudy } from '../../../helpers/groups';
import ClassForm from '../../../components/pages/group/ClassForm';

const PAGE_NAME = 'Szczegóły grupy zajęciowej';

export const GET_GROUP = id => gql`
    {
        group(id: ${id}) {
            id
            modeOfStudy
            fieldOfStudy
            groupNumber
            groupHalf
            courseName
            link
            description
            isActive
            users {
                album
                firstName
                lastName
                email
            }
            classes {
                id
                classNumber
                takenOn
                title
                isReportRequired
            }
        }
    }
`;

const PUT_CLASS = gql`
    mutation PutClass(
        $id: Int
        $groupId: Int
        $classNumber: Int
        $takenOn: Date
        $title: String
        $isReportRequired: Boolean
    ) {
        putClass(
            classData: {
                id: $id
                groupId: $groupId
                classNumber: $classNumber
                takenOn: $takenOn
                title: $title
                isReportRequired: $isReportRequired
            }
        )
    }
`;

const REMOVE_CLASS = gql`
    mutation RemoveClass($id: Int!, $groupId: Int!) {
        removeClass(classData: { id: $id, groupId: $groupId })
    }
`;

const getClassColumns = (onEdit, onRemove, onDetailsClick) => [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Numer zajęć',
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
    },
    {
        title: 'Sprawozdania',
        dataIndex: 'isReportRequired',
        key: 'isReportRequired',
        render: val => (val ? 'tak' : 'nie'),
    },
    {
        title: 'Akcje',
        dataIndex: 'manage',
        key: 'manage',
        render: (val, entry) => {
            return (
                <>
                    <Button type="default" icon="edit" shape="circle" onClick={() => onEdit(entry)} />
                    <Button type="default" icon="delete" shape="circle" onClick={() => onRemove(entry)} />
                    <Button type="default" onClick={() => onDetailsClick(entry)}>Szczegóły</Button>
                </>
            );
        },
    },
];

const defaultStudentColumns = [
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
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Akcje',
        dataIndex: 'manage',
        key: 'manage',
        render: (val, entry) => {
            return '';
        },
    },
];

interface GroupPageProps {}

const GroupPage: NextPage<GroupPageProps> = () => {
    useNotAdminRedirection();
    const { state: authState } = useContext(AuthContext);
    const [isClassFormModalVisible, setIsClassFormModalVisible] = useState(false);
    const [classFormInitialValues, setClassFormInitialValues] = useState(null);
    const router = useRouter();
    const groupId = router && router.query && router.query.id;
    const { loading, error, data } = useQuery(GET_GROUP(groupId));
    const [getClasses] = useLazyQuery(GET_GROUP(groupId), { fetchPolicy: 'network-only' });
    const [putClass, { loading: putClassLoading, data: putClassData, error: putClassError }] = useMutation(PUT_CLASS);
    const [removeClass, { data: removeClassData, error: removeClassError }] = useMutation(REMOVE_CLASS);

    const handleShowClassFormModal = () => setIsClassFormModalVisible(true);
    const handleCloseClassFormModal = () => {
        setClassFormInitialValues(null);
        setIsClassFormModalVisible(false);
    };
    const handleClassEdit = classEntity => {
        setClassFormInitialValues(classEntity);
        handleShowClassFormModal();
    };
    const handleClassRemove = classEntity => {
        Modal.confirm({
            title: 'Czy na pewno chcesz usunąć zajęcia?',
            content: 'Tej operacji nie można cofnąć!',
            okText: 'Tak, usuń',
            cancelText: 'Anuluj',
            onOk: () =>
                removeClass({
                    variables: {
                        id: Number(classEntity.id),
                        groupId: Number(groupId),
                    },
                }),
        });
    };
    const handleClassDetails = classEntity => {
        router.push(`/group/${groupId}/class/${classEntity.id}`);
    }
    useEffect(() => {
        getClasses();
    }, [removeClassData]);
    const handleClassFormSubmit = classEntity => {
        classEntity.groupId = Number(groupId);
        classEntity.id = Number(classEntity.id);
        putClass({ variables: classEntity });
    };
    useEffect(() => {
        setIsClassFormModalVisible(false);
        getClasses();
    }, [putClassData]);

    if (loading) return <Spin tip="Ładowanie..." style={{ marginTop: 50 }} />;
    if (error || removeClassError)
        return <Result status="error" title="Wystąpił błąd!" subTitle={(error || removeClassError).message} />;

    const { group } = data;
    const classColumns = getClassColumns(handleClassEdit, handleClassRemove, handleClassDetails);

    return (
        <Layout className={styles.root}>
            <Breadcrumb id={router && router.query && router.query.id} />
            <PageContent>
                <PageHeader ghost={false} title={PAGE_NAME} />
                {loading || (!authState.isInitialized && !authState.user && <Spin size="large" />)}
                {data && authState.isInitialized && authState.user && authState.user.isAdmin && (
                    <>
                        <Modal
                            visible={isClassFormModalVisible}
                            title={!classFormInitialValues ? 'Dodaj temat zajęć' : 'Edytuj temat zajęć'}
                            onCancel={handleCloseClassFormModal}
                            footer={[]}
                        >
                            <ClassForm
                                data={putClassData}
                                loading={putClassLoading}
                                error={putClassError}
                                onSubmit={handleClassFormSubmit}
                                initialValues={classFormInitialValues}
                            />
                        </Modal>
                        <Typography.Title level={3}>{group && group.courseName}</Typography.Title>
                        <Typography.Paragraph>{getLongGroupName(group)}</Typography.Paragraph>
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="ID">{group.id}</Descriptions.Item>
                            <Descriptions.Item label="Nazwa kursu">{group.courseName}</Descriptions.Item>
                            <Descriptions.Item label="Tryb">{getReadableModeOfStudy(group.modeOfStudy)}</Descriptions.Item>
                            <Descriptions.Item label="Kierunek, specjalność">{group.fieldOfStudy}</Descriptions.Item>
                            <Descriptions.Item label="Grupa">{group.groupNumber}</Descriptions.Item>
                            <Descriptions.Item label="Podgrupa">{group.groupHalf}</Descriptions.Item>
                            <Descriptions.Item label="Opis">{group.description}</Descriptions.Item>
                            <Descriptions.Item label="Link">
                                {group.link && <a href={group.link}>link</a>}
                            </Descriptions.Item>
                            <Descriptions.Item label="Czy grupa jest aktywna">
                                {group.isActive ? 'aktywna' : 'nieaktywna'}
                            </Descriptions.Item>
                        </Descriptions>
                        <Typography.Title level={4} style={{ marginTop: 30 }}>
                            Tematy zajęć
                        </Typography.Title>
                        <Button type="primary" size="large" onClick={handleShowClassFormModal}>
                            Dodaj temat
                        </Button>
                        <Table dataSource={group.classes} columns={classColumns} pagination={false} rowKey="id" />
                        <Typography.Title level={4} style={{ marginTop: 30 }}>
                            Studenci
                        </Typography.Title>
                        <Table
                            dataSource={group.users}
                            columns={defaultStudentColumns}
                            pagination={false}
                            rowKey="album"
                        />
                    </>
                )}
            </PageContent>
        </Layout>
    );
};

GroupPage.getInitialProps = async (context: NextPageContext) => {
    return {};
};

export default GroupPage;
