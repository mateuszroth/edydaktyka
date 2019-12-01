import React, { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import useNotAdminRedirection from '../../hocs/useNotAdminRedirection';
import { useQuery } from 'react-apollo';
import { Spin, Result, Table, Button } from 'antd';

export const GET_GROUPS = (isActive = true) => gql`
    {
        groups(isActive: ${isActive}) {
            id
            modeOfStudy
            fieldOfStudy
            groupNumber
            groupHalf
            courseName
            link
            description
            isActive
        }
    }
`;

export const GET_ACTIVE_GROUPS = GET_GROUPS(true);

export const GET_INACTIVE_GROUPS = GET_GROUPS(false);

const defaultColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Tryb studiów',
        dataIndex: 'modeOfStudy',
        key: 'modeOfStudy',
    },
    {
        title: 'Kierunek, specjalność',
        dataIndex: 'fieldOfStudy',
        key: 'fieldOfStudy',
    },
    {
        title: 'Grupa',
        dataIndex: 'groupNumber',
        key: 'groupNumber',
    },
    {
        title: '/',
        dataIndex: 'groupHalf',
        key: 'groupHalf',
    },
    {
        title: 'Nazwa kursu',
        dataIndex: 'courseName',
        key: 'courseName',
    },
];

interface GroupsListProps {
    active?: boolean;
    manage?: boolean;
    onDetailsClick?: (group: any) => void;
    onEditClick?: (group: any) => void;
    onSendEmailClick?: (group: any) => void;
}

const onClickDefault = group => null;

const GroupsList: React.FC<GroupsListProps> = ({ active = true, manage = true, onDetailsClick = onClickDefault, onEditClick = onClickDefault, onSendEmailClick = onClickDefault }) => {
    useNotAdminRedirection();
    const { loading, error, data } = useQuery(GET_GROUPS(active));
    const [ tableData, setTableData ] = useState([]);
    const [ tableColumns, setTableColumns ] = useState(defaultColumns);

    const handleRow = (group, _) => {
        return {
            onClick: event => {
                event.preventDefault();
                onDetailsClick(group);
            }
        }
    }

    useEffect(() => {
        if (data && data.groups) {
            const dataSource = data.groups.map(group => {
                const options = {
                    manage: null
                };

                const handleDetailsClick = () => onDetailsClick(group);
                const handleEditClick = event => {
                    event.preventDefault();
                    onEditClick(group);
                };
                const handleSendEmailClick = event => {
                    event.preventDefault();
                    onSendEmailClick(group);
                };

                if (manage) {
                    options.manage = (
                        <div>
                            <Button type="default" icon="edit" shape="circle" onClick={handleEditClick} />
                            <Button type="default" icon="mail" shape="circle" onClick={handleSendEmailClick} />
                            <Button type="default" icon="schedule" onClick={handleDetailsClick}>Tematy</Button>
                            <br />
                            <Button type="default" icon="team" onClick={handleDetailsClick}>Studenci</Button>
                        </div>
                    )
                }

                return {
                    ...group,
                    ...options
                }
            });
            setTableData(dataSource);

            const columns = [...defaultColumns];
            if (manage) {
                columns.push(
                    {
                        title: 'Opcje',
                        dataIndex: 'manage',
                        key: 'manage',
                    },
                ); 
            }
            setTableColumns(columns);
        }
    }, [data]);

    if (loading) return <Spin tip="Ładowanie..." />;
    if (error) return <Result status="error" title="Wystąpił błąd!" subTitle={error.message} />;

    return <Table dataSource={tableData} rowKey="id" pagination={false} columns={tableColumns} />;
};

export default GroupsList;
