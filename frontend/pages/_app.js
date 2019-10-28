import React from "react";
import App, { Container } from "next/app";
import Link from "next/link";
import Head from "next/head";
import { Layout, Menu, Icon, LocaleProvider, BackTop } from "antd";
import plPL from "antd/lib/locale-provider/pl_PL";
import AuthProvider, {
  AuthConsumer
} from "../components/providers/AuthProvider";
import { ApolloProvider } from "react-apollo";
import withApolloClient from "../components/providers/withApolloClient";
import styles from "./_app.module.scss";
import stylesheet from "antd/dist/antd.min.css";

const { SubMenu } = Menu;
const { Header, Footer } = Layout;

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <LocaleProvider locale={plPL}>
          <AuthProvider>
            <Container className={styles.app}>
              <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
              <Head>
                <title>eDydaktyka</title>
              </Head>
              <Layout>
                <Header className={styles.header}>
                  <AuthConsumer>
                    {({ state: auth }) => (
                      <Menu
                        theme="dark"
                        mode="horizontal"
                        // defaultSelectedKeys={['0']}
                        style={{ lineHeight: "64px" }}
                      >
                        <Menu.Item key="0" className={styles.logo}>
                          <Link href="/">
                            <a>
                              <Icon type="home" />
                              <strong>eDydaktyka | A. Urbański</strong>
                            </a>
                          </Link>
                        </Menu.Item>
                        <SubMenu
                          key="1"
                          title={
                            <Link href="/help">
                              <a>
                                <Icon type="question-circle" />
                                Pomoc <Icon type="down" />
                              </a>
                            </Link>
                          }
                        >
                          <Menu.Item key="1-1">
                            <Link href="/help">
                              <a>Funkcjonalność strony</a>
                            </Link>
                          </Menu.Item>
                          <Menu.Item key="1-2">
                            <Link href="/help/faq">
                              <a>FAQ - Najczęściej zadawane pytania</a>
                            </Link>
                          </Menu.Item>
                          <Menu.Item key="1-3">
                            Rezerwacja konsultacji
                          </Menu.Item>
                          <Menu.Item key="1-4">
                            Przesłania sprawozdania
                          </Menu.Item>
                        </SubMenu>
                        <SubMenu
                          key="2"
                          title={
                            <Link href="/lessons">
                              <a>
                                <Icon type="highlight" />
                                Zajęcia
                              </a>
                            </Link>
                          }
                        >
                          <Menu.Item key="2-1">
                            <Link href="/lessons/oukwi">
                              Organizacja Usług Komercyjnych w Internecie
                            </Link>
                          </Menu.Item>
                          <Menu.Item key="2-2">
                            <Link href="/lessons/bai">
                              Bogate Aplikacje Internetowe
                            </Link>
                          </Menu.Item>
                          <Menu.Item key="2-3">
                            <Link href="/lessons/pw">
                              Programowanie wizualne
                            </Link>
                          </Menu.Item>
                          <Menu.Item key="2-4">
                            <Link href="/lessons/aisd">
                              Algorytmy i struktury danych
                            </Link>
                          </Menu.Item>
                          <Menu.Item key="2-5">
                            <Link href="/lessons/pn">
                              Programowanie niskopoziomowe
                            </Link>
                          </Menu.Item>
                          <Menu.Item key="2-6">
                            <Link href="/lessons/pp">
                              Podstawy programowania
                            </Link>
                          </Menu.Item>
                        </SubMenu>
                        <SubMenu
                          key="3"
                          title={
                            <Link href="/diplomas">
                              <a>
                                <Icon type="snippets" />
                                Dyplomy
                              </a>
                            </Link>
                          }
                        >
                          <Menu.Item key="3-1">
                            <Link href="/diplomas/done">Obronione</Link>
                          </Menu.Item>
                          <Menu.Item key="3-2">
                            <Link href="/diplomas/inprogress">Realizowane</Link>
                          </Menu.Item>
                          <Menu.Item key="3-3">
                            <Link href="/diplomas/proposed">Proponowane</Link>
                          </Menu.Item>
                          <Menu.Item key="3-4">
                            <Link href="/diplomas/topresent">Przygotowane</Link>
                          </Menu.Item>
                          <Menu.Item key="3-5">
                            <Link href="/diplomas/favourites">
                              Najciekawsze
                            </Link>
                          </Menu.Item>
                          <Menu.Item key="3-6">
                            <Link href="/diplomas/about">Promotorstwo</Link>
                          </Menu.Item>
                        </SubMenu>

                        <Menu.Item key="4">
                          <Link href="/articles">
                            <a>
                              <Icon type="folder-open" />
                              Popularyzatorskie
                            </a>
                          </Link>
                        </Menu.Item>
                        <SubMenu
                          key="5"
                          title={
                            <Link href="/author">
                              <a>
                                <Icon type="trophy" />
                                Autor
                              </a>
                            </Link>
                          }
                        >
                          <Menu.Item key="5-1">
                            <a
                              target="_blank"
                              href="http://www.goldenline.pl/andrzej-urbanski"
                            >
                              Profil na GoldenLine.pl
                            </a>
                          </Menu.Item>
                          <Menu.Item key="5-2">
                            <a
                              target="_blank"
                              href="http://pl.linkedin.com/in/urbanski"
                            >
                              Profil na Linkedin.com
                            </a>
                          </Menu.Item>
                          <Menu.Item key="5-3">
                            <a
                              target="_blank"
                              href="http://www.xing.com/profile/AndrzejP_Urbanski"
                            >
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
                            <a
                              target="_blank"
                              href="https://www.facebook.com/andrzej.urbanski.5015"
                            >
                              Profil na Facebooku
                            </a>
                          </Menu.Item>
                        </SubMenu>

                        {/* tylko dla niezalogowanych */}
                        {!auth.loggedIn && (
                          <Menu.Item key="6">
                            <Link href="/questionnaire">
                              <a>
                                <Icon type="book" />
                                Ankieta
                              </a>
                            </Link>
                          </Menu.Item>
                        )}
                        {!auth.loggedIn && (
                          <Menu.Item key="7">
                            <Link href="/register">
                              <a>
                                <Icon type="user-add" />
                                Rejestracja
                              </a>
                            </Link>
                          </Menu.Item>
                        )}
                        {!auth.loggedIn && (
                          <Menu.Item key="8">
                            <Link href="/login">
                              <a>
                                <Icon type="login" />
                                Logowanie
                              </a>
                            </Link>
                          </Menu.Item>
                        )}
                        {/* tylko dla niezalogowanych */}

                        {/* tylko dla zalogowanych */}
                        {auth.loggedIn && (
                          <Menu.Item key="9">
                            <Link href="/schedule">
                              <a>
                                <Icon type="schedule" />
                                Plan
                              </a>
                            </Link>
                          </Menu.Item>
                        )}
                        {auth.loggedIn && (
                          <Menu.Item key="10">
                            <Link href="/team">
                              <a>
                                <Icon type="team" />
                                Zespół
                              </a>
                            </Link>
                          </Menu.Item>
                        )}
                        {auth.loggedIn && (
                          <Menu.Item key="11">
                            <Link href="/account">
                              <a>
                                <Icon type="smile" />
                                Twoje konto
                              </a>
                            </Link>
                          </Menu.Item>
                        )}
                        {/* tylko dla zalogowanych */}
                      </Menu>
                    )}
                  </AuthConsumer>
                </Header>
                <Component {...pageProps} />
                <Footer className={styles.footer}>
                  <p>
                    Copyright © by Andrzej P. Urbański |{" "}
                    <a href="mailto:andrzej.urbanski@cs.put.poznan.pl">
                      andrzej.urbanski@cs.put.poznan.pl
                    </a>
                  </p>
                  <p className={styles.footerAnnotation}>
                    Ta witryna wykorzystuje pliki cookies i dane przeglądarki do
                    przechowywania informacji na Twoim komputerze.
                    <br />
                    Bez nich strona nie będzie działała poprawnie. W każdym
                    momencie możesz dokonać zmiany ustawień dotyczących ich
                    zapisu.
                    <br />
                    <br />
                    W Poznaniu mamy teraz godzinę XX:XX. Słońce wzeszlo o XX:XX,
                    a zajdzie o XX:XX, co odpowiednio zaktualizuje tapetę.
                    Następna zmiana o XX:XX.
                    <br />
                    Poza tym od 1 grudnia do 31 stycznia obowiązuje tapeta
                    świąteczna z choinką.
                  </p>
                </Footer>
                <BackTop />
              </Layout>
            </Container>
          </AuthProvider>
        </LocaleProvider>
      </ApolloProvider>
    );
  }
}

export default withApolloClient(MyApp);
