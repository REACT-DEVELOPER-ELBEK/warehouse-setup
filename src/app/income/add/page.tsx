"use client";
import React, { useEffect, useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import {
  Layout,
  Button,
  theme,
  Modal,
  Space,
  Flex,
  Divider,
  Form,
  Input,
  Table,
} from "antd";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { fetchStock } from "@/redux/slicers/getStock";
import { FaRegEdit } from "react-icons/fa";
import instance from "@/app/api/api_instance";
import Cookies from "universal-cookie";
import axios from "axios";
const { Header, Sider, Content } = Layout;

const IncomeAdd: React.FC = () => {
  // GET X-CSRFtoken
  const c = new Cookies(null, { path: "/" });
  // console.log(c.get("csrftoken"));

  // // FETCHING API
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchStock());
  }, []);

  // STATES
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // MODAL FUNCTIONS
  const showModal = () => {
    setOpenModal(true);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  // ANTD CONFIG
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // PRODUCT_ADD FORM

  function formChange(event: any) {
    const { name, value } = event.target;
    setForm((prevForm: any) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  function formMaterialsChange(event: any) {
    const { name, value } = event.target;
    setForm((prevForm: any) => ({
      ...prevForm,
      incoming_materials: {
        ...prevForm.incoming_materials,
        [name]: value,
      },
    }));
  }

  // HEADER FORM
  const [form, setForm] = useState<any>({
    warehouse: "",
    invoice: "",
    contactNumber: "",
    comment: "",
    incoming_materials: {
      amount: "",
      material_name: "",
      material_unit: "",
      material_color: "",
      material_comment: "",
    },
  });

  const [materials, setMaterials] = useState<any>([]);

  function postProduct() {
    setMaterials([...materials, { ...form.incoming_materials }]);
  }
  async function postItem() {
    try {
      const response = await axios.post(
        "https://multisystem.pythonanywhere.com/api/depo/incoming/create/",
        {
          data: form,
          headers: {
            'Referer':
              "https://multisystem.pythonanywhere.com/api/depo/incoming/create/",
            "Content-Type": "x-www-form-urlencoded",
          },
        }
      );
      const result = await response.data;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  const headers = [
    { title: "Материал", dataIndex: "material", key: "material" },
    { title: "Количество", dataIndex: "count", key: "count" },
    { title: "Единица измерения", dataIndex: "longType", key: "longType" },
    { title: "Цвет", dataIndex: "color", key: "color" },
    { title: "Комментарий", dataIndex: "comment", key: "comment" },
    {
      title: "Действия",
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <Flex gap={10}>
          <Button type="text" style={{ fontSize: "20px", color: "blue" }}>
            <FaRegEdit />
          </Button>
          <Button type="text" danger style={{ fontSize: "20px" }}>
            <MdOutlineDelete />
          </Button>
        </Flex>
      ),
    },
  ];

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
        </Flex>
        <Modal
          open={openModal}
          title="Добавить продукт"
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Отмена
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={() => postProduct()}
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
            <Form layout="vertical">
              <Form.Item label="Материал">
                <Input
                  placeholder="Материал"
                  name="material_name"
                  onChange={formMaterialsChange}
                />
              </Form.Item>
              <Form.Item label="Количество">
                <Input
                  placeholder="Количество"
                  name="amount"
                  onChange={formMaterialsChange}
                />
              </Form.Item>
              <Form.Item label="Единица измерения	">
                <Input
                  placeholder="Единица измерения	"
                  name="material_unit"
                  onChange={formMaterialsChange}
                />
              </Form.Item>
              <Form.Item label="Цвет">
                <Input
                  placeholder="Цвет"
                  name="material_color"
                  onChange={formMaterialsChange}
                />
              </Form.Item>
              <Form.Item label="Комментарий">
                <Input
                  placeholder="Комментарий"
                  name="material_comment"
                  onChange={formMaterialsChange}
                />
              </Form.Item>
            </Form>
          </Space>
        </Modal>
        <Divider />
        <Form
          style={{ display: "flex", justifyContent: "space-between" }}
          layout="vertical"
        >
          <Form.Item label="Склад">
            <Input placeholder="Склад" name="warehouse" onChange={formChange} />
          </Form.Item>
          <Form.Item label="Инвойс">
            <Input placeholder="Инвойс" name="invoice" onChange={formChange} />
          </Form.Item>
          <Form.Item label="Контактный номер">
            <Input
              placeholder="Контактный номер"
              name="contactNumber"
              onChange={formChange}
            />
          </Form.Item>
          <Form.Item label="Комментарии">
            <Input
              placeholder="Комментарии"
              name="comment"
              onChange={formChange}
            />
          </Form.Item>
        </Form>
        <Table
          columns={headers}
          pagination={false}
          dataSource={materials?.map((item: any, index: number) => ({
            key: index,
            material: item.material_name,
            count: item.amount,
            longType: item.material_unit,
            color: item.material_color,
            comment: item.material_comment,
          }))}
        />
        <Flex justify="flex-end">
          <Button type="primary" onClick={postItem}>
            Add
          </Button>
        </Flex>
      </Content>
    </Layout>
  );
};

export default IncomeAdd;
