import React from "react";
import { Alert, Button, Layout, notification } from "antd";
import Router from "next/router";
import Breadcrumb from "../../components/pages/questionnaire/Breadcrumb";
import { AuthConsumer } from "../../components/stores/AuthContext";
import styles from "./index.module.scss";

const PAGE_NAME = "Twoje konto";

export default class extends React.Component {
  static async getInitialProps(props) {
    return {};
  }

  handleLogOut = handler => {
    handler();
    Router.push("/");
    notification.success({
      message: `Do zobaczenia Mateusz`,
      description: "Pomyślnie wylogowano"
    });
  };

  render() {
    return (
      <AuthConsumer>
        {({ state: { user = {} }, logOut }) => (
          <Layout>
            <Layout style={{ padding: "0 24px 24px" }}>
              <Breadcrumb />
              <Layout.Content
                style={{
                  background: "#fff",
                  padding: 24,
                  margin: 0,
                  minHeight: 280
                }}
              >
                <h1 className={styles.header}>{PAGE_NAME}</h1>
                <Alert
                  message="Informacje o koncie"
                  description="W tym miejscu mozesz podejrzeć informacje na temat swojego konta"
                  type="info"
                />
                <div className={styles.content}>
                  Twoje dane:
                  <ul>
                    <li>Numer indeksu {user && user.id}</li>
                    <li>Imię {user && user.name}</li>
                    <li>Nazwisko {user && user.surname}</li>
                  </ul>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => this.handleLogOut(logOut)}
                  >
                    Wyloguj się
                  </Button>
                </div>
              </Layout.Content>
            </Layout>
          </Layout>
        )}
      </AuthConsumer>
    );
  }
}
