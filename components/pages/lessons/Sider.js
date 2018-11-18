import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import Link from 'next/link'

const { Sider } = Layout

export default () => (
  <Sider width={250} style={{ background: '#fff' }}>
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%' }}
    >
      <Menu.SubMenu key="sub1" title={<Link href="/help"><span><Icon type="highlight" />Zajęcia</span></Link>}>
        <Menu.Item key="2-1">Organizacja Usług Komercyjnych w Internecie</Menu.Item>
        <Menu.Item key="2-2">Bogate Aplikacje Internetowe</Menu.Item>
        <Menu.Item key="2-3">Programowanie wizualne</Menu.Item>
        <Menu.Item key="2-4">Algorytmy i struktury danych</Menu.Item>
        <Menu.Item key="2-5">Programowanie niskopoziomowe</Menu.Item>
        <Menu.Item key="2-6">Podstawy programowania</Menu.Item>
        <Menu.Item key="2-7">Programowanie teleinformatyka</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  </Sider>
)