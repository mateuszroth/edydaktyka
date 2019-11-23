import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from 'antd';

const styles = {
    root: {
        margin: '12px 0',
    },
};

export default () => (
    <Breadcrumb style={styles.root}>
        <Breadcrumb.Item>
            <Link href="/">
                <a>Strona główna</a>
            </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
            <Link href="/account">
                <a>Twoje konto</a>
            </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
            <Link href="/group-register">
                <a>Dopisz się do grupy</a>
            </Link>
        </Breadcrumb.Item>
    </Breadcrumb>
);
