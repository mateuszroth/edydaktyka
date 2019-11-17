import React from "react";
import { Layout, PageHeader } from "antd";
import Sider from "../../components/pages/lessons/Sider";
import Breadcrumb from "../../components/pages/lessons/Breadcrumb";
import Router from "next/router";

const PAGE_NAME = "Podstawy Programowania";

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
              margin: 0,
              minHeight: 280
            }}
          >
            <PageHeader
              onBack={() => Router.push("/lessons")}
              ghost={false}
              title={PAGE_NAME}
            />
            <div>
              <a href="http://www.cs.put.poznan.pl/aurbanski/lista-zadan.pdf" target="blank">Podstawy programowania</a>
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}
