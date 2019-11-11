import React from "react";
import { Alert, Layout } from "antd";
import Breadcrumb from "../../components/pages/reset-password/Breadcrumb";
import ResetPasswordForm from "../../components/pages/reset-password/ResetPasswordForm";
import useLoggedInRedirection from "../../components/hocs/useLoggedInRedirection";
import styles from "./index.module.scss";

const PAGE_NAME = "Zresetuj hasło";

interface ResetPasswordPageProps {}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = () => {
  useLoggedInRedirection();

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
          <ResetPasswordForm />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default ResetPasswordPage;
