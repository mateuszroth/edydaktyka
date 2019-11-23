import React from 'react';
import { PageHeader, Layout } from 'antd';
import Breadcrumb from '../../components/pages/reset-password/Breadcrumb';
import ResetPasswordForm from '../../components/pages/reset-password/ResetPasswordForm';
import styles from './index.module.scss';
import Router from 'next/router';

const PAGE_NAME = 'Zresetuj hasło';

interface ResetPasswordPageProps {}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = () => {
    return (
        <Layout className={styles.root}>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb />
                <Layout.Content
                    style={{
                        background: '#fff',
                        padding: 24,
                        margin: '0 auto',
                        minHeight: 280,
                        width: '100%',
                        maxWidth: 1150,
                        textAlign: 'center',
                    }}
                >
                    <PageHeader onBack={() => Router.push('/login')} ghost={false} title={PAGE_NAME} />
                    <ResetPasswordForm />
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default ResetPasswordPage;
