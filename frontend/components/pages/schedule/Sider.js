import React from "react";
import { Layout, Menu, Icon } from "antd";
import Link from "next/link";

const { Sider } = Layout;

export default () => (
  <Sider width={250} style={{ background: "#fff" }}>
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{ height: "100%" }}
    >
      <Menu.SubMenu
        key="sub1"
        title={
          <Link href="/schedule">
            <span>
              <Icon type="schedule" />
              Plan zajęć
            </span>
          </Link>
        }
      >
        <Menu.Item key="5-0">
          <Link href="/schedule">
            <span>Obecności</span>
          </Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  </Sider>
);
