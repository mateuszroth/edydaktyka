import React from "react";
import { Layout, PageHeader, List, Typography } from "antd";
import Sider from "../../components/pages/lessons/Sider";
import Breadcrumb from "../../components/pages/lessons/Breadcrumb";
import Router from "next/router";

const PAGE_NAME = "Bogate Aplikacje Internetowe";

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
            <List
              size="large"
              bordered
              style={{ marginTop: 30 }}
              dataSource={[
                <div>
                  <Typography.Title level={4}>
                    Rich Internet Applications
                  </Typography.Title>
                  <ul>
                    <li>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/ria.ppt"
                        target="blank"
                      >
                        Wykład
                      </a>
                    </li>
                  </ul>
                </div>,
                <div>
                  <Typography.Title level={4}>
                    Zajęcia poświęcone WebGL w HTML5
                  </Typography.Title>
                  <ul>
                    <li>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/wyklady-webgl.php"
                        target="blank"
                      >
                        Materiały
                      </a>
                    </li>
                  </ul>
                </div>,
                <div>
                  <Typography.Title level={4}>
                    Przykłady 3D w HTML5/webGL
                  </Typography.Title>
                  <ul>
                    <li>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/przyklady-webgl.php"
                        target="blank"
                      >
                        Materiały
                      </a>
                    </li>
                  </ul>
                </div>,
                <div>
                  <Typography.Title level={4}>
                    Projekty 3D w HTML5/webGL
                  </Typography.Title>
                  <ul>
                    <li>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/rozwiazania.php"
                        target="blank"
                      >
                        Materiały
                      </a>
                    </li>
                  </ul>
                </div>,
                <div>
                  <Typography.Title level={4}>
                    Nie tylko gry w HTML5/webGL
                  </Typography.Title>
                  <ul>
                    <li>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/nie-gry-webgl.pdf"
                        target="blank"
                      >
                        Wykład
                      </a>
                    </li>
                  </ul>
                </div>,
                <div>
                  <Typography.Title level={4}>
                    Literatura zalecana webGL
                  </Typography.Title>
                  <ul>
                    <li>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/literatura-webgl.php"
                        target="blank"
                      >
                        Materiały
                      </a>
                    </li>
                  </ul>
                </div>
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}
