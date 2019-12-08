import React, { useContext } from 'react';
import { Layout, PageHeader } from 'antd';
import Sider from '../../components/pages/diplomas/Sider';
import Breadcrumb from '../../components/pages/diplomas/Breadcrumb';
import Diplomas from '../../components/pages/diplomas/Diplomas';
import Router from 'next/router';
import AuthContext from '../../components/stores/AuthContext';

const PAGE_NAME = 'Proponowane tematy prac dyplomowych do realizacji';

interface DiplomasPageProps {}

const DiplomasPage: React.FC<DiplomasPageProps> = () => {
    const { state: authState } = useContext(AuthContext);
    const { user } = authState;

    return (
        <Layout>
            <Sider isAdmin={user && user.isAdmin} />
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb />
                <Layout.Content
                    style={{
                        background: '#fff',
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    <PageHeader onBack={() => Router.push('/diplomas')} ghost={false} title={PAGE_NAME} />
                    <Diplomas type="pomyślany" />
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default DiplomasPage;
