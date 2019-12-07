import { Alert, Table, Spin } from 'antd';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../stores/AuthContext';
import gql from 'graphql-tag';
import { useLazyQuery } from 'react-apollo';
import { Button } from 'antd/lib/radio';

const GET_THESES = gql`
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

const ADMIN_ACTIONS_COLUMNS = () => [
    {
        title: 'Akcje',
        dataIndex: 'id',
        key: 'actions',
    },
];

interface Handlers {
    onEdit?: (thesis: any) => void;
    onAddVolunteer?: (thesis: any) => void;
    onRemoveVolunteer?: (thesis: any) => void;
    onAcceptVolunteer?: (thesis: any) => void;
}

const getColumns = (type, isUser, isAdmin, handlers: Handlers) => {
    const adminColumns = ADMIN_ACTIONS_COLUMNS();
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

export default ({ type = null, favourites = false }) => {
    const { state } = useContext(AuthContext);
    const { user, isInitialized } = state;
    const [getTheses, { data, loading }] = useLazyQuery(GET_THESES);
    const [theses, setTheses] = useState();

    useEffect(() => {
        if (isInitialized) {
            getTheses();
        }
    }, [user, isInitialized]);

    useEffect(() => {
        if (data && data.theses) {
            const theses = data.theses.filter(thesis => thesis.type === type);
            if (favourites) {
                return setTheses(theses.filter(thesis => thesis.isFavourite));
            }
            return setTheses(theses);
        }
    }, [data]);

    return (
        <>
            <div>
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
            {theses && user && !user.isAdmin && !loading && (
                <Button name="primary" onClick={() => {}}>
                    Zaproponuj własny temat
                </Button>
            )}
            {theses && user && user.isAdmin && !loading && (
                <Button name="primary" onClick={() => {}}>
                    Dodaj nowy temat
                </Button>
            )}
            {theses && !loading && (
                <Table
                    columns={getColumns(type, !!user, user && user.isAdmin, {})}
                    dataSource={theses}
                    pagination={false}
                />
            )}
        </>
    );
};
