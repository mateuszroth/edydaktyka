import React, { useContext } from "react";
import { Alert, Button, Layout, notification, Spin } from "antd";
import Router from "next/router";
import Breadcrumb from "../../components/pages/account/Breadcrumb";
import { AuthContext } from "../../components/stores/AuthContext";
import { getLongGroupName } from "../../helpers/groups";
import useNotLoggedInRedirection from "../../components/hocs/useNotLoggedInRedirection";
import styles from "./index.module.scss";

const PAGE_NAME = "Twoje konto";

interface AccountPageProps {}

const AccountPage: React.FC<AccountPageProps> = () => {
  useNotLoggedInRedirection();
  const { logOut, state: authState } = useContext(AuthContext);
  const { user } = authState;

  const handleLogOut = () => {
    Router.push("/");
    logOut();
    notification.success({
      message: `Do zobaczenia ${user.firstName ? user.firstName : ''}`,
      description: "Pomyślnie wylogowano"
    });
  };

  return (
    <Layout>
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
          <h1 className={styles.header}>{PAGE_NAME}</h1>
          <Alert
            message="Informacje o koncie"
            description="W tym miejscu możesz podejrzeć informacje na temat swojego konta"
            type="info"
          />
          {!user && <Spin tip="Ładowanie..." />}
          {user && (
            <div className={styles.content}>
              Twoje dane:
              <ul>
                <li>Numer indeksu {user && user.album}</li>
                <li>Imię {user && user.firstName}</li>
                <li>Nazwisko {user && user.lastName}</li>
                <li>
                  Grupy
                  <ul>
                    {user &&
                      user.groups &&
                      user.groups.map(group => (
                        <li>{getLongGroupName(group)}</li>
                      ))}
                  </ul>
                </li>
              </ul>
              <Button
                type="primary"
                onClick={() => Router.push("/group-register")}
              >
                Dopisz się do grupy
              </Button>
              <Button
                type="primary"
                onClick={() => Router.push("/change-password")}
              >
                Zmień hasło
              </Button>
              <Button
                type="primary"
                onClick={handleLogOut}
              >
                Wyloguj się
              </Button>
            </div>
          )}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AccountPage;
