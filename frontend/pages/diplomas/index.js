import React from 'react';
import { Layout, Menu, PageHeader, Typography } from 'antd';
import Link from 'next/link';
import Sider from '../../components/pages/diplomas/Sider';
import Breadcrumb from '../../components/pages/diplomas/Breadcrumb';

const PAGE_NAME = 'Prace dyplomowe';

export default class extends React.Component {
    static async getInitialProps(props) {
        return {};
    }

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
                        <PageHeader ghost={false} title={PAGE_NAME} />
                        <Typography.Paragraph>
                            Wybierz poniżej interesującą Cię kategorię prac dyplomowych. Możesz przejść też do strony
                            opisującej moje{' '}
                            <Link href="/diplomas/about">
                                <a>promotorstwo</a>
                            </Link>
                            .
                        </Typography.Paragraph>
                        <div>
                            <Menu>
                                <Menu.Item key="3-1">
                                    <Link href="/diplomas/done">
                                        <a>Obronione</a>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3-2">
                                    <Link href="/diplomas/inprogress">
                                        <a>Realizowane</a>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3-3">
                                    <Link href="/diplomas/proposed">
                                        <a>Proponowane</a>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3-4">
                                    <Link href="/diplomas/favourites">
                                        <a>Najciekawsze</a>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3-5">
                                    <Link href="/diplomas/about">
                                        <a>Promotorstwo</a>
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </div>
                    </Layout.Content>
                </Layout>
            </Layout>
        );
    }
}
