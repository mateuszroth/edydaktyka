import React from 'react'
import { Layout, Menu } from 'antd'
import Sider from '../../components/pages/diplomas/Sider'
import Breadcrumb from '../../components/pages/diplomas/Breadcrumb'

const PAGE_NAME = 'Dyplomy proponowane'

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
              Lista dyplomów proponowanych
              <table>
                <tbody>
                    <tr>
                      <td>2018</td>
                      <td>Bartosz Gehrke, Rafał Pyrkosz</td>
                      <td>	Gra o wydarzeniach Poznańskiego Czerwca '56</td>
                    </tr>
                    <tr>
                      <td>2018</td>
                      <td>Bartosz Gehrke, Rafał Pyrkosz</td>
                      <td>	Gra o wydarzeniach Poznańskiego Czerwca '56</td>
                    </tr>
                    <tr>
                      <td>2018</td>
                      <td>Bartosz Gehrke, Rafał Pyrkosz</td>
                      <td>	Gra o wydarzeniach Poznańskiego Czerwca '56</td>
                    </tr>
                    <tr>
                      <td>2018</td>
                      <td>Bartosz Gehrke, Rafał Pyrkosz</td>
                      <td>	Gra o wydarzeniach Poznańskiego Czerwca '56</td>
                    </tr>
                  </tbody>
              </table>
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}
