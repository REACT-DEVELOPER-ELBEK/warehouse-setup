"use client";
import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, theme, Dropdown, Typography, Table, Space, Modal, Input } from "antd";
const { Content } = Layout;
import instance from "@/app/api/api_instance";

const Firm: React.FC = () => {
  const [infoData, setInfoData] = useState<any[]>([]);
  useEffect(() => {
    async function fetchInfoSection() {
      try {
        const response = await instance("info/firm");
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
      title: "Действительный адрес",
      dataIndex: "actual_address",
      key: "actual_address",
    },
    {
      title: "Факс",
      dataIndex: "fax_machine",
      key: "fax_machine",
    },
    {
      title: "Юридический адрес",
      dataIndex: "legal_adress",
      key: "legal_adress",
    },
    {
      title: "Номер телефона",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Тип",
      dataIndex: "type",
      key: "type",
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
          Единицы
        </Title>

        <Table
          dataSource={
            infoData &&
            infoData.map((item: any) => ({
              key: item.id,
              id:item.id,
              code: item.code == null ? "Неизвестный" : item.code,
              name: item.name,
              author: item.created_by,
              actual_address: item.actual_address == null ? "Неизвестный" : item.actual_address,
              fax_machine: item.fax_machine == null ? "Неизвестный" : item.fax_machine,
              legal_adress: item.legal_adress == null ? "Неизвестный" : item.legal_adress,
              phone_number: item.phone_number == null ? "Неизвестный" : item.phone_number,
              type: item.type == null ? "Неизвестный" : item.type,
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

export default Firm;
