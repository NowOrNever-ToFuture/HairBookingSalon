// import React, { useState, useEffect, useContext } from "react";
// import { SidebarContext } from "../../../components/header/header";
// import {
//   Form,
//   Input,
//   Popconfirm,
//   Table,
//   Typography,
//   Button,
//   notification,
// } from "antd";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// const initialData = [
//   {
//     key: "0",
//     branchCode: "001",
//     branchName: "B Local Salon 1",
//     address: "123 Điện Biên Phủ, HCM",
//     phone: "(090) 123 1234",
//     branchUrl:
//       "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.292710508143!2d106.6935797749792!3d10.78887865896403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f34d02e2369%3A0x9d872a92cb2ff806!2zMTIzIMSQaeG7h24gQmnDqm4gUGjhu6csIMSQYSBLYW8sIFF14bqtbiAxLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1728571285447!5m2!1svi!2s",
//   },
//   // ... các dữ liệu khác
// ];

// const EditableCell = ({
//   editing,
//   dataIndex,
//   title,
//   inputType,
//   record,
//   index,
//   children,
//   ...restProps
// }) => {
//   const inputNode = <Input />;
//   return (
//     <td {...restProps}>
//       {editing ? (
//         <Form.Item
//           name={dataIndex}
//           style={{
//             margin: 0,
//           }}
//           rules={[
//             {
//               required: true,
//               message: `Vui lòng nhập ${title}!`,
//             },
//           ]}
//         >
//           {inputNode}
//         </Form.Item>
//       ) : (
//         children
//       )}
//     </td>
//   );
// };

// const ManageBranch = () => {
//   const { collapsed } = useContext(SidebarContext);
//   const [form] = Form.useForm();
//   const [data, setData] = useState(initialData);
//   const [editingKey, setEditingKey] = useState("");
//   const isEditing = (record) => record.key === editingKey;

//   useEffect(() => {
//     const storedData = localStorage.getItem("branchTableData");
//     if (storedData) {
//       setData(JSON.parse(storedData));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("branchTableData", JSON.stringify(data));
//   }, [data]);

//   const edit = (record) => {
//     form.setFieldsValue({
//       branchCode: "",
//       branchName: "",
//       address: "",
//       phone: "",
//       branchUrl: "",
//       ...record,
//     });
//     setEditingKey(record.key);
//   };

//   const cancel = () => {
//     setEditingKey("");
//     notification.info({
//       message: "Đã hủy",
//       description: "Bạn đã hủy hành động chỉnh sửa.",
//     });
//   };

//   const save = async (key) => {
//     try {
//       const row = await form.validateFields();
//       const newData = [...data];
//       const index = newData.findIndex((item) => key === item.key);

//       if (index > -1) {
//         const item = newData[index];
//         newData.splice(index, 1, {
//           ...item,
//           ...row,
//         });
//         setData(newData);
//         setEditingKey("");
//         notification.success({
//           message: "Lưu thành công",
//           description: "Dữ liệu đã được lưu.",
//         });
//       } else {
//         newData.push(row);
//         setData(newData);
//         setEditingKey("");
//         notification.success({
//           message: "Lưu thành công",
//           description: "Dữ liệu đã được thêm mới.",
//         });
//       }
//     } catch (errInfo) {
//       console.log("Validate Failed:", errInfo);
//     }
//   };

//   const handleDelete = (key) => {
//     const newData = data.filter((item) => item.key !== key);
//     setData(newData);
//     notification.success({
//       message: "Xóa thành công",
//       description: "Dữ liệu đã được xóa.",
//     });
//   };

//   const handleAdd = () => {
//     const newData = {
//       key: data.length.toString(),
//       branchCode: "00" + (data.length + 1),
//       branchName: "B Local Salon Mới",
//       address: "Địa chỉ mới",
//       phone: "(090) 000 0000",
//       branchUrl: "https://www.google.com/maps",
//     };
//     setData([...data, newData]);
//     notification.success({
//       message: "Thêm mới thành công",
//       description: "Dữ liệu đã được thêm mới.",
//     });
//   };

