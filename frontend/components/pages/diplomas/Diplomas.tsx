import React, { useContext } from 'react';
import { Table, Alert } from 'antd';
import Link from 'next/link';
import AuthContext from '../../stores/AuthContext';

const columns = [
    {
        title: 'Numer',
        dataIndex: 'number',
        key: 'number',
    },
    {
        title: 'Rok',
        dataIndex: 'year',
        key: 'year',
    },
    {
        title: 'Dyplomant',
        dataIndex: 'person',
        key: 'person',
    },
    {
        title: 'Temat',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Konsultant',
        dataIndex: 'consultant',
        key: 'consultant',
    },
    {
        title: 'Szczegóły',
        dataIndex: 'details',
        key: 'details',
    },
];

const data = [
    {
        key: '1',
        number: '1',
        year: 1995,
        person: 'Artur Maliszewski',
        title:
            'Prognozowanie popytu w barach szybkiej obsługi z wykorzystaniem metody wnioskowania z zapamiętanych przypadków, testowane na modelu symulacyjnym',
        consultant: null,
        details: null,
    },
];

export default () => {
    const { state } = useContext(AuthContext);

    return (
        <>
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
            <Table columns={columns} dataSource={data} pagination={false} />
        </>
    );
};
