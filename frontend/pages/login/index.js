import React from "react";
import { PageHeader, Layout } from "antd";
import LoginForm from "../../components/pages/login/LoginForm";
import Breadcrumb from "../../components/pages/login/Breadcrumb";
import styles from "./index.module.scss";

const PAGE_NAME = "Logowanie";

export default class extends React.Component {
  static async getInitialProps(props) {
    return {};
  }

  render() {
    return (
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
            <PageHeader
              ghost={false}
              title={PAGE_NAME}
            />
            <div className={styles.content}>
              <LoginForm />
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}
