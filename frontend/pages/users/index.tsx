import { Button, Layout, PageHeader, Spin, Table, Typography } from 'antd';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import useNotAdminRedirection from '../../components/hocs/useNotAdminRedirection';
import useSendEmailForm from '../../components/hocs/useSendEmailForm';
import { PageContent } from '../../components/layout/content/page-content';
import Breadcrumb from '../../components/pages/users/Breadcrumb';
import AuthContext from '../../components/stores/AuthContext';
import UserAvatar from '../../components/shared/user-avatar/UserAvatar';
import { getTableFilters } from '../../helpers/ui';
import styles from './index.module.scss';

const PAGE_NAME = 'Studenci';

const GET_USERS = gql`
    query Users {
        users {
            album
            firstName
            lastName
            email
            groups {
                id
                courseName
            }
        }
    }
`;

interface UsersAdminPageProps {}

const UsersAdminPage: React.FC<UsersAdminPageProps> = () => {
    useNotAdminRedirection();
    const { state: authState } = useContext(AuthContext);
    const { user, isInitialized } = authState;
    const router = useRouter();
    const { data } = useQuery(GET_USERS);
    const { renderEmailModal, showEmailModal } = useSendEmailForm();
    const [groups, setGroups] = useState([]);

    const handleStudentDetailsClick = (groupId, userId) => {
        router.push('/group/[id]/student/[album]', `/group/${groupId}/student/${userId}`);
    };

    useEffect(() => {
        if (data && data.users) {
            const map = new Map();
            data &&
                data.users.forEach(user => {
                    user.groups.forEach(group => {
                        if (!map.has(group.id)) {
                            map.set(group.id, group);
                        }
                    });
                });
            setGroups([...map.values()]);
        }
    }, [data]);

    return (
        <Layout className={styles.root} style={{ padding: '0 24px 24px' }}>
            <Breadcrumb />
            <PageContent>
                <PageHeader ghost={false} title={PAGE_NAME} />
                {(!data || !isInitialized || !user) && <Spin size="large" />}
                {data && isInitialized && user && (
                    <>
                        <Typography.Title level={4}>Studenci</Typography.Title>
                        {renderEmailModal()}
                        <Table
                            dataSource={data && data.users}
                            columns={[
                                {
                                    title: 'Album',
                                    dataIndex: 'album',
                                    key: 'album',
                                    filters: getTableFilters(data && data.users, 'album'),
                                    onFilter: (value, record: any) => value === record.album,
                                    render: (val, entry: any) => {
                                        const groupId = entry && entry.groups && entry.groups[0] && entry.groups[0].id;
                                        return (
                                            <div
                                                onClick={() =>
                                                    groupId ? handleStudentDetailsClick(groupId, val) : null
                                                }
                                            >
                                                <UserAvatar user={entry} />
                                                {val}
                                            </div>
                                        );
                                    },
                                },
                                {
                                    title: 'Imię',
                                    dataIndex: 'firstName',
                                    key: 'firstName',
                                    filters: getTableFilters(data && data.users, 'firstName'),
                                    onFilter: (value, record: any) => value === record.firstName,
                                },
                                {
                                    title: 'Nazwisko',
                                    dataIndex: 'lastName',
                                    key: 'lastName',
                                    filters: getTableFilters(data && data.users, 'lastName'),
                                    onFilter: (value, record: any) => value === record.firstName,
                                },
                                {
                                    title: 'Email',
                                    dataIndex: 'email',
                                    key: 'email',
                                    filters: getTableFilters(data && data.users, 'email'),
                                    onFilter: (value, record: any) => value === record.email,
                                },
                                {
                                    title: 'Grupy',
                                    dataIndex: 'groups',
                                    key: 'groups',
                                    width: 400,
                                    filters: getTableFilters(groups, 'id'),
                                    onFilter: (value, record: any) =>
                                        record.groups.map(group => group.id).includes(value),
                                    render: (groups, entry) =>
                                        groups.map(group => (
                                            <div onClick={() => handleStudentDetailsClick(group.id, entry.album)}>
                                                {group.id}: <a>{group.courseName}</a>
                                            </div>
                                        )),
                                },
                                {
                                    title: 'Napisz',
                                    dataIndex: 'album',
                                    key: 'message',
                                    render: (val, entry: any) => {
                                        return (
                                            <Button
                                                type="default"
                                                icon="mail"
                                                shape="circle"
                                                onClick={() => showEmailModal(val, 'user')}
                                            />
                                        );
                                    },
                                },
                            ]}
                            rowKey="album"
                        />
                    </>
                )}
            </PageContent>
        </Layout>
    );
};

export default UsersAdminPage;
