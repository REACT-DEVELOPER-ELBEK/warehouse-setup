"use client";
import Info from "@/app/info/brand/page";
import { getCookie, setCookie } from "@/app/utils/cookies";
import { selectedPageState } from "@/types/selectedPage.type";
import {
  ContactsOutlined,
  HomeFilled,
  InboxOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, MenuProps, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import Link from "next/link";
import { useState } from "react";
import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";

const Navigation: React.FC = () => {
  const token = getCookie('csrftoken')
  const infoItemsArray = [
    { name: "brand", nameRu: "бренды" },
    { name: "currency", nameRu: "валюта" },
    { name: "dealer", nameRu: "дилер" },
    { name: "device", nameRu: "средство" },
    { name: "firm", nameRu: "фирма" },
    { name: "material", nameRu: "материалы" },
    { name: "specification", nameRu: "спецификация" },
    { name: "unit", nameRu: "единица" },
    { name: "warehouse", nameRu: "склад" },
  ];

  const infoSection = getCookie("info_page_name");
  const [selectedPage, setSelectedPage] = useState<selectedPageState | any>(
    infoSection && infoSection
  );
  setCookie("info_page_name", JSON.stringify(selectedPage));

  const items: MenuProps["items"] = infoItemsArray.map(
    ({ name, nameRu }, index: number) => ({
      key: index,
      label: (
        <Link
          href={`/info/${name}`}
          type="text"
          style={{ textTransform: "capitalize", width: "100%" }}
        >
          {nameRu}
        </Link>
      ),
    })
  );

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ flex: "0" }}>
      <Sider
        style={{ height: "100vh" }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        <Menu
      
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "home",
              icon: <HomeFilled />,
              label: <Link href="/">Главная</Link>,
            },
            {
              key: "warehouse",
              icon: <InboxOutlined />,
              label: <Link href="/warehouse">Склад</Link>,
            },
            {
              key: "staff",
              icon: <ContactsOutlined />,
              label: <Link href="/staff">Персонал</Link>,
            },
            {
              key: "income",
              icon: <GiReceiveMoney />,
              label: <Link href="/income">Приход</Link>,
            },
            {
              key: "outcome",
              icon: <GiPayMoney />,
              label: <Link href="/outcome">Расход</Link>,
            },
            {
              key: "info",
              icon: <FaCircleInfo />,
              label: (
                <Dropdown trigger={['click']} menu={{ items }} placement="top">
                  <Link href="#">Информация</Link>
                </Dropdown>
              ),
            },
          ]}
        />
      </Sider>
    </Layout>
  );
};

export default Navigation;
