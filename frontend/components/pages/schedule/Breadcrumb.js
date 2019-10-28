import React from "react";
import Link from "next/link";
import { Breadcrumb } from "antd";

const styles = {
  root: {
    margin: "12px 0"
  }
};

export default () => (
  <Breadcrumb style={styles.root}>
    <Breadcrumb.Item>
      <Link href="/">
        <a>Strona główna</a>
      </Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <Link href="/schedule">
        <a>Plan zajęć</a>
      </Link>
    </Breadcrumb.Item>
  </Breadcrumb>
);
