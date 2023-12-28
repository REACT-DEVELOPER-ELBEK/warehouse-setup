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
  Input,
  Space,
  Modal,
} from "antd";
const { Content } = Layout;
import instance from "@/app/api/api_instance";

const Material: React.FC = () => {
  const [infoData, setInfoData] = useState<any[]>([]);
  useEffect(() => {
    async function fetchInfoSection() {
      try {
        const response = await instance("info/material");
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
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Автор",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Группа",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Гарантия",
      dataIndex: "warranty",
      key: "warranty",
    },
    {
      title: "Масса",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Единица",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Цвет",
      dataIndex: "color",
      key: "color",
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
          Материал
        </Title>

        <Table
          dataSource={
            infoData &&
            infoData.map((item: any) => ({
              key: item.id,
              id: item.id,
              code: item.code == null ? "Неизвестный" : item.code,
              name: item.name == null ? "Неизвестный" : item.name,
              author: item.created_by == null ? "Неизвестный" : item.created_by,
              group: item.group == null ? "Неизвестный" : item.group,
              warranty: item.warranty == null ? "Неизвестный" : item.warranty,
              weight: item.weight == null ? "Неизвестный" : item.weight,
              unit: item.unit == null ? "Неизвестный" : item.unit,
              color: item.color == null ? "Неизвестный" : item.color,
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
export default Material;
