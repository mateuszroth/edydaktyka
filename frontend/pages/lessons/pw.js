import React from "react";
import { Layout } from "antd";
import Sider from "../../components/pages/lessons/Sider";
import Breadcrumb from "../../components/pages/lessons/Breadcrumb";

const PAGE_NAME = "Programowanie Wizualne";

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
            <h1>{PAGE_NAME}</h1>
            <div>
              <ul>
                <li>
                  <a href="">Początki Gospodarki Elektronicznej</a>
                </li>
                <li>
                  <a href="">Bankowość internetowa</a>
                </li>
                <li>
                  <a href="">Sklepy internetowe</a>
                </li>
                <li>
                  <a href="">Aukcje i giełdy internetowe</a>
                </li>
                <li>
                  <a href="">Inne usługi przez internet</a>
                </li>
                <li>
                  <a href="">BitCoin</a>
                </li>
              </ul>
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}
