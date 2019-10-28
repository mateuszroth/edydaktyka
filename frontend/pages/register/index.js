import React from "react";
import { Layout } from "antd";
import RegisterForm from "../../components/pages/register/RegisterForm";
import Breadcrumb from "../../components/pages/register/Breadcrumb";
import styles from "./index.module.scss";

const PAGE_NAME = "Rejestracja";

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
            <div className={styles.content}>
              <RegisterForm />
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}
