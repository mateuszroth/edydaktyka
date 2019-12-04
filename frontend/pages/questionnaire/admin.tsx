import { Button, Icon, Layout, PageHeader, Spin, Table, Typography, Avatar, Tag, Tooltip } from 'antd';
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
import useNotAdminRedirection from '../../components/hocs/useNotAdminRedirection';

const PAGE_NAME = 'Ankiety';

export const GET_QUESTIONNAIRES = gql`
    {
        questionnaires {
            id
            grade
            speed
            value
            createdOn
            groupId
            comments
        }
    }
`;

const Rate: React.FC<{ value: number }> = ({ value }) => {
    switch (value) {
        case -2:
            return <Tag color="red">{value}</Tag>;
        case -1:
            return <Tag color="orange">{value}</Tag>;
        case 0:
            return <Tag color="cyan">{value}</Tag>;
        case 1:
            return <Tag color="lime">{value}</Tag>;
        case 2:
            return <Tag color="green">{value}</Tag>;
    }
};

interface QuestionnairesAdminPageProps {}

const QuestionnairesAdminPage: React.FC<QuestionnairesAdminPageProps> = () => {
    useNotAdminRedirection();
    const { state: authState } = useContext(AuthContext);
    const { user, isInitialized } = authState;
    const [getQuestionnaires, { data }] = useLazyQuery(GET_QUESTIONNAIRES);

    useEffect(() => {
        if (user) {
            getQuestionnaires();
        }
    }, [user]);

    return (
        <Layout className={styles.root} style={{ padding: '0 24px 24px' }}>
            <Breadcrumb />
            <PageContent>
                <PageHeader ghost={false} title={PAGE_NAME} />
                {(!data || !isInitialized || !user) && <Spin size="large" />}
                {isInitialized && user && data && (
                    <>
                        {data.questionnaires.length > 0 && (
                            <Table
                                dataSource={data.questionnaires}
                                rowKey="id"
                                pagination={false}
                                columns={[
                                    {
                                        title: 'Data',
                                        dataIndex: 'createdOn',
                                        key: 'createdOn',
                                        render: val => new Date(val).toLocaleDateString(),
                                    },
                                    {
                                        title: 'Ocena',
                                        dataIndex: 'grade',
                                        key: 'grade',
                                        render: val => (val ? <GradeMark grade={val} /> : 'brak'),
                                        width: "14%",
                                    },
                                    {
                                        title: (
                                            <Tooltip title="-2 = zdecydowanie wolniej; 2 = zdecydowanie szybciej">
                                                Szybkość <Icon type="question-circle" />
                                            </Tooltip>
                                        ),
                                        dataIndex: 'speed',
                                        key: 'speed',
                                        render: val => <Rate value={val} />,
                                        width: "14%",
                                    },
                                    {
                                        title: (
                                            <Tooltip title="-2 = zdecydowanie nie nauczyłem się; 2 = zdecydowanie nauczyłem się">
                                                Wartość <Icon type="question-circle" />
                                            </Tooltip>
                                        ),
                                        dataIndex: 'value',
                                        key: 'value',
                                        render: val => <Rate value={val} />,
                                        width: "14%",
                                    },
                                    {
                                        title: 'Komentarz',
                                        dataIndex: 'comments',
                                        key: 'comments',
                                        width: "40%",
                                    },
                                ]}
                            />
                        )}
                        {data.questionnaires.length === 0 && (
                            <Typography.Paragraph>Jeszcze nie przesłano żadnych ankiet.</Typography.Paragraph>
                        )}
                    </>
                )}
            </PageContent>
        </Layout>
    );
};

export default QuestionnairesAdminPage;
