import React from 'react'
import { Layout, Menu } from 'antd'
import Sider from '../../components/pages/diplomas/Sider'
import Breadcrumb from '../../components/pages/diplomas/Breadcrumb'

const PAGE_NAME = 'Dyplomy'

export default class extends React.Component {
  static async getInitialProps(props) {
    return {}
  }

  render() {
    return (
      <Layout>
        <Sider />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb />
          <Layout.Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            <div>
              <Menu>
                <Menu.Item key="3-1">Obronione</Menu.Item>
                <Menu.Item key="3-2">Realizowane</Menu.Item>
                <Menu.Item key="3-3">Proponowane</Menu.Item>
                <Menu.Item key="3-4">Przygotowane</Menu.Item>
                <Menu.Item key="3-5">Najciekawsze</Menu.Item>
                <Menu.Item key="3-6">Promotorstwo</Menu.Item>
              </Menu>
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}
