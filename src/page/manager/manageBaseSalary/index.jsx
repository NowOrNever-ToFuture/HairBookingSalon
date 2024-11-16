import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Input, Modal, Popconfirm, Table, Select } from "antd";
import { SidebarContext } from "../../../components/header/header";
import api from "../../../config/axios";
import { toast } from "react-toastify";

const { Option } = Select;
function ManageSalary() {
  const { collapsed } = useContext(SidebarContext);

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // GET
  const fetchData = async () => {
    try {
      const response = await api.get("baseSalary");
      setData(
        response.data.filter((baseSalary) => baseSalary.deleted === false)
      );
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  // CREATE OR UPDATE
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (values.id) {
        await api.put(`baseSalary/${values.id}`, values);
      } else {
        await api.post("baseSalary", values);
      }
      toast.success("Đã thêm lương thành công");
      fetchData();
      form.resetFields();
      setShowModal(false);
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await api.delete(`baseSalary/${id}`);
      toast.success("Đã xóa lương thành công");
      setData((prevData) =>
        prevData.filter((baseSalary) => baseSalary.id !== id)
      );
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Base Salary Amount",
      dataIndex: "baseSalaryAmount",
      key: "baseSalaryAmount",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id, salary) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setShowModal(true);
              form.setFieldsValue(salary);
            }}
            style={{ marginRight: "10px" }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete"
            description="Bạn có chắc chắn muốn xóa lương này không?"
            onConfirm={() => handleDelete(id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div
      style={{
        marginTop: "50px",
        marginLeft: collapsed ? "80px" : "240px",
        padding: "20px",
        width: `calc(100% - ${collapsed ? "80px" : "240px"})`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Lương Cơ Bản</h2>
        <Button
          style={{ marginLeft: "auto" }}
          onClick={() => setShowModal(true)}
        >
          Thêm mới
        </Button>
      </div>

      <Table dataSource={data} columns={columns} />

      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        title="Salary"
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          {/* <Form.Item name="id" hidden>
            <Input />
          </Form.Item> */}
          <Form.Item
            name="baseSalaryAmount"
            label="Lương cơ bản"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mức lương cơ bản.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            name="role"
            label="Role"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập vai trò.",
              },
            ]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            name="role"
            label="Chọn vai trò"
            rules={[{ required: true, message: "Vui lòng chọn vai trò." }]}
          >
            <Select placeholder="Chọn vai trò" defaultValue="STYLIST">
              <Option value="STYLIST">STYLIST</Option>
              <Option value="CASHIER">CASHIER</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageSalary;
