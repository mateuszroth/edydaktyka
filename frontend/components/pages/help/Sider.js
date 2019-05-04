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
      <Menu.SubMenu key="sub1" title={<Link href="/help"><span><Icon type="question-circle" />Pomoc</span></Link>}>
        <Menu.Item key="1-1"><Link href="/help">Funkcjonalność strony</Link></Menu.Item>
        <Menu.Item key="1-2"><Link href="/help/faq"><a>FAQ - Najczęściej zadawane pytania</a></Link></Menu.Item>
        <Menu.Item key="1-3">Rezerwacja konsultacji</Menu.Item>
        <Menu.Item key="1-4">Przesłania sprawozdania</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  </Sider>
)