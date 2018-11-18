import React from 'react'
import App, { Container } from 'next/app'
import Link from 'next/link'
import Head from 'next/head'
import { Layout, Menu, Breadcrumb, Icon, LocaleProvider } from 'antd'
import plPL from 'antd/lib/locale-provider/pl_PL'
import styles from './_app.module.scss'
import stylesheet from 'antd/dist/antd.min.css'

const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <LocaleProvider locale={plPL}>
        <Container className={styles.app}>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <Head>
            <title>eDydaktyka</title>
          </Head>
          <Layout>
            <Header className={styles.header}>
              <Menu
                theme="dark"
                mode="horizontal"
                // defaultSelectedKeys={['0']}
                style={{ lineHeight: '64px' }}
              >
                
                <Menu.Item key="0" className={styles.logo}>
                  <Link href="/">
                    <a>
                      <Icon type="home" />
                      <strong>eDydaktyka | A. Urbański</strong>
                    </a>
                  </Link>
                </Menu.Item>
                <SubMenu key="1" title={<Link href="/help"><a><Icon type="question-circle" />Pomoc</a></Link>}>
                  <Menu.Item key="1-1"><Link href="/help">Funkcjonalność strony</Link></Menu.Item>
                  <Menu.Item key="1-2">FAQ - Najczęściej zadawane pytania</Menu.Item>
                  <Menu.Item key="1-3">Rezerwacja konsultacji</Menu.Item>
                  <Menu.Item key="1-4">Przesłania sprawozdania</Menu.Item>
                </SubMenu>
                <SubMenu key="2" title={<Link href="/lessons"><a><Icon type="highlight" />Zajęcia</a></Link>}>
                  <Menu.Item key="2-1">Organizacja Usług Komercyjnych w Internecie</Menu.Item>
                  <Menu.Item key="2-2">Bogate Aplikacje Internetowe</Menu.Item>
                  <Menu.Item key="2-3">Programowanie wizualne</Menu.Item>
                  <Menu.Item key="2-4">Algorytmy i struktury danych</Menu.Item>
                  <Menu.Item key="2-5">Programowanie niskopoziomowe</Menu.Item>
                  <Menu.Item key="2-6">Podstawy programowania</Menu.Item>
                  <Menu.Item key="2-7">Programowanie teleinformatyka</Menu.Item>
                </SubMenu>
                <SubMenu key="3" title={<Link href="/diplomas"><a><Icon type="snippets" />Dyplomy</a></Link>}>
                  <Menu.Item key="3-1">Obronione</Menu.Item>
                  <Menu.Item key="3-2">Realizowane</Menu.Item>
                  <Menu.Item key="3-3">Proponowane</Menu.Item>
                  <Menu.Item key="3-4">Przygotowane</Menu.Item>
                  <Menu.Item key="3-5">Najciekawsze</Menu.Item>
                  <Menu.Item key="3-6">Promotorstwo</Menu.Item>
                </SubMenu>

                <Menu.Item key="4"><Icon type="folder-open" />Popularyzatorskie</Menu.Item>
                <Menu.Item key="5"><Icon type="trophy" />Autor</Menu.Item>

                {/* tylko dla niezalogowanych */}
                <Menu.Item key="6"><Icon type="book" />Ankieta</Menu.Item>
                <Menu.Item key="7"><Icon type="user-add" />Rejestracja</Menu.Item>
                <Menu.Item key="8"><Icon type="login" />Logowanie</Menu.Item>
                {/* tylko dla niezalogowanych */}

                {/* tylko dla zalogowanych */}
                {/*<Menu.Item key="9"><Icon type="schedule" />Plan</Menu.Item>
                <Menu.Item key="10"><Icon type="team" />Zespół</Menu.Item>*/}
                {/* tylko dla zalogowanych */}
              </Menu>
            </Header>
            <Component {...pageProps} />
            <Footer className={styles.footer}>
              <p>Copyright © by Andrzej P. Urbański | <a href="mailto:andrzej.urbanski@cs.put.poznan.pl">andrzej.urbanski@cs.put.poznan.pl</a></p>
              <p className={styles.footerAnnotation}>
                Ta witryna wykorzystuje pliki cookies i dane przeglądarki do przechowywania informacji na Twoim komputerze.<br />
                Bez nich strona nie będzie działała poprawnie. W każdym momencie możesz dokonać zmiany ustawień dotyczących ich zapisu.<br /><br />
                W Poznaniu mamy teraz godzinę XX:XX. Słońce wzeszlo o XX:XX, a zajdzie o XX:XX, co odpowiednio zaktualizuje tapetę. Następna zmiana o XX:XX.<br />
                Poza tym od 1 grudnia do 31 stycznia obowiązuje tapeta świąteczna z choinką.
              </p>
            </Footer>
          </Layout>
        </Container>
      </LocaleProvider>
    )
  }
}
