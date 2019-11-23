import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import Link from 'next/link';

const { Sider } = Layout;

export default () => (
    <Sider width={300} collapsedWidth="0" breakpoint="lg" style={{ background: '#fff' }}>
        <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%' }}>
            <Menu.SubMenu
                key="sub1"
                title={
                    <Link href="/autor">
                        <span>
                            <Icon type="trophy" />
                            Autor
                        </span>
                    </Link>
                }
            >
                <Menu.Item key="5-0">
                    <Link href="/autor">
                        <span>O autorze</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="5-1">
                    <a target="_blank" href="http://www.goldenline.pl/andrzej-urbanski">
                        Profil na GoldenLine.pl
                    </a>
                </Menu.Item>
                <Menu.Item key="5-2">
                    <a target="_blank" href="http://pl.linkedin.com/in/urbanski">
                        Profil na Linkedin.com
                    </a>
                </Menu.Item>
                <Menu.Item key="5-3">
                    <a target="_blank" href="http://www.xing.com/profile/AndrzejP_Urbanski">
                        Profil na Xing.com
                    </a>
                </Menu.Item>
                <Menu.Item key="5-4">
                    <a target="_blank" href="http://www.eioba.pl/apu">
                        Eioba.pl
                    </a>
                </Menu.Item>
                <Menu.Item key="5-5">
                    <a target="_blank" href="http://andrzeju.pl/">
                        Profil na Andrzeju.pl
                    </a>
                </Menu.Item>
                <Menu.Item key="5-6">
                    <a target="_blank" href="http://alanbit.pl/">
                        Profil na AlanBit.pl
                    </a>
                </Menu.Item>
                <Menu.Item key="5-7">
                    <a target="_blank" href="https://www.facebook.com/andrzej.urbanski.5015">
                        Profil na Facebooku
                    </a>
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    </Sider>
);
