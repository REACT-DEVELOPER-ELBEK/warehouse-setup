"use client";
import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Button,
  theme,
  Dropdown,
  Typography,
  Table,
  Space,
  Input,
  Modal,
} from "antd";
const { Content } = Layout;
import instance from "@/app/api/api_instance";

const Specefication: React.FC = () => {
  const [infoData, setInfoData] = useState<any[]>([]);
  useEffect(() => {
    async function fetchInfoSection() {
      try {
        const response = await instance("info/specification");
        const data = response.data;
        setInfoData(data.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchInfoSection();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Автор",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Год",
      dataIndex: "year",
      key: "year",
    },
  ];

  // ANTD CONFIG
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { Title } = Typography;
  const [formData, setFormData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // MODAL FUNCTIONS
  const showModal = () => {
    setOpenModal(true);
  };

  const handleOk = () => {
    console.log(formData);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  function inputChange(e: any) {
    const { name, value } = e.target;
    setFormData((data: any) => ({
      ...data,
      [name]: value,
    }));
  }

  return (
    <>
      <Content
        style={{
          padding: 24,
          background: colorBgContainer,
          width: "100%",
          height: "100vh",
        }}
      >
        <Title style={{ textTransform: "capitalize" }} level={3}>
          Характеристики
        </Title>

        <Table
          dataSource={
            infoData &&
            infoData.map((item: any) => ({
              key: item.id,
              id: item.id,
              name: item.name,
              author: item.created_by,
              year: item.year,
            }))
          }
          columns={columns}
          pagination={false}
        />
        <Modal
          open={openModal}
          title="Добавить бренд"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Отмена
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
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
              placeholder="Название"
              name="name"
              onChange={inputChange}
            />
            <Input
              required
              placeholder="Автор"
              name="author"
              onChange={inputChange}
            />
          </Space>
        </Modal>
      </Content>
    </>
  );
};

export default Specefication;
