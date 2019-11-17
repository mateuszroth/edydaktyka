import React from "react";
import { Layout, Menu, PageHeader } from "antd";
import Link from "next/link";
import Sider from "../../components/pages/lessons/Sider";
import Breadcrumb from "../../components/pages/lessons/Breadcrumb";

const PAGE_NAME = "Materiały z zajęć i wykładów";

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
            <PageHeader ghost={false} title={PAGE_NAME} />
            <div>
              <Menu>
                <Menu.Item key="2-1">
                  <Link href="/lessons/oukwi">
                    <a>Organizacja Usług Komercyjnych w Internecie</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2-2">
                  <Link href="/lessons/bai">
                    <a>Bogate Aplikacje Internetowe</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2-3">
                  <a
                    href="http://www.cs.put.poznan.pl/jkniat/MatDydakt.html"
                    target="blank"
                  >
                    Programowanie wizualne
                  </a>
                </Menu.Item>
                <Menu.Item key="2-4">
                  <a
                    href="http://www.cs.put.poznan.pl/mmachowiak/aisd.php"
                    target="blank"
                  >
                    Algorytmy i struktury danych
                  </a>
                </Menu.Item>
                <Menu.Item key="2-5">
                  <a
                    href="http://www.cs.put.poznan.pl/arybarczyk/PNS.php"
                    target="blank"
                  >
                    Programowanie niskopoziomowe
                  </a>
                </Menu.Item>
                <Menu.Item key="2-6">
                  <a
                    href="http://www.cs.put.poznan.pl/aurbanski/lista-zadan.pdf"
                    target="blank"
                  >
                    Podstawy programowania
                  </a>
                </Menu.Item>
                <Menu.Item key="2-7">
                  <a
                    href="http://www.cs.put.poznan.pl/arybarczyk/JiPPS.php#"
                    target="blank"
                  >
                    Programowanie obiektowe - teleinformatyka
                  </a>
                </Menu.Item>
              </Menu>
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}
