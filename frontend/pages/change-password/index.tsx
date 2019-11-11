import React from "react";
import { Alert, Layout } from "antd";
import Breadcrumb from "../../components/pages/change-password/Breadcrumb";
import ChangePasswordForm from "../../components/pages/change-password/ChangePasswordForm";
import styles from "./index.module.scss";

const PAGE_NAME = "Zmień swoje hasło";

interface ChangePasswordPageProps {}

const ChangePasswordPage: React.FC<ChangePasswordPageProps> = () => {
  return (
    <Layout className={styles.root}>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb />
        <Layout.Content
          style={{
            background: "#fff",
            padding: 24,
            margin: "0 auto",
            minHeight: 280,
            width: "100%",
            maxWidth: 1150,
            textAlign: "center"
          }}
        >
          <h1>{PAGE_NAME}</h1>
          <ChangePasswordForm />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default ChangePasswordPage;
