import React from "react";
import {
  Layout,
  Breadcrumb,
  Divider,
  Typography,
  Row,
  Col,
  Button,
  Modal
} from "antd";
import Link from "next/link";
const { Title } = Typography;
const { Content } = Layout;

const showRoomPath = () => {
  Modal.info({
    title: "Dojście do pokoju 105 w Centrum Wykładowym PP",
    width: 520,
    content: (
      <div>
        <img
          src="http://www.cs.put.poznan.pl/aurbanski/praca.jpg"
          alt="Pokój konsultacji"
          width="250"
        />
        <br />
        <img
          src="http://www.cs.put.poznan.pl/aurbanski/Plan-CW5.png"
          alt="Dojście"
          width="400"
        />
      </div>
    ),
    onOk() {}
  });
};

export default class extends React.Component {
  render() {
    return (
      <Layout>
        <Breadcrumb style={{ margin: "12px 0" }}>
          <Breadcrumb.Item></Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            background: "#fff",
            padding: 24,
            margin: "0 auto",
            minHeight: 280,
            width: "100%",
            maxWidth: 900
          }}
        >
          <Content>
            <div>
              <div>
                <img
                  src="http://www.cs.put.poznan.pl/aurbanski/cw.jpg"
                  alt="Centrum Wykładowe"
                  width="100%"
                />
                <Divider />
                <Row style={{ textAlign: "center" }}>
                  <Col sm={20}>
                    <Title level={2}>dr inż. Andrzej P. Urbański</Title>
                    <Title level={4}>
                      strona internetowa wykładowcy informatyki
                      <br />i system internetowy{" "}
                      <Link href="/login"><a>eDydaktyka</a></Link> dla studentów
                    </Title>
                    <Typography.Paragraph>
                      Zachęcam również do zapoznania się z zakładkami{" "}
                      <Link href="/author"><a>o autorze</a></Link> i z{" "}
                      <Link href="/articles"><a>materiałami</a></Link>
                      <br />
                      <Link href="/articles"><a>popularyzatorskimi</a></Link>{" "}
                      przeznaczonymi nie tylko dla moich studentów.
                    </Typography.Paragraph>
                  </Col>
                  <Col sm={4} style={{ textAlign: "center" }}>
                    <img
                      src="http://www.cs.put.poznan.pl/aurbanski/sam-na_dachu.jpg"
                      alt="Andrzej Urbański"
                      width="130px"
                    />
                  </Col>
                </Row>
                <Divider />
                <Row>
                  <Col>
                    <Title level={4}>Zapraszam na konsultacje</Title>
                  </Col>
                </Row>
                <Row>
                  <Col sm={18}>
                    <Typography.Paragraph>
                      <strong>osobiste</strong> - w środy od 15:00 do 16:40 w
                      pokoju 105 w Centrum Wykładowym PP
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                      <strong>zdalne</strong> - w każdym czasie na adres e-mail:{" "}
                      <a href="mailto:andrzej.urbanski@cs.put.poznan.pl">
                        andrzej.urbanski@cs.put.poznan.pl
                      </a>
                    </Typography.Paragraph>
                  </Col>
                  <Col sm={6} style={{ textAlign: "center" }}>
                    <Button onClick={showRoomPath}>
                      Zobacz dojście do pokoju
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
