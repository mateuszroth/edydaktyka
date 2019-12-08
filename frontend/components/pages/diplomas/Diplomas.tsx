import { Alert, Table, Spin, Button, Modal } from 'antd';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../stores/AuthContext';
import gql from 'graphql-tag';
import { useLazyQuery, useMutation, useApolloClient } from 'react-apollo';
import usePutThesisForm from '../../hocs/usePutThesisForm';
import { DataProxy } from 'apollo-cache';

export const GET_THESES = gql`
    {
        theses {
            id
            type
            title
            year
            graduateId
            graduateName
            consultantId
            consultantName
            usedTechnologies
            goal
            sketch
            link
            isFavourite
        }
    }
`;

const BASE_COLUMNS = [
    {
        title: 'Numer',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Rok',
        dataIndex: 'year',
        key: 'year',
    },
    {
        title: 'Dyplomant',
        dataIndex: 'graduateName',
        key: 'graduateName',
    },
    {
        title: 'Temat',
        dataIndex: 'title',
        key: 'title',
    },
];

const DEFENDED_COLUMNS = [
    {
        title: 'Konsultant',
        dataIndex: 'consultantName',
        key: 'consultantName',
    },
    {
        title: 'Szczegóły',
        dataIndex: 'link',
        key: 'link',
    },
];

const DETAILS_COLUMNS = [
    {
        title: 'Cel',
        dataIndex: 'goal',
        key: 'goal',
    },
    {
        title: 'Szkic',
        dataIndex: 'sketch',
        key: 'sketch',
    },
    {
        title: 'Technologie',
        dataIndex: 'usedTechnologies',
        key: 'usedTechnologies',
    },
    {
        title: 'Szczegóły',
        dataIndex: 'link',
        key: 'link',
    },
];

const USER_ACTIONS_COLUMNS = () => [
    {
        title: 'Rezerwacje',
        dataIndex: 'id',
        key: 'actions',
    },
];

const ADMIN_ACTIONS_COLUMNS = (handlers: Handlers) => [
    {
        title: 'Akcje',
        dataIndex: 'id',
        key: 'actions',
        render: (val, thesis) => (
            <>
                <Button type="default" icon="edit" shape="circle" onClick={() => handlers.onEdit(thesis)}></Button>
                <Button type="default" icon="delete" shape="circle" onClick={() => handlers.onRemove(thesis)}></Button>
            </>
        ),
    },
];

interface Handlers {
    onEdit?: (thesis: any) => void;
    onRemove?: (thesis: any) => void;
    onAddVolunteer?: (thesis: any) => void;
    onRemoveVolunteer?: (thesis: any) => void;
    onAcceptVolunteer?: (thesis: any) => void;
}

const getColumns = (type, isUser, isAdmin, handlers: Handlers) => {
    const adminColumns = ADMIN_ACTIONS_COLUMNS(handlers);
    const userColumns = USER_ACTIONS_COLUMNS();
    const columns = {
        obroniona: [...BASE_COLUMNS, ...DEFENDED_COLUMNS, ...(isAdmin ? adminColumns : [])],
        realizowany: [...BASE_COLUMNS, ...DETAILS_COLUMNS, ...(isAdmin ? adminColumns : [])],
        pomyślany: [
            ...BASE_COLUMNS,
            ...DETAILS_COLUMNS,
            ...(isAdmin ? adminColumns : []),
            ...(isUser && !isAdmin ? userColumns : []),
        ],
        zgłoszona: [...BASE_COLUMNS, ...DETAILS_COLUMNS, ...(isAdmin ? adminColumns : [])],
    };
    return columns[type];
};

const REMOVE_THESIS = gql`
    mutation RemoveThesis($id: ID!) {
        removeThesis(id: $id)
    }
`;

export default ({ type = null, favourites = false }) => {
    const { state } = useContext(AuthContext);
    const { user, isInitialized } = state;
    const [getTheses, { data, loading }] = useLazyQuery(GET_THESES);
    const [removeThesis] = useMutation(REMOVE_THESIS, {
        refetchQueries: () => [{ query: GET_THESES }],
    });
    const { renderPutThesisForm, showPutThesisModal } = usePutThesisForm();

    useEffect(() => {
        if (isInitialized) {
            getTheses();
        }
    }, [user, isInitialized]);

    const handlePutThesis = (thesis = null) => {
        const thesisObj = Object.assign({}, thesis) || {};
        const isAdmin = user && user.isAdmin;
        if (!thesis && !isAdmin) {
            thesisObj.graduateId = user && user.album;
            thesisObj.graduateName = user && `${user.firstName} ${user.lastName}`;
            thesisObj.type = 'zgłoszona';
        }
        showPutThesisModal(thesisObj, isAdmin);
    };

    const handleThesisRemove = thesis => {
        Modal.confirm({
            title: 'Czy na pewno chcesz usunąć?',
            content: 'Tej operacji nie można cofnąć!',
            okText: 'Tak, usuń',
            cancelText: 'Anuluj',
            onOk: () => {
                removeThesis({
                    variables: {
                        id: thesis.id,
                    },
                });
            },
        });
    };

    const filteredTheses =
        data &&
        data.theses &&
        data.theses.filter(thesis => thesis.type === type && (!favourites || (favourites && thesis.isFavourite)));

    return (
        <>
            <div>
                {renderPutThesisForm()}
                {state && state.isInitialized && !state.isLoggedIn && (
                    <Alert
                        message="Zaloguj się"
                        description={
                            <>
                                Studencie! Jeśli chcesz pisać u autora tej strony pracę dyplomową to przede wszystkim{' '}
                                <Link href="/login">
                                    <a>zaloguj się</a>
                                </Link>{' '}
                                w tym serwisie. Po zalogowaniu możesz kliknąć coś dla siebie z{' '}
                                <Link href="/diplomas/proposed">
                                    <a>oferowanych tematów prac</a>
                                </Link>{' '}
                                by zarezerwować ten temat. Odpowiem na to w ciągu 24h.
                            </>
                        }
                        closable={false}
                        type="warning"
                        showIcon
                        style={{ marginBottom: 10 }}
                    />
                )}
            </div>
            {!data && loading && <Spin />}
            {filteredTheses && user && !user.isAdmin && !loading && (
                <Button name="primary" onClick={() => handlePutThesis()}>
                    Zaproponuj własny temat
                </Button>
            )}
            {filteredTheses && user && user.isAdmin && !loading && (
                <Button name="primary" onClick={() => handlePutThesis()}>
                    Dodaj nowy temat
                </Button>
            )}
            {filteredTheses && !loading && (
                <Table
                    style={{ marginTop: 10 }}
                    columns={getColumns(type, !!user, user && user.isAdmin, {
                        onEdit: handlePutThesis,
                        onRemove: handleThesisRemove,
                    })}
                    dataSource={filteredTheses}
                    pagination={false}
                    rowKey="id"
                />
            )}
        </>
    );
};
