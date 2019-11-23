import React, { useContext } from "react";
import { PageHeader, Layout, Spin } from "antd";
import Breadcrumb from "../../components/pages/schedule/Breadcrumb";
import styles from "./index.module.scss";
import AuthContext from "../../components/stores/AuthContext";
import useNotLoggedInRedirection from "../../components/hocs/useNotLoggedInRedirection";
import { PageContent } from "../../components/layout/content/page-content";

const PAGE_NAME = "Zajęcia i obecności";

interface SchedulePageProps {}

const SchedulePage: React.FC<SchedulePageProps> = () => {
  useNotLoggedInRedirection();
  const { state: authState } = useContext(AuthContext);
  const { user, isInitialized } = authState;

  return (
    <Layout className={styles.root} style={{ padding: "0 24px 24px" }}>
      <Breadcrumb />
      <PageContent>
        <PageHeader
          ghost={false}
          title={PAGE_NAME}
        />
        {!isInitialized && !user && (
          <Spin size="large" />
        )}
        {isInitialized && user && user.isAdmin && (
          <>
            <div>Dodaj zajęcia dla grupy</div>
            <div>Lista zajęć dla grupy</div>
          </>
        )}
        {isInitialized && user && !user.isAdmin && (
          <div>Twoje obecności na zajęciach</div>
        )}
      </PageContent>
    </Layout>
  );
};

export default SchedulePage;
