import { Button, Form, Input, Modal, Popconfirm, Table, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { SidebarContext } from "../../../components/header/header";
const { Option } = Select;
function ManageEmployee() {
  const { collapsed } = useContext(SidebarContext);

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [dataBranch, setDataBranch] = useState([]);
  const [loading, setLoading] = useState(false); // Mặc định là không có load nha

  // GET
  const fetchData = async () => {
    try {
      const response = await api.get("user");
      // setData(response.data);
      const employees = response.data.filter(
        (user) =>
          ["STYLIST", "MANAGER", "CASHIER"].includes(user.role) &&
          user.deleted === false
      ); // Lọc các user có role là "employee"
      setData(employees);
    } catch (error) {
      console.log(error);

      toast.error(error.response.data);
    }
  };

  const fetchDataBranch = async () => {
    try {
      const response = await api.get("branch");
      setDataBranch(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
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
      toast.success("Đã thêm nhân viên thành công");
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
      toast.success("Đã xóa nhân viên thành công");
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
      setData((prevData) => prevData.filter((employee) => employee.id !== id));
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataBranch();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id", // tên biến của Backend response về
      key: "id",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "username", // tên biến của Backend response về
      key: "username",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber", // tên biến của Backend response về
      key: "phoneNumber",
    },
    {
      title: "Chuyên môn",
      dataIndex: "staffSpecialty", // tên biến của Backend response về
      key: "staffSpecialty",
    },
    {
      title: "Email",
      dataIndex: "email", // tên biến của Backend response về
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role", // tên biến của Backend response về
      key: "role",
    },
    {
      title: "Action",
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
            Edit
          </Button>
          <Popconfirm
            title="Delete"
            description="Bạn có chắc chắn muốn xóa nhân viên này không?"
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
        <h2 style={{ margin: 0 }}>Danh sách nhân viên</h2>
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
        title="Thêm hoặc sửa nhân viên"
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form
          form={form}
          labelCol={{ span: 24 }}
          onFinish={handleSubmit}
          initialValues={{ role: "STYLIST" }}
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Tên nhân viên"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên nhân viên.",
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
                message: "Vui lòng nhập số điện thoại của nhân viên",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            name="dateOfBirth"
            label="Date of Birth"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập sinh nhật của nhân viên",
              },
            ]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email của nhân viên",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="branchId"
            label="Chọn chi nhánh"
            rules={[{ required: true, message: "Vui lòng chọn vai trò." }]}
          >
            <Select placeholder="Chọn chi nhánh" defaultValue="Chọn chi nhánh">
              {dataBranch.map((branch) => (
                <Option key={branch.id} value={branch.id}>
                  {branch.branchName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="role"
            label="Chọn vai trò"
            rules={[{ required: true, message: "Vui lòng chọn vai trò." }]}
          >
            <Select placeholder="Chọn vai trò" defaultValue="STYLIST">
              <Option value="STYLIST">STYLIST</Option>
              <Option value="CASHIER">CASHIER</Option>
              <Option value="CASHIER">MANAGER</Option>
            </Select>
          </Form.Item>
          {/* <Form.Item shouldUpdate>
            {({ getFieldValue }) => {
              return getFieldValue("role") === "STYLIST" ? (
                <Form.Item
                  name="staffSpecialty"
                  label="Chuyên môn"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập chuyên môn của stylist",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              ) : null;
            }}
          </Form.Item> */}
          <Form.Item shouldUpdate>
            {({ getFieldValue }) => {
              const role = getFieldValue("role") || "STYLIST"; // Sử dụng giá trị mặc định nếu chưa có giá trị
              return role === "STYLIST" ? (
                <Form.Item
                  name="staffSpecialty"
                  label="Chuyên môn"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập chuyên môn của stylist",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              ) : null;
            }}
          </Form.Item>
          <Form.Item
            name="password"
            label="Nhập mật khẩu"
            rules={[
              {
                required: true,
                message: "Mật khẩu không được để trống",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Xác nhận mật khẩu"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Hãy xác nhận lại mật khẩu",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu mới bạn nhập không khớp")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Xác nhận mật khẩu" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageEmployee;
