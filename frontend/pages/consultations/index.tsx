import React from 'react';
import { PageHeader, Layout } from 'antd';
import Breadcrumb from '../../components/pages/consultations/Breadcrumb';
import Consultations from '../../components/pages/consultations/Consultations';
import styles from './index.module.scss';

const PAGE_NAME = 'Konsultacje';

interface ConsultationsPageProps {}

const ConsultationsPage: React.FC<ConsultationsPageProps> = () => {
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
                    <Consultations />
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default ConsultationsPage;
