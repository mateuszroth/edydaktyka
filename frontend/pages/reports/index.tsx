import React from 'react';
import { PageHeader, Layout } from 'antd';
import Breadcrumb from '../../components/pages/reports/Breadcrumb';
import styles from './index.module.scss';

const PAGE_NAME = 'Sprawozdania';

interface ReportsPageProps {}

const ReportsPage: React.FC<ReportsPageProps> = () => {
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
                    <PageHeader ghost={false} title={PAGE_NAME} />
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default ReportsPage;
