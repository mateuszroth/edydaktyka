import React, { useContext, useState, useEffect } from 'react';
import { PageHeader, Layout, Spin, Button, Modal, Typography } from 'antd';
import gql from 'graphql-tag';
import Router, { useRouter } from 'next/router';
import Breadcrumb from '../../components/pages/groups/Breadcrumb';
import GroupsList, { GET_GROUPS } from '../../components/pages/groups/GroupsList';
import GroupForm from '../../components/pages/groups/GroupForm';
import styles from './index.module.scss';
import AuthContext from '../../components/stores/AuthContext';
import { PageContent } from '../../components/layout/content/page-content';
import useNotAdminRedirection from '../../components/hocs/useNotAdminRedirection';
import { useMutation, useLazyQuery } from 'react-apollo';

const PAGE_NAME = 'Zarządzanie grupami zajęciowymi';

const PUT_GROUP = gql`
    mutation PutGroup(
        $id: ID
        $modeOfStudy: String!
        $fieldOfStudy: String!
        $groupNumber: String!
        $groupHalf: String!
        $courseName: String!
        $link: String
        $description: String
        $isActive: Boolean
    ) {
        putGroup(
            group: {
                id: $id
                modeOfStudy: $modeOfStudy
                fieldOfStudy: $fieldOfStudy
                groupNumber: $groupNumber
                groupHalf: $groupHalf
                courseName: $courseName
                link: $link
                description: $description
                isActive: $isActive
            }
        )
    }
`;

interface GroupsPageProps {}

const GroupsPage: React.FC<GroupsPageProps> = () => {
    useNotAdminRedirection();
    const router = useRouter();
    const { state: authState } = useContext(AuthContext);
    const { user, isInitialized } = authState;
    const [isAddGroupModalVisible, setIsAddGroupModalVisible] = useState(false);
    const [groupFormInitialValues, setGroupFormInitialValues] = useState(null);
    const [getActiveGroups] = useLazyQuery(GET_GROUPS(true), { fetchPolicy: 'network-only' });
    const [getInactiveGroups] = useLazyQuery(GET_GROUPS(false), { fetchPolicy: 'network-only' });
    const [putGroup, { loading: putGroupLoading, data: putGroupData, error: putGroupError }] = useMutation(PUT_GROUP);
    const handleGroupSelect = group => router.push(`/group/[id]`, `/group/${group.id}`);
    const handleSendEmailClick = group => null; // TODO group email form
    const handleEditClick = group => {
        setGroupFormInitialValues(group);
        setIsAddGroupModalVisible(true);
    };
    const handleShowAddGroupModal = () => setIsAddGroupModalVisible(true);
    const handleCloseAddGroupModal = () => {
        setGroupFormInitialValues(null);
        setIsAddGroupModalVisible(false);
    };
    const handleGroupFormSubmit = group => {
        putGroup({ variables: group });
    };
    useEffect(() => {
        setIsAddGroupModalVisible(false);
        getActiveGroups();
        getInactiveGroups();
    }, [putGroupData]);

    return (
        <Layout className={styles.root}>
            <Breadcrumb />
            <PageContent>
                <PageHeader ghost={false} title={PAGE_NAME} />
                {!isInitialized && !user && <Spin size="large" />}
                {isInitialized && user && user.isAdmin && (
                    <>
                        <div className={styles.buttons}>
                            <Button size="large" type="primary" onClick={handleShowAddGroupModal}>
                                Dodaj grupę
                            </Button>
                        </div>
                        <Modal
                            visible={isAddGroupModalVisible}
                            title={!groupFormInitialValues ? "Dodaj grupę zajęciową" : "Edytuj grupę zajęciową"}
                            onCancel={handleCloseAddGroupModal}
                            footer={[]}
                        >
                            <GroupForm
                                data={putGroupData}
                                loading={putGroupLoading}
                                error={putGroupError}
                                onSubmit={handleGroupFormSubmit}
                                initialValues={groupFormInitialValues}
                            />
                        </Modal>
                        <GroupsList
                            manage={true}
                            onDetailsClick={handleGroupSelect}
                            onEditClick={handleEditClick}
                            onSendEmailClick={handleSendEmailClick}
                        />
                        <Typography.Title level={4} style={{ marginTop: 40 }}>Nieaktywne grupy</Typography.Title>
                        <GroupsList
                            active={false}
                            manage={true}
                            onDetailsClick={handleGroupSelect}
                            onEditClick={handleEditClick}
                            onSendEmailClick={handleSendEmailClick}
                        />
                    </>
                )}
            </PageContent>
        </Layout>
    );
};

export default GroupsPage;
