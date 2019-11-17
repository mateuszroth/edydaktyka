import React from "react";
import { Layout, Menu, Icon } from "antd";
import Link from "next/link";

const { Sider } = Layout;

export default () => (
  <Sider width={300} collapsedWidth="0" breakpoint="lg" style={{ background: "#fff" }}>
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{ height: "100%" }}
    >
      <Menu.SubMenu
        key="sub1"
        title={
          <Link href="/help">
            <span>
              <Icon type="question-circle" />
              Pomoc
            </span>
          </Link>
        }
      >
        <Menu.Item key="1-1">
          <Link href="/help"><a>Funkcjonalność serwisu</a></Link>
        </Menu.Item>
        <Menu.Item key="1-2">
          <Link href="/help/faq">
            <a>FAQ - Najczęściej zadawane pytania</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="1-3"><Link href="/consultations"><a>Rezerwacja konsultacji</a></Link></Menu.Item>
        <Menu.Item key="1-4"><Link href="/help/faq#sprawozdania"><a>Przesłania sprawozdania</a></Link></Menu.Item>
      </Menu.SubMenu>
    </Menu>
  </Sider>
);
