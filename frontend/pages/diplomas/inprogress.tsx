import React from 'react';
import { Layout, PageHeader } from 'antd';
import Sider from '../../components/pages/diplomas/Sider';
import Breadcrumb from '../../components/pages/diplomas/Breadcrumb';
import Diplomas from '../../components/pages/diplomas/Diplomas';
import Router from 'next/router';

const PAGE_NAME = 'Obecnie realizowane prace dyplomowe';

export default class extends React.Component {
    render() {
        return (
            <Layout>
                <Sider />
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
                        <Diplomas type="realizowany" />
                    </Layout.Content>
                </Layout>
            </Layout>
        );
    }
}
