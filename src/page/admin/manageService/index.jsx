// import React, { useState, useEffect, useContext } from "react";
// import { SidebarContext } from "../../../components/header/header";

// const ManageService = () => {
//   const { collapsed } = useContext(SidebarContext);

//   return (
//     <div
//       style={{
//         marginTop: "50px",
//         marginLeft: collapsed ? "80px" : "240px",
//         padding: "20px",
//         width: `calc(100% - ${collapsed ? "80px" : "240px"})`,
//       }}
//     >
//       <h3>Quản lí dịch vụ</h3>
//     </div>
//   );
// };

// export default ManageService;

import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { SidebarContext } from "../../../components/header/header";

function ManageService() {
  const { collapsed } = useContext(SidebarContext);

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // Mặc định là không có load nha

  // GET
  const fetchData = async () => {
    try {
      const response = await api.get("services");
      const service = response.data.filter(
        (service) => service.deleted === false
      );
      setData(service);
      // const services = response.data.filter(user => ["CUSTOMER"].includes(user.role)); // Lọc các user có role là "employee"
      // setData(services);
    } catch (error) {
      console.log(error);

      toast.error(error.response.data);
    }
  };
  // CREATE OR UPDATE
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      setLoading(true); // Khi vừa submit nó sẽ bắt đầu load, trước khi API được gọi

      if (values.id) {
        // Nếu có ID là update
        const response = await api.put(`services/${values.id}`, values);
      } else {
        // Nếu không có ID là create
        const response = await api.post("services", values);
      }
      toast.success("Đã thêm dịch vụ thành công.");
      fetchData(); //Nhờ fetch data lại để cập nhật dữ liệu mới
      form.resetFields(); // reset form sau khi thêm thành công
      setShowModal(false); // ẩn modal sau khi thêm thành công
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false); // Khi đã xong thì tắt load
    }
  };
  // DELETE
  const handleDelete = async (id) => {
    try {
      await api.delete(`services/${id}`);
      toast.success("Đã xóa dịch vụ thành công");
      // setData((prevData) => {
      //   // Lọc ra nhân viên đã bị xóa
      //   const updatedData = prevData.filter((employee) => employee.id !== id);

      //   // Cập nhật ID cho các nhân viên còn lại
      //   return updatedData.map((employee, index) => ({
      //     ...employee,
      //     id: index + 1 // Đặt lại ID bắt đầu từ 1
      //   }));
      // });
      // fetchData();
      setData((prevData) => prevData.filter((service) => service.id !== id));
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchData(); // fetch data lại 1 lần khi load dữ liệu lên
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "id", // tên biến của Backend response về
      key: "id",
    },
    {
      title: "Dịch vụ",
      dataIndex: "serviceName", // tên biến của Backend response về
      key: "serviceName",
    },
    {
      title: "Giá dịch vụ",
      dataIndex: "servicePrice", // tên biến của Backend response về
      key: "servicePrice",
    },
    {
      title: "Hành động",
      dataIndex: "id",
      key: "id",
      // Nếu không render ra thì nó sẽ hiển thị ra dạng ID
      render: (id, service) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setShowModal(true);
              form.setFieldsValue(service);
            }}
            style={{ marginRight: "10px" }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa dịch vụ này?"
            description="Bạn có chắc chắn muốn xóa dịch vụ này không?"
            onConfirm={() => handleDelete(id)}
          >
            <Button type="primary" danger>
              Xóa
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
        <h2 style={{ margin: 0 }}>Danh sách dịch vụ</h2>
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
        title="Chỉnh Sửa Dịch Vụ"
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="serviceName"
            label="Dịch vụ"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên dịch vụ.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="servicePrice"
            label="Giá dịch vụ"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá dịch vụ.",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageService;
