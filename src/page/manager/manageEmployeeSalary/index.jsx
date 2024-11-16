import { Button, Form, Input, Modal, Popconfirm, Table, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { SidebarContext } from "../../../components/header/header";
const { Option } = Select;
function ManageEmployee() {
  const { collapsed } = useContext(SidebarContext);

  const [employeeData, setEmployeeData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [staffSalary, setStaffSalary] = useState([]);
  const [baseSalary, setBaseSalary] = useState([]);
  const [loading, setLoading] = useState(false); // Mặc định là không có load nha

  // GET
  const fetchEmployeeData = async () => {
    try {
      const response = await api.get("user");
      // setData(response.data);
      const employees = response.data.filter(
        (user) =>
          ["STYLIST", "CASHIER"].includes(user.role) && user.deleted === false
      ); // Lọc các user có role là "employee"
      setEmployeeData(employees);
    } catch (error) {
      console.log(error);

      toast.error(error.response.data);
    }
  };

  const fetchStaffSalary = async () => {
    try {
      const response = await api.get("staffMonthlySalary");
      setStaffSalary(
        response.data.filter((staffSalary) =>
          ["STYLIST", "CASHIER"].includes(staffSalary?.user.role)
        )
      );
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const fetchBaseSalary = async () => {
    try {
      const response = await api.get("baseSalary");
      setBaseSalary(
        response.data.filter((baseSalary) => baseSalary.deleted === false)
      );
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleEmployeeChange = (employee) => {
    const selectedBaseSalary = baseSalary.find(
      (baseSalary) => baseSalary.role === employee.role
    );
    if (selectedBaseSalary) {
      form.setFieldsValue({
        baseSalaryAmount: selectedBaseSalary.baseSalaryAmount,
      });
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      calculatedDate: new Date().toLocaleString(),
    });
  }, [form]);
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
    fetchEmployeeData();
    fetchStaffSalary();
    fetchBaseSalary();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id", // tên biến của Backend response về
      key: "id",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "user.username", // tên biến của Backend response về
      key: "username",
    },
    {
      title: "Chức vụ",
      dataIndex: "user.role", // tên biến của Backend response về
      key: "role",
    },
    {
      title: "Lương cơ bản",
      dataIndex: "baseSalaryAmount", // tên biến của Backend response về
      key: "baseSalaryAmount",
    },
    {
      title: "Thưởng thêm",
      dataIndex: "bonuses", // tên biến của Backend response về
      key: "bonuses",
    },
    {
      title: "Tổng Lương",
      dataIndex: "totalSalary", // tên biến của Backend response về
      key: "totalSalary",
    },
    {
      title: "Ngày tạo",
      dataIndex: "calculatedDate", // tên biến của Backend response về
      key: "calculatedDate",
    },
    // {
    //   title: "Action",
    //   dataIndex: "id",
    //   key: "id",
    //   render: (id, employee) => (
    //     <>
    //       <Button
    //         type="primary"
    //         onClick={() => {
    //           setShowModal(true);
    //           form.setFieldsValue(employee);
    //         }}
    //         style={{ marginRight: "10px" }}
    //       >
    //         Edit
    //       </Button>
    //       <Popconfirm
    //         title="Delete"
    //         description="Bạn có chắc chắn muốn xóa nhân viên này không?"
    //         onConfirm={() => handleDelete(id)}
    //       >
    //         <Button type="primary" danger>
    //           Delete
    //         </Button>
    //       </Popconfirm>
    //     </>
    //   ),
    // },
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

      <Table dataSource={staffSalary} columns={columns} />
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        title="Employee"
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="user"
            label="Chọn nhân viên"
            rules={[{ required: true, message: "Vui lòng chọn nhân viên." }]}
          >
            <Select
              placeholder="Chọn nhân viên"
              onChange={handleEmployeeChange}
            >
              {employeeData.map((employee) => (
                <Option key={employee.id} value={employee}>
                  {employee.username} - {employee.role}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="baseSalaryAmount" label="Lương cơ bản">
            <Input />
          </Form.Item>

          <Form.Item name="bonuses" label="Thưởng thêm">
            <Input />
          </Form.Item>

          <Form.Item name="totalSalary" label="Tổng lương">
            {({ getFieldValue }) => {
              const baseSalary =
                parseFloat(getFieldValue("baseSalaryAmount")) || 0;
              const bonuses = parseFloat(getFieldValue("bonuses")) || 0;
              const totalSalary = baseSalary + bonuses;
              return <Input value={totalSalary} readOnly />;
            }}
          </Form.Item>

          <Form.Item name="calculatedDate" label="Ngày tạo">
            <Input readOnly />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageEmployee;
