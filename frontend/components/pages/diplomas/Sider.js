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
          <Link href="/diplomas">
            <span>
              <Icon type="snippets" />
              Prace dyplomowe
            </span>
          </Link>
        }
      >
        <Menu.Item key="3-1">
          <Link href="/diplomas/done"><a>Obronione</a></Link>
        </Menu.Item>
        <Menu.Item key="3-2">
          <Link href="/diplomas/inprogress"><a>Realizowane</a></Link>
        </Menu.Item>
        <Menu.Item key="3-3">
          <Link href="/diplomas/proposed"><a>Proponowane</a></Link>
        </Menu.Item>
        <Menu.Item key="3-4">
          <Link href="/diplomas/favourites"><a>Najciekawsze</a></Link>
        </Menu.Item>
        <Menu.Item key="3-5">
          <Link href="/diplomas/about"><a>Promotorstwo</a></Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  </Sider>
);
