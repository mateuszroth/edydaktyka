import React from "react";
import App, { Container } from "next/app";
import Link from "next/link";
import Head from "next/head";
import {
  Row,
  Layout,
  Menu,
  Icon,
  BackTop,
  Col,
  Button,
  notification,
  ConfigProvider,
  Affix,
  Modal
} from "antd";
import plPL from "antd/lib/locale-provider/pl_PL";
import { AuthProvider, AuthConsumer } from "../components/stores/AuthContext";
import Footer from "../components/layout/footer";
import { ApolloProvider } from "react-apollo";
import withApolloClient from "../components/hocs/withApolloClient";
import styles from "./_app.module.scss";
import stylesheet from "antd/dist/antd.css";
import WrappedLoginForm from "../components/pages/login/LoginForm";

const { SubMenu } = Menu;
const { Header } = Layout;

interface AppProps {
  apollo: any;
}

class MyApp extends App<AppProps> {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  state = {
    isLoginModalVisible: false
  }

  handleLogOut = handler => {
    handler();
    notification.success({
      message: "Pomyślnie wylogowano"
    });
  };

  showLoginModal = () => {
    this.setState({
      isLoginModalVisible: true
    })
  };

  closeLoginModal = () => {
    this.setState({
      isLoginModalVisible: false
    })
  };

  render() {
    const { Component, pageProps, apollo } = this.props;
    const { isLoginModalVisible } = this.state;

    return (
      <ApolloProvider client={apollo}>
        <ConfigProvider locale={plPL}>
          <AuthProvider
            onLogout={apollo.clearStore.bind(apollo)}
            onLogin={apollo.resetStore.bind(apollo)}
          >
            <div className={styles.app}>
              <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
              <Head>
                <title>Andrzej P. Urbański | eDydaktyka</title>
              </Head>
              <Layout style={{ minHeight: "100vh" }}>
                <AuthConsumer>
                  {({ state: auth, logOut, currentGroup }) => (
                    <>
                      <Header className={styles.header}>
                        <Menu
                          theme="dark"
                          mode="horizontal"
                          // defaultSelectedKeys={['0']}
                          style={{ lineHeight: "64px" }}
                          selectedKeys={[]}
                        >
                          <Menu.Item key="0" className={styles.logo}>
                            <Link href="/">
                              <a>
                                <Icon type="home" />
                                <strong>A. Urbański</strong>
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
                            <Link href="/consultations">
                                <a>Zarezerwuj konsultacje</a>
                              </Link>
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
                                <a>
                                  Organizacja Usług Komercyjnych w Internecie
                                </a>
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="2-2">
                              <Link href="/lessons/bai">
                                <a>Bogate Aplikacje Internetowe</a>
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="2-3">
                              <Link href="/lessons/pw">
                                <a>Programowanie wizualne</a>
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="2-4">
                              <Link href="/lessons/aisd">
                                <a>Algorytmy i struktury danych</a>
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="2-5">
                              <Link href="/lessons/pn">
                                <a>Programowanie niskopoziomowe</a>
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="2-6">
                              <Link href="/lessons/pp">
                                <a>Podstawy programowania</a>
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
                              <Link href="/diplomas/done">
                                <a>Obronione</a>
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="3-2">
                              <Link href="/diplomas/inprogress">
                                <a>Realizowane</a>
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="3-3">
                              <Link href="/diplomas/proposed">
                                <a>Proponowane</a>
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="3-4">
                              <Link href="/diplomas/favourites">
                                <a>Najciekawsze</a>
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="3-5">
                              <Link href="/diplomas/about">
                                <a>Promotorstwo</a>
                              </Link>
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
                          {!auth.isLoggedIn && (
                            <Menu.Item key="6">
                              <Link href="/questionnaire">
                                <a>
                                  <Icon type="book" />
                                  Ankieta
                                </a>
                              </Link>
                            </Menu.Item>
                          )}
                          {!auth.isLoggedIn && (
                            <Menu.Item key="7">
                              <Link href="/register">
                                <a>
                                  <Icon type="user-add" />
                                  Rejestracja
                                </a>
                              </Link>
                            </Menu.Item>
                          )}
                          {!auth.isLoggedIn && (
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
                          {auth.isLoggedIn && (
                            <Menu.Item key="9">
                              <Link href="/schedule">
                                <a>
                                  <Icon type="schedule" />
                                  Obecności
                                </a>
                              </Link>
                            </Menu.Item>
                          )}
                          {auth.isLoggedIn && (
                            <Menu.Item key="10">
                              <Link href="/reports">
                                <a>
                                  <Icon type="file-text" />
                                  Sprawozdania
                                </a>
                              </Link>
                            </Menu.Item>
                          )}
                          {auth.isLoggedIn && (
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
                      </Header>
                      <Affix>
                        <div className={styles.loggedInHeader}>
                          <Row>
                            <Col sm={20}>
                              {auth.isLoggedIn && auth.user && (
                                <span>
                                  Cześć {auth.user.firstName} (
                                  <strong>{auth.user.album}</strong>)!{" "}
                                  {currentGroup && (
                                    <>
                                      Przeglądasz kurs{" "}
                                      <strong>{currentGroup.courseName}</strong>
                                    </>
                                  )}
                                </span>
                              )}
                            </Col>
                            <Col sm={4} style={{ textAlign: "right" }}>
                              {auth.isLoggedIn && auth.user && (
                                <Button
                                  type="danger"
                                  onClick={() => this.handleLogOut(logOut)}
                                >
                                  Wyloguj się
                                </Button>
                              )}
                              {auth.isInitialized && !auth.isLoggedIn && !auth.user && (
                                <>
                                  <Button
                                    type="default"
                                    onClick={this.showLoginModal}
                                  >
                                    Zaloguj się
                                  </Button>
                                  <Modal
                                    visible={isLoginModalVisible}
                                    title="Zaloguj się"
                                    onCancel={this.closeLoginModal}
                                    footer={[]}
                                  >
                                    <WrappedLoginForm name="login" onRedirect={this.closeLoginModal} />
                                  </Modal>
                                </>
                              )}
                            </Col>
                          </Row>
                        </div>
                      </Affix>
                    </>
                  )}
                </AuthConsumer>
                <Component {...pageProps} />
                <Footer />
                <BackTop />
              </Layout>
            </div>
          </AuthProvider>
        </ConfigProvider>
      </ApolloProvider>
    );
  }
}

export default withApolloClient(MyApp);
