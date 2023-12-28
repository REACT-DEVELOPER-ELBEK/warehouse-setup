"use client";
import React, { useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import { Layout, Button, theme, Table, Modal, Input, Space } from "antd";
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlineLocalPhone } from "react-icons/md";
import { FaRegMoneyBill1 } from "react-icons/fa6";

const { Header, Sider, Content } = Layout;
const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const Home: React.FC = () => {
  // STATES
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // MODAL FUNCTIONS
  const showModal = () => {
    setOpenModal(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenModal(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  // ANTD CONFIG
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
      <Content
        style={{
          padding: 24,
          background: colorBgContainer,
          height: "100vh",
        }}
      >
        <Button
          type="primary"
          style={{
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
          onClick={showModal}
        >
          <UserAddOutlined />
          Добавить
        </Button>
        <Modal
          open={openModal}
          title="Добавить персонал"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Отмена
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleOk}
            >
              Добавить
            </Button>,
          ]}
        >
          <Space
            direction="vertical"
            size="middle"
            style={{ fontSize: "15px" }}
          >
            <Input
              required
              placeholder="Имя, Фамилия"
              prefix={<IoPersonOutline />}
              name="fullName"
            />
            <Input
              required
              placeholder="Зарплата"
              prefix={<FaRegMoneyBill1 />}
              name="salary"
            />
            <Input
              required
              placeholder="Почта"
              prefix={<AiOutlineMail />}
              name="mail"
            />
            <Input
              required
              placeholder="Номер телефона"
              prefix={<MdOutlineLocalPhone />}
              name="phoneNumber"
            />
          </Space>
        </Modal>
        <Table dataSource={dataSource} columns={columns} />
      </Content>
  );
};

export default Home;