//   const columns = [
//     {
//       title: "Mã chi nhánh",
//       dataIndex: "branchCode",
//       editable: true,
//     },
//     {
//       title: "Tên chi nhánh",
//       dataIndex: "branchName",
//       editable: true,
//     },
//     {
//       title: "Địa chỉ",
//       dataIndex: "address",
//       editable: true,
//     },
//     {
//       title: "Số điện thoại",
//       dataIndex: "phone",
//       editable: true,
//     },
//     {
//       title: "URL chi nhánh",
//       dataIndex: "branchUrl",
//       editable: true,
//     },
//     {
//       title: "Sửa",
//       dataIndex: "edit",
//       render: (_, record) => {
//         const editable = isEditing(record);
//         return editable ? (
//           <span>
//             <Typography.Link
//               onClick={() => save(record.key)}
//               style={{ marginRight: 8 }}
//             >
//               Lưu
//             </Typography.Link>
//             <Popconfirm title="Bạn có muốn hủy?" onConfirm={cancel}>
//               <a>Hủy</a>
//             </Popconfirm>
//           </span>
//         ) : (
//           <Typography.Link
//             disabled={editingKey !== ""}
//             onClick={() => edit(record)}
//           >
//             <EditOutlined />
//           </Typography.Link>
//         );
//       },
//     },
//     {
//       title: "Xóa",
//       dataIndex: "delete",
//       render: (_, record) => (
//         <Popconfirm
//           title="Bạn có chắc muốn xóa?"
//           onConfirm={() => handleDelete(record.key)}
//         >
//           <DeleteOutlined style={{ color: "red" }} />
//         </Popconfirm>
//       ),
//     },
//   ];

//   const mergedColumns = columns.map((col) => {
//     if (!col.editable) {
//       return col;
//     }
//     return {
//       ...col,
//       onCell: (record) => ({
//         record,
//         inputType: "text",
//         dataIndex: col.dataIndex,
//         title: col.title,
//         editing: isEditing(record),
//       }),
//     };
//   });

//   return (
//     <div
//       style={{
//         marginTop: "50px",
//         marginLeft: collapsed ? "80px" : "240px",
//         padding: "20px",
//         width: `calc(100% - ${collapsed ? "80px" : "240px"})`,
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
//         <h2 style={{ margin: 0 }}>Danh sách chi nhánh</h2>
//         <Button
//           onClick={handleAdd}
//           type="primary"
//           style={{
//             marginLeft: "auto",
//           }}
//         >
//           Thêm chi nhánh
//         </Button>
//       </div>
//       <Form form={form} component={false}>
//         <Table
//           components={{
//             body: {
//               cell: EditableCell,
//             },
//           }}
//           bordered
//           dataSource={data}
//           columns={mergedColumns}
//           rowClassName="editable-row"
//           pagination={{
//             pageSize: 10,
//             showSizeChanger: false,
//             showQuickJumper: false,
//             hideOnSinglePage: true,
//           }}
//         />
//       </Form>
//     </div>
//   );
// };

// export default ManageBranch;

import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { SidebarContext } from "../../../components/header/header";

function ManageBranch() {
  const { collapsed } = useContext(SidebarContext);

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // Mặc định là không có load nha

  // GET
  const fetchData = async () => {
    try {
      const response = await api.get("branch");
      const branch = response.data.filter((branch) => branch.deleted === false);
      setData(branch);
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
        const response = await api.put(`branch/${values.id}`, values);
      } else {
        // Nếu không có ID là create
        const response = await api.post("branch", values);
      }
      toast.success("Đã thêm chi nhánh thành công.");
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
      await api.delete(`branch/${id}`);
      toast.success("Đã xóa chi nhánh thành công");
      // setData((prevData) => {
      //   // Lọc ra nhân viên đã bị xóa
      //   const updatedData = prevData.filter((employee) => employee.id !== id);

      //   // Cập nhật ID cho các nhân viên còn lại
      //   return updatedData.map((employee, index) => ({
      //     ...employee,
      //     id: index + 1 // Đặt lại ID bắt đầu từ 1
      //   }));
      // });
      setData((prevData) => prevData.filter((branch) => branch.id !== id));
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
      title: "Chi nhánh",
      dataIndex: "branchName", // tên biến của Backend response về/-strong/-heart:>:o:-((:-h key: "branchName",
    },
    {
      title: "Địa chỉ",
      dataIndex: "branchAddress", // tên biến của Backend response về
      key: "branchAddress",
    },
    {
      title: "Số điện thoại",
      dataIndex: "branchPhoneNumber", // tên biến của Backend response về
      key: "branchPhoneNumber",
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageSrc", // tên biến của Backend response về
      key: "imageSrc",
    },
    {
      title: "Hành động",
      dataIndex: "id",
      key: "id",
      // Nếu không render ra thì nó sẽ hiển thị ra dạng ID
      render: (id, branch) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setShowModal(true);
              form.setFieldsValue(branch);
            }}
            style={{ marginRight: "10px" }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa chi nhánh này?"
            description="Bạn có chắc chắn muốn xóa chi nhánh này không?"
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
        <h2 style={{ margin: 0 }}>Danh sách chi nhánh</h2>
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
        title="Thêm hoặc sửa chi nhánh"
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="branchName"
            label="Chi nhánh"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên chi nhánh.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="branchAddress"
            label="Địa chỉ"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ dịch vụ.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="branchPhoneNumber"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại chi nhánh.",
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

export default ManageBranch;
