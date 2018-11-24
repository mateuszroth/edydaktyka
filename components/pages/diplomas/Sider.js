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
      <Menu.SubMenu key="sub1" title={<Link href="/help"><span><Icon type="snippets" />Prace dyplomowe</span></Link>}>
        <Menu.Item key="3-1">Obronione</Menu.Item>
        <Menu.Item key="3-2">Realizowane</Menu.Item>
        <Menu.Item key="3-3">Proponowane</Menu.Item>
        <Menu.Item key="3-4">Przygotowane</Menu.Item>
        <Menu.Item key="3-5">Najciekawsze</Menu.Item>
        <Menu.Item key="3-6">Promotorstwo</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  </Sider>
)