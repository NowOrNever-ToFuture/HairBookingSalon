// import React, { useState, useEffect, useContext } from "react";
// import { SidebarContext } from "../../../components/header/header";
// import { Form, Input, Popconfirm, Table, Typography, Button, notification } from 'antd';
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

// const initialData = [
//   {
//     key: '0',
//     name: 'Nguyen Van A',
//     phone: '0901234501',
//     email: 'example0@gmail.com',
//     gender: 'Nam',
//     address: 'Hà Nội, số 1',
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

// const manageCustomer = () => {
//   const { collapsed } = useContext(SidebarContext);
//   const [form] = Form.useForm();
//   const [data, setData] = useState(initialData);
//   const [editingKey, setEditingKey] = useState('');
//   const isEditing = (record) => record.key === editingKey;

//   useEffect(() => {
//     const storedData = localStorage.getItem('tableData');
//     if (storedData) {
//       setData(JSON.parse(storedData));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('tableData', JSON.stringify(data));
//   }, [data]);

//   const edit = (record) => {
//     form.setFieldsValue({
//       name: '',
//       phone: '',
//       email: '',
//       gender: '',
//       address: '',
//       ...record,
//     });
//     setEditingKey(record.key);
//   };

//   const cancel = () => {
//     setEditingKey('');
//     notification.info({
//       message: 'Đã hủy',
//       description: 'Bạn đã hủy hành động chỉnh sửa.',
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
//         setEditingKey('');
//         notification.success({
//           message: 'Lưu thành công',
//           description: 'Dữ liệu đã được lưu.',
//         });
//       } else {
//         newData.push(row);
//         setData(newData);
//         setEditingKey('');
//         notification.success({
//           message: 'Lưu thành công',
//           description: 'Dữ liệu đã được thêm mới.',
//         });
//       }
//     } catch (errInfo) {
//       console.log('Validate Failed:', errInfo);
//     }
//   };

//   const handleDelete = (key) => {
//     const newData = data.filter((item) => item.key !== key);
//     setData(newData);
//     notification.success({
//       message: 'Xóa thành công',
//       description: 'Dữ liệu đã được xóa.',
//     });
//   };

//   const handleAdd = () => {
//     const newData = {
//       key: data.length.toString(),
//       name: 'Nguyen Van Moi',
//       phone: '090000000',
//       email: 'example@gmail.com',
//       gender: 'Nam',
//       address: 'Hà Nội',
//     };
//     setData([...data, newData]);
//     notification.success({
//       message: 'Thêm mới thành công',
//       description: 'Dữ liệu đã được thêm mới.',
//     });
//   };

//   const columns = [
//     {
//       title: 'Tên',
//       dataIndex: 'name',
//       editable: true,
//     },
//     {
//       title: 'Số điện thoại',
//       dataIndex: 'phone',
//       editable: true,
//     },
//     {
//       title: 'Email',
//       dataIndex: 'email',
//       editable: true,
//     },
//     {
//       title: 'Giới tính',
//       dataIndex: 'gender',
//       editable: true,
//     },
//     {
//       title: 'Địa chỉ',
//       dataIndex: 'address',
//       editable: true,
//     },
//     {
//       title: 'Sửa',
//       dataIndex: 'edit',
//       render: (_, record) => {
//         const editable = isEditing(record);
//         return editable ? (
//           <span>
//             <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
//               Lưu
//             </Typography.Link>
//             <Popconfirm title="Bạn có muốn hủy?" onConfirm={cancel}>
//               <a>Hủy</a>
//             </Popconfirm>
//           </span>
//         ) : (
//           <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
//             <EditOutlined />
//           </Typography.Link>
//         );
//       },
//     },
//     {
//       title: 'Xóa',
//       dataIndex: 'delete',
//       render: (_, record) => (
//         <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleDelete(record.key)}>
//           <DeleteOutlined style={{ color: 'red' }} />
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
//         inputType: 'text',
//         dataIndex: col.dataIndex,
//         title: col.title,
//         editing: isEditing(record),
//       }),
//     };
//   });

//   return (
//     <div style={{
//       marginTop: "50px",
//       marginLeft: collapsed ? "80px" : "240px",
//       padding: "20px",
//       width: `calc(100% - ${collapsed ? "80px" : "240px"})`,
//     }}>
//       <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
//         <h2 style={{ margin: 0 }}>Danh sách khách hàng</h2>
//         <Button
//           onClick={handleAdd}
//           type="primary"
//           style={{
//             marginLeft: 'auto',
//           }}
//         >
//           Thêm khách hàng
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

// export default manageCustomer;

import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { SidebarContext } from "../../../components/header/header";

function ManageCustomer() {
  const { collapsed } = useContext(SidebarContext);

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // Mặc định là không có load nha

  // GET
  const fetchData = async () => {
    try {
      const response = await api.get("user");
      // setData(response.data);
      const customer = response.data.filter(
        (user) => ["CUSTOMER"].includes(user.role) && user.deleted === false
      ); // Lọc các user có role là "employee"
      setData(customer);
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
        const response = await api.put(`user/${values.id}`, values);
      } else {
        // Nếu không có ID là create
        const response = await api.post("user", values);
      }
      toast.success("Đã thêm khách hàng thành công");
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
      await api.delete(`user/${id}`);
      toast.success("Đã xóa khách hàng thành công");
      // setData((prevData) => {
      //   // Lọc ra nhân viên đã bị xóa
      //   const updatedData = prevData.filter((employee) => employee.id !== id);

      //   // Cập nhật ID cho các nhân viên còn lại
      //   return updatedData.map((employee, index) => ({
      //     ...employee,
      //     id: index + 1 // Đặt lại ID bắt đầu từ 1
      //   }));
      // });
      setData((prevData) => prevData.filter((customer) => customer.id !== id));
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
      title: "Họ và tên",
      dataIndex: "username", // tên biến của Backend response về
      key: "username",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber", // tên biến của Backend response về
      key: "phoneNumber",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth", // tên biến của Backend response về
      key: "dateOfBirth",
    },
    {
      title: "Chức vụ",
      dataIndex: "role", // tên biến của Backend response về
      key: "role",
    },
    {
      title: "Email",
      dataIndex: "email", // tên biến của Backend response về
      key: "email",
    },
    {
      title: "Hành động",
      dataIndex: "id",
      key: "id",
      // Nếu không render ra thì nó sẽ hiển thị ra dạng ID
      render: (id, employee) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setShowModal(true);
              form.setFieldsValue(employee);
            }}
            style={{ marginRight: "10px" }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa khách hàng này?"
            description="Bạn có chắc chắn muốn xóa khách hàng này không?"
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
        <h2 style={{ margin: 0 }}>Danh sách khách hàng</h2>
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
        title="Thêm hoặc sửa khách hàng"
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Họ và tên"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên khách hàng.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại của khách hàng.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dateOfBirth"
            label="Ngày sinh"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập sinh nhật của khách hàng.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Chức vụ"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập chức vụ của khách hàng.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email của khách hàng.",
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

export default ManageCustomer;
