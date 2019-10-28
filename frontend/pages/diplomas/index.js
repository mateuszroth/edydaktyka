import React from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";
import Sider from "../../components/pages/diplomas/Sider";
import Breadcrumb from "../../components/pages/diplomas/Breadcrumb";

const PAGE_NAME = "Dyplomy";

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
            <div>
              <Menu>
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
                  <Link href="/diplomas/favourites">Najciekawsze</Link>
                </Menu.Item>
                <Menu.Item key="3-6">
                  <Link href="/diplomas/about">Promotorstwo</Link>
                </Menu.Item>
              </Menu>
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}
