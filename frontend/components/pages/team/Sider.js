import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import Link from 'next/link';

const { Sider } = Layout;

export default () => (
    <Sider width={250} style={{ background: '#fff' }}>
        <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%' }}>
            <Menu.SubMenu
                key="sub1"
                title={
                    <Link href="/team">
                        <span>
                            <Icon type="team" />
                            Zespół
                        </span>
                    </Link>
                }
            >
                <Menu.Item key="5-0">
                    <Link href="/team/invite">
                        <span>Zaproś</span>
                    </Link>
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    </Sider>
);
