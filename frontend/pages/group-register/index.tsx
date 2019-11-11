import React from "react";
import { Alert, Layout } from "antd";
import Breadcrumb from "../../components/pages/group-register/Breadcrumb";
import GroupRegisterForm from "../../components/pages/group-register/GroupRegisterForm";
import styles from "./index.module.scss";

const PAGE_NAME = "Dopisz się do grupy zajęciowej";

interface GroupRegisterPageProps {}

const GroupRegisterPage: React.FC<GroupRegisterPageProps> = () => {
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
          <GroupRegisterForm />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default GroupRegisterPage;
