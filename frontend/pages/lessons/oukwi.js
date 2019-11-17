import React from "react";
import { Layout, PageHeader, List, Row, Typography, Icon } from "antd";
import Sider from "../../components/pages/lessons/Sider";
import Breadcrumb from "../../components/pages/lessons/Breadcrumb";
import Router from "next/router";

const PAGE_NAME = "Organizacja Usług Komercyjnych w Internecie";

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
                    Początki Gospodarki Elektronicznej
                  </Typography.Title>
                  <ul>
                    <li>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/poczatkige.pdf"
                        target="blank"
                      >
                        Początki Gospodarki Elektronicznej
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/techpra.htm"
                        target="blank"
                      >
                        Technologiczne prapoczątki Gospodarki Elektronicznej
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/orgpra.htm"
                        target="blank"
                      >
                        Organizacyjne prapoczątki Gospodarki Elektronicznej
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/warunki.htm"
                        target="blank"
                      >
                        Warunki rozwoju usług w Internecie
                      </a>
                    </li>
                  </ul>
                </div>,
                <div>
                  <Typography.Title level={4}>
                    Bankowość internetowa
                  </Typography.Title>
                  <ul>
                    <li>
                      Część I -{" "}
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/BIGrzechnika1.pdf"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PDF{" "}
                      </a>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/BIGrzechnika1.ppt"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PPT{" "}
                      </a>
                    </li>
                    <li>
                      Część II -{" "}
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/BIGrzechnika2.pdf"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PDF{" "}
                      </a>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/BIGrzechnika2.ppt"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PPT{" "}
                      </a>
                    </li>
                    <li>
                      Część III -{" "}
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/BIGrzechnika3.pdf"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PDF{" "}
                      </a>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/BIGrzechnika3.ppt"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PPT{" "}
                      </a>
                    </li>
                  </ul>
                </div>,
                <div>
                  <Typography.Title level={4}>
                    Sklepy internetowe i sprzedaż towarów przez internet
                  </Typography.Title>
                  <ul>
                    <li>
                      Część I -{" "}
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/si01.pdf"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PDF{" "}
                      </a>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/si01.ppt"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PPT{" "}
                      </a>
                    </li>
                    <li>
                      Część II -{" "}
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/si02.pdf"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PDF{" "}
                      </a>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/si02.ppt"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PPT{" "}
                      </a>
                    </li>
                    <li>
                      Część III -{" "}
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/si03.pdf"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PDF{" "}
                      </a>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/si03.ppt"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PPT{" "}
                      </a>
                    </li>
                    <li>
                      Część IV -{" "}
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/si04.pdf"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PDF{" "}
                      </a>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/si04.ppt"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PPT{" "}
                      </a>
                    </li>
                    <li>
                      Część V -{" "}
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/si05.pdf"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PDF{" "}
                      </a>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/si05.ppt"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PPT{" "}
                      </a>
                    </li>
                    <li>
                      Część VI -{" "}
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/si06.pdf"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PDF{" "}
                      </a>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/si06.ppt"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PPT{" "}
                      </a>
                    </li>
                    <li>
                      Część VII -{" "}
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/si07.pdf"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PDF{" "}
                      </a>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/si07.ppt"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PPT{" "}
                      </a>
                    </li>
                    <li>
                      Część "Dematerialized Pharmaceutical Prescriptions" -{" "}
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/DematerializedPrescription.pdf"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PDF{" "}
                      </a>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/DematerializedPrescription.ppt"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PPT{" "}
                      </a>
                    </li>
                  </ul>
                </div>,
                <div>
                  <Typography.Title level={4}>
                    Inne i sprzedaż usług przez internet
                  </Typography.Title>
                  <ul>
                    <li>
                      E-usługi - jak można inaczej zarabiać w sieci! -{" "}
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/e-uslugi22.pdf"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PDF{" "}
                      </a>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/e-uslugi22.ppt"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PPT{" "}
                      </a>
                    </li>
                    <li>
                      Konstrukcja oprogramowania dla e-usługi -{" "}
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/e-uslugi.pdf"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PDF{" "}
                      </a>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/e-uslugi.pdf"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PPT{" "}
                      </a>
                    </li>
                    <li>
                      Zamawianie przez internet wyrobów cukierniczych -{" "}
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/e-cukiernia.pdf"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PDF{" "}
                      </a>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/e-cukiernia.ppt"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PPT{" "}
                      </a>
                    </li>
                    <li>
                      Wspomaganie tworzenia tekstów piosenek -{" "}
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/e-piosenki.pdf"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PDF{" "}
                      </a>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/e-piosenki.ppt"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PPT{" "}
                      </a>
                    </li>
                    <li>
                      Metody organizacji naboru -{" "}
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/Metody%20organizacji%20naboru%2014.pdf"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PDF{" "}
                      </a>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/Metody%20organizacji%20naboru%2014.ppt"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PPT{" "}
                      </a>
                    </li>
                    <li>
                      Internet dla nastolatków -{" "}
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/Teen_urbanski14.pdf"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PDF{" "}
                      </a>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/Teen_urbanski14.ppt"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PPT{" "}
                      </a>
                    </li>
                    <li>
                      Nabór do szkół -{" "}
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/Urbanski%20presentation%2007%20spr95.pdf"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PDF{" "}
                      </a>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/Urbanski%20presentation%2007%20spr95.ppt"
                        target="blank"
                      >
                        <Icon type="file-pdf" /> PPT{" "}
                      </a>
                    </li>
                  </ul>
                </div>,
                <div>
                  <Typography.Title level={4}>BitCoin</Typography.Title>
                  <ul>
                    <li>
                      <a
                        href="http://www.cs.put.poznan.pl/aurbanski/BitCoin.pdf"
                        target="blank"
                      >
                        Wykład
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
