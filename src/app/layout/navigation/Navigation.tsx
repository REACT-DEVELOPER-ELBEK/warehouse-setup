"use client";
import { getCookie, setCookie } from "@/app/utils/cookies";
import { selectedPageState } from "@/types/selectedPage.type";
import { ContactsOutlined, HomeFilled, InboxOutlined } from "@ant-design/icons";
import { Dropdown, Layout, Menu, MenuProps, Select, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import Link from "next/link";
import { useState } from "react";
import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import i18n from "@/app/language/i18next";
import { useTranslation } from "react-i18next";

const Navigation: React.FC = () => {
  const { t } = useTranslation();
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
    ({ name }, index: number) => ({
      key: index,
      label: (
        <Link
          href={`/info/${name}`}
          type="text"
          style={{ textTransform: "capitalize", width: "100%" }}
        >
          {t(`sidebar_info_components.${name}`)}
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
              label: <Link href="/">{t("sidebar.home")}</Link>,
            },
            {
              key: "warehouse",
              icon: <InboxOutlined />,
              label: <Link href="/warehouse">{t("sidebar.warehouse")}</Link>,
            },
            {
              key: "staff",
              icon: <ContactsOutlined />,
              label: <Link href="/staff">{t("sidebar.staff")}</Link>,
            },
            {
              key: "income",
              icon: <GiReceiveMoney />,
              label: <Link href="/income">{t("sidebar.income")}</Link>,
            },
            {
              key: "outcome",
              icon: <GiPayMoney />,
              label: <Link href="/outcome">{t("sidebar.outcome")}</Link>,
            },
            {
              key: "info",
              icon: <FaCircleInfo />,
              label: (
                <Dropdown trigger={["click"]} menu={{ items }} placement="top">
                  <Link href="#">{t("sidebar.info")}</Link>
                </Dropdown>
              ),
            },
            {
              key: "language",
              label: (
                <select
                  onChange={(e:any) => i18n.changeLanguage(e.target.value)}
                  defaultValue={localStorage.getItem("lang")!}
                >
                  <option value="uz">UZ</option>
                  <option value="ru">RU</option>
                  <option value="en">EN</option>
                </select>
              ),
            },
          ]}
        />
      </Sider>
    </Layout>
  );
};

export default Navigation;
