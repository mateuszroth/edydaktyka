import React from 'react'
import Head from 'next/head'
import { Layout, Menu, Breadcrumb, Divider } from 'antd'

const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

const PAGE_NAME = 'Strona główna'

export default class extends React.Component {
  static async getInitialProps(props) {
    console.log('keys', Object.keys(props))
    return {}
  }

  render() {
    return (
      <Layout>
        <Head>
          <title>{PAGE_NAME}</title>
        </Head>
        <Layout style={{ padding: '0 24px 24px', maxWidth: '1150px', margin: '0 auto', }}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>{PAGE_NAME}</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            <div>
              <div style={{ textAlign: 'center' }}>
                <img src="http://www.cs.put.poznan.pl/aurbanski/cw.jpg" alt="Centrum Wykładowe" width="100%" />
                <Divider />
                <img src="http://www.cs.put.poznan.pl/aurbanski/sam-na_dachu.jpg" alt="Andrzej Urbański" width="100" />
                <img src="http://www.cs.put.poznan.pl/aurbanski/praca.jpg" alt="Pokój konsultacji" />
                <img src="http://www.cs.put.poznan.pl/aurbanski/Plan-CW5.png" alt="Dojście" />
              </div>
              <Divider />
              <h1>
                Serwis wykładowcy informatyki Edu.Andrzeju.pl. Nie tylko dla moich studentów.
              </h1>
              <Divider />
              <h2>Zapraszam na konsultacje</h2>
              <h3>osobiste - w środy od 15:00 do 16:40 w pok.105 Centrum Wykładowe</h3>
              <h3>zdalne - w każdym czasie na adres e-mail: <a href="mailto:andrzej.urbanski@cs.put.poznan.pl">andrzej.urbanski@cs.put.poznan.pl</a></h3>
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
