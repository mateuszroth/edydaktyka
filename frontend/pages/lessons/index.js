import React from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";
import Sider from "../../components/pages/lessons/Sider";
import Breadcrumb from "../../components/pages/lessons/Breadcrumb";

const PAGE_NAME = "Zajęcia";

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
                <Menu.Item key="2-1">
                  <Link href="/lessons/oukwi">
                    Organizacja Usług Komercyjnych w Internecie
                  </Link>
                </Menu.Item>
                <Menu.Item key="2-2">
                  <Link href="/lessons/bai">Bogate Aplikacje Internetowe</Link>
                </Menu.Item>
                <Menu.Item key="2-3">
                  <Link href="/lessons/pw">Programowanie wizualne</Link>
                </Menu.Item>
                <Menu.Item key="2-4">
                  <Link href="/lessons/aisd">Algorytmy i struktury danych</Link>
                </Menu.Item>
                <Menu.Item key="2-5">
                  <Link href="/lessons/pn">Programowanie niskopoziomowe</Link>
                </Menu.Item>
                <Menu.Item key="2-6">
                  <Link href="/lessons/pp">Podstawy programowania</Link>
                </Menu.Item>
              </Menu>
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}
