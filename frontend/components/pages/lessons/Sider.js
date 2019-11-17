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
          <Link href="/help">
            <span>
              <Icon type="highlight" />
              Zajęcia
            </span>
          </Link>
        }
      >
        <Menu.Item key="2-1">
          <Link href="/lessons/oukwi" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
            Organizacja Usług Komercyjnych w Internecie
          </Link>
        </Menu.Item>
        <Menu.Item key="2-2">
          <Link href="/lessons/bai">Bogate Aplikacje Internetowe</Link>
        </Menu.Item>
        <Menu.Item key="2-3">
          <Link href="/lessons/pw">Programowanie wizualne</Link>
        </Menu.Item>
        <Menu.Item key="2-4">
          <Link href="/lessons/aisd">Algorytmy i struktury danych</Link>
        </Menu.Item>
        <Menu.Item key="2-5">
          <Link href="/lessons/pn">Programowanie niskopoziomowe</Link>
        </Menu.Item>
        <Menu.Item key="2-6">
          <Link href="/lessons/pp">Podstawy programowania</Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  </Sider>
);
