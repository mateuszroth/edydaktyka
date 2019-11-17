import React from "react";
import { Layout } from "antd";
import Sider from "../../components/pages/team/Sider";
import Breadcrumb from "../../components/pages/team/Breadcrumb";

const PAGE_NAME = "Zespół";

export default class extends React.Component {
  static async getInitialProps(props) {
    return {};
  }

  render() {
    return (
      <Layout>
        <Sider />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb />
          <Layout.Content
            style={{
              background: "#fff",
              padding: 24,
              margin: "0 auto",
              minHeight: 280,
              width: "100%",
              maxWidth: 1150
            }}
          >
            <div />
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}
