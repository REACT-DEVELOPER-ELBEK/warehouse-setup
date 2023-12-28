"use client";
import React, { useEffect, useState } from "react";
import {
  ContactsOutlined,
  HomeFilled,
  InboxOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Table, Flex } from "antd";
import Link from "next/link";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { fetchIncoming } from "@/redux/slicers/getIncoming";
import { AppDispatch } from "@/redux/store/store";
import { RootState } from "@/redux/store/store";
import { FaRegEye } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";
const { Header, Sider, Content } = Layout;

const Income: React.FC = () => {
  // API MAPPING
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchIncoming());
  }, []);
  const incomingData = useSelector(
    (state: RootState) => state.getIncoming?.data.results
  );

  function getId(id: string | number) {
    console.log(id);
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Отправитель",
      dataIndex: "sender",
      key: "sender",
    },
    {
      title: "Приниматель",
      dataIndex: "accepter",
      key: "accepter",
    },
    {
      title: "Контактный номер",
      dataIndex: "contact-number",
      key: "contact-number",
    },
    {
      title: "Инвойс",
      dataIndex: "invoice",
      key: "adress",
    },
    {
      title: "Время принятия",
      dataIndex: "accept-time",
      key: "accept-time",
    },
    {
      title: "Действия",
      key: "actions",
      render: () => (
        <Button style={{ color: "#000", fontSize: "16px" }}>
          <FaRegEye />
        </Button>
      ),
    },
  ];
  // ANTD CONFIG
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Content
        style={{
          padding: 24,
          background: colorBgContainer,
          width: "100%",
          height: "100vh",
        }}
      >
        <Flex justify="space-between" style={{ width: "100%" }}>
          <h2>Приход</h2>
          <Button
            href="/income/add"
            type="primary"
            style={{
              marginBottom: "10px",
            }}
          >
            <UserAddOutlined />
            Добавить
          </Button>
        </Flex>
        <Table
          dataSource={incomingData?.map((item: any) => ({
            key: item.id,
            id: item.id,
            sender:
              item.from_warehouse == null ? "Неизвестный" : item.from_warehouse,
            accepter: item.warehouse == null ? "Неизвестный" : item.warehouse,
            contactNumber:
              item.contract_number == null
                ? "Неизвестный"
                : item.contract_number,
            invoice: item.invoice == null ? "Неизвестный" : item.invoice,
            acceptTime:
              item.created_time == null ? "Неизвестный" : item.created_time,
            onclick: getId(item.id),
          }))}
          columns={columns}
        />
      </Content>
    </Layout>
  );
};

export default Income;
