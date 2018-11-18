import React from 'react'
import { Layout, Menu } from 'antd'
import Sider from '../components/pages/lessons/Sider'
import Breadcrumb from '../components/pages/lessons/Breadcrumb'

const PAGE_NAME = 'Zajęcia'

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
                <Menu.Item key="2-1">Organizacja Usług Komercyjnych w Internecie</Menu.Item>
                <Menu.Item key="2-2">Bogate Aplikacje Internetowe</Menu.Item>
                <Menu.Item key="2-3">Programowanie wizualne</Menu.Item>
                <Menu.Item key="2-4">Algorytmy i struktury danych</Menu.Item>
                <Menu.Item key="2-5">Programowanie niskopoziomowe</Menu.Item>
                <Menu.Item key="2-6">Podstawy programowania</Menu.Item>
                <Menu.Item key="2-7">Programowanie teleinformatyka</Menu.Item>
              </Menu>
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}
