import React from "react";
import { Layout, PageHeader } from "antd";
import Link from "next/link";
import Sider from "../../components/pages/help/Sider";
import Breadcrumb from "../../components/pages/help/Breadcrumb";

const PAGE_NAME = "FAQ - Najczęściej zadawane pytania";

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
              <PageHeader ghost={false} title={PAGE_NAME} />
              <ol style={{ maxWidth: 900 }}>
                <li>
                  <b>
                    Od czego zacząć pracę z serwisem jako student lub dyplomant?
                  </b>
                  <br />W wielu przypadkach wystarczy przeglądanie informacyjnej
                  części serwisu (górne menu). Dla podjęcia ściślejszej wspópracy
                  trzeba jednak{" "}
                  <Link href="/group-register">
                    <a>zarejestrować się w odpowiednich grupach</a>
                  </Link>{" "}
                  (niekiedy jest ich wiecej nawet jeśli nie wiąże się to z
                  dodatkowymi ocenami końcowymi).
                </li>
                <li>
                  <b id="sprawozdania">Jak przesłać sprawozdanie?</b>
                  <br />
                  Aby to zrobić należy być zalogowanym i skorzystać z pozycji{" "}
                  <Link href="/reports">
                    <a>Sprawozdania</a>
                  </Link>{" "}
                  w głównym menu. Aby móc się logować należy się wcześniej
                  zarejestrować.
                </li>
              </ol>
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}
