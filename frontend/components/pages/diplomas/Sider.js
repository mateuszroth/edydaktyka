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
          <Link href="/diplomas">
            <span>
              <Icon type="snippets" />
              Prace dyplomowe
            </span>
          </Link>
        }
      >
        <Menu.Item key="3-1">
          <Link href="/diplomas/done">Obronione</Link>
        </Menu.Item>
        <Menu.Item key="3-2">
          <Link href="/diplomas/inprogress">Realizowane</Link>
        </Menu.Item>
        <Menu.Item key="3-3">
          <Link href="/diplomas/proposed">Proponowane</Link>
        </Menu.Item>
        <Menu.Item key="3-4">
          <Link href="/diplomas/topresent">Przygotowane</Link>
        </Menu.Item>
        <Menu.Item key="3-5">
          <Link href="/diplomas/favourites">Najciekawsze</Link>
        </Menu.Item>
        <Menu.Item key="3-6">
          <Link href="/diplomas/about">Promotorstwo</Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  </Sider>
);
