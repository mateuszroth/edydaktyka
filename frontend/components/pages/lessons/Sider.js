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
                    <Link href="/help">
                        <span>
                            <Icon type="highlight" />
                            Zajęcia i wykłady
                        </span>
                    </Link>
                }
            >
                <Menu.Item key="2-1">
                    <Link href="/lessons/oukwi">
                        <a>Organizacja Usług Komercyjnych w Internecie</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2-2">
                    <Link href="/lessons/bai">
                        <a>Bogate Aplikacje Internetowe</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2-3">
                    <a href="http://www.cs.put.poznan.pl/jkniat/MatDydakt.html" target="blank">
                        Programowanie wizualne
                    </a>
                </Menu.Item>
                <Menu.Item key="2-4">
                    <a href="http://www.cs.put.poznan.pl/mmachowiak/aisd.php" target="blank">
                        Algorytmy i struktury danych
                    </a>
                </Menu.Item>
                <Menu.Item key="2-5">
                    <a href="http://www.cs.put.poznan.pl/arybarczyk/PNS.php" target="blank">
                        Programowanie niskopoziomowe
                    </a>
                </Menu.Item>
                <Menu.Item key="2-6">
                    <a href="http://www.cs.put.poznan.pl/aurbanski/lista-zadan.pdf" target="blank">
                        Podstawy programowania
                    </a>
                </Menu.Item>
                <Menu.Item key="2-7">
                    <a href="http://www.cs.put.poznan.pl/arybarczyk/JiPPS.php#" target="blank">
                        Programowanie obiektowe - teleinformatyka
                    </a>
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    </Sider>
);
