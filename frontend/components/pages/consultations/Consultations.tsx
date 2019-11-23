import React, { useContext } from 'react';
import { Table, Alert } from 'antd';
import Link from 'next/link';
import AuthContext from '../../stores/AuthContext';

const hours = ['1510', '1520', '1530', '1540', '1550', '1600', '1610', '1620'];

const columns = [
    {
        title: 'Data',
        dataIndex: 'data',
        key: 'data',
    },
];

hours.forEach(hour =>
    columns.push({
        title: String(hour).slice(0, 2) + ':' + String(hour).slice(2, 4),
        dataIndex: String(hour),
        key: String(hour),
    }),
);

const data = [
    {
        key: '2020-01-01',
        data: '2020-01-01',
        [hours[0]]: 'Rezerwuj',
        [hours[1]]: 'Rezerwuj',
        [hours[2]]: 'Rezerwuj',
        [hours[3]]: 'Rezerwuj',
        [hours[4]]: 'Rezerwuj',
        [hours[5]]: 'Rezerwuj',
        [hours[6]]: 'Rezerwuj',
        [hours[7]]: 'Rezerwuj',
    },
    {
        key: '2020-01-07',
        data: '2020-01-07',
        [hours[0]]: 'Rezerwuj',
        [hours[1]]: 'Rezerwuj',
        [hours[2]]: 'Rezerwuj',
        [hours[3]]: 'Rezerwuj',
        [hours[4]]: 'Rezerwuj',
        [hours[5]]: 'Rezerwuj',
        [hours[6]]: 'Rezerwuj',
        [hours[7]]: 'Rezerwuj',
    },
];

export default () => {
    const { state } = useContext(AuthContext);

    return (
        <>
            <Table columns={columns} dataSource={data} pagination={false} />
            {state && state.isInitialized && !state.isLoggedIn && (
                <Alert
                    message="Zaloguj się"
                    description={
                        <>
                            Aby rezerwować terminy konsultacji, konieczne jest{' '}
                            <Link href="/login">
                                <a>zalogowanie się</a>
                            </Link>
                            .
                        </>
                    }
                    closable={false}
                    type="warning"
                    showIcon
                    style={{ marginTop: 10 }}
                />
            )}
        </>
    );
};
