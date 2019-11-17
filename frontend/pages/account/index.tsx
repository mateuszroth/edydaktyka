import React, { useContext, useState } from "react";
import {
  Avatar,
  Button,
  Layout,
  notification,
  Spin,
  Icon,
  Typography,
  Row,
  Col,
  Upload
} from "antd";
import Router from "next/router";
import Breadcrumb from "../../components/pages/account/Breadcrumb";
import ChangeGroup from "../../components/pages/account/ChangeGroup";
import { AuthContext } from "../../components/stores/AuthContext";
import useNotLoggedInRedirection from "../../components/hocs/useNotLoggedInRedirection";
import styles from "./index.module.scss";
const { Title } = Typography;

const PAGE_NAME = "Twoje konto";

interface AccountPageProps {}

const AccountPage: React.FC<AccountPageProps> = () => {
  useNotLoggedInRedirection();
  const { logOut, state: authState } = useContext(AuthContext);
  const { user } = authState;
  const [avatarUrl, setAvatarUrl] = useState();

  const handleLogOut = () => {
    Router.push("/");
    logOut();
    notification.success({
      message: `Do zobaczenia ${user.firstName ? user.firstName : ""}`,
      description: "Pomyślnie wylogowano"
    });
  };

  const uploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76", // TODO
    multiple: false,
    headers: {
      authorization: "authorization-text" // TODO
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        notification.success({ message: "Pomyślnie wgrano zdjęcie" });
        setAvatarUrl(info.file.response.url);
      } else if (info.file.status === "error") {
        notification.error({ message: "Błąd podczas wgrywania zdjęcia" });
      }
    }
  };

  return (
    <Layout>
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
          <Row>
            <Col md={20}>
              <Title level={1}>
                <Icon type="setting" /> {PAGE_NAME}{" "}
                {user && user.isAdmin && "(administrator)"}
              </Title>
            </Col>
            <Col md={4} style={{ textAlign: "right" }}>
              <Button type="danger" size="large" onClick={handleLogOut}>
                Wyloguj się
              </Button>
            </Col>
          </Row>
          {!user && <Spin tip="Ładowanie..." />}
          {user && (
            <div className={styles.content}>
              <Row justify="start" type="flex" style={{ marginBottom: 30 }}>
                <Col md={4}>
                  <Avatar
                    size={128}
                    icon="user"
                    src={avatarUrl || (user && user.photo)}
                  />
                </Col>
                <Col md={4}>
                  <Upload {...uploadProps}>
                    <Button>
                      <Icon type="upload" /> Wgraj zdjęcie
                    </Button>
                  </Upload>
                </Col>
              </Row>
              <Row style={{ marginBottom: 20 }}>
                <Col sm={24} md={8} lg={8}>
                  <Title level={4}>
                    <>
                      <Icon type="idcard" theme="twoTone" /> Numer indeksu{" "}
                    </>
                  </Title>
                  <Title level={2} style={{ margin: 0 }}>
                    {user && user.album}
                  </Title>
                </Col>
                <Col sm={24} md={8} lg={8}>
                  <Title level={4}>
                    <>Imię</>
                  </Title>
                  <Title level={2} style={{ margin: 0 }}>
                    {user && user.firstName}
                  </Title>
                </Col>
                <Col sm={24} md={8} lg={8}>
                  <Title level={4}>
                    <>Nazwisko</>
                  </Title>
                  <Title level={2} style={{ margin: 0 }}>
                    {user && user.lastName}
                  </Title>
                </Col>
              </Row>
              <Row style={{ marginBottom: 20 }}>
                <Col span={24}>
                  <Title level={4}>
                    <>
                      <Icon type="mail" theme="twoTone" /> Adres e-mail{" "}
                    </>
                  </Title>
                  <Title level={2} style={{ margin: 0 }}>
                    {user && user.email}
                  </Title>
                </Col>
              </Row>
              <Row style={{ marginBottom: 20 }}>
                <Col span={24}>
                  <Title level={4}>
                    <>
                      <Icon type="lock" theme="twoTone" /> Hasło{" "}
                    </>
                  </Title>
                  <Title level={2} style={{ margin: 0 }}>
                    <Button
                      type="primary"
                      size="large"
                      onClick={() => Router.push("/change-password")}
                    >
                      Zmień hasło
                    </Button>
                  </Title>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Title level={4}>
                    <>
                      <Icon type="flag" theme="twoTone" /> Grupy zajęciowe{" "}
                    </>
                  </Title>
                  <ChangeGroup />
                  <Button
                    type="primary"
                    onClick={() => Router.push("/group-register")}
                    size="large"
                  >
                    Dopisz się do grupy
                  </Button>
                </Col>
              </Row>
            </div>
          )}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AccountPage;
