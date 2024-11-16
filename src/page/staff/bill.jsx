import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Modal, Form, Input, Select, notification } from "antd";
import mockData from "./mockBill"; // Import mock data
import "./bill.css"; // Import CSS để tùy chỉnh giao diện
import { SidebarContext } from "../../components/header/header";
import { toast } from "react-toastify";
import api from "../../config/axios";

const { Option } = Select;

const Bill = () => {
  const { collapsed } = useContext(SidebarContext);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get("payment");
      setData(response.data);
    } catch (error) {
      console.log(error);

      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // const [bills, setBills] = useState(mockData);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [currentBill, setCurrentBill] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [currentDate, setCurrentDate] = useState(new Date());
  // const [searchCriteria, setSearchCriteria] = useState("");
  // const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   setLoading(true);
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentDate(new Date());
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  // const handlePayment = (bill) => {
  //   setCurrentBill(bill);
  //   setIsModalVisible(true);
  // };

  // const handleOk = (values) => {
  //   if (!values.paymentMethod) {
  //     notification.error({
  //       message: "Lỗi",
  //       description: "Vui lòng chọn phương thức thanh toán.",
  //     });
  //     return;
  //   }

  //   const newBill = {
  //     ...currentBill,
  //     paymentMethod: values.paymentMethod,
  //     status: "Đã thanh toán",
  //   };
  //   setBills((prevBills) =>
  //     prevBills.map((b) => (b.id === newBill.id ? newBill : b))
  //   );
  //   setIsModalVisible(false);
  //   notification.success({
  //     message: "Xử lý thanh toán",
  //     description: `Hóa đơn ${newBill.id} đã được thanh toán thành công.`,
  //   });
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  // const filterData = () => {
  //   const today = currentDate.toLocaleDateString("sv-SE");

  //   let filteredBills = bills;

  //   // Lọc theo tiêu chí tìm kiếm
  //   if (searchTerm) {
  //     filteredBills = filteredBills.filter(
  //       (bill) =>
  //         bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         bill.id.toString().includes(searchTerm)
  //     );
  //   }

  //   // Lọc theo tiêu chí ngày
  //   if (searchCriteria === "day") {
  //     return filteredBills.filter((bill) => bill.date === today);
  //   } else if (searchCriteria === "week") {
  //     const dayOfWeek = currentDate.getDay();
  //     const startOfWeek = new Date(currentDate);
  //     startOfWeek.setDate(
  //       currentDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
  //     );
  //     const endOfWeek = new Date(startOfWeek);
  //     endOfWeek.setDate(endOfWeek.getDate() + 6);

  //     return filteredBills.filter((bill) => {
  //       const billDate = new Date(bill.date);
  //       return billDate >= startOfWeek && billDate <= endOfWeek;
  //     });
  //   } else if (searchCriteria === "month") {
  //     return filteredBills.filter((bill) => {
  //       const billDate = new Date(bill.date);
  //       return (
  //         billDate.getMonth() === currentDate.getMonth() &&
  //         billDate.getFullYear() === currentDate.getFullYear()
  //       );
  //     });
  //   } else if (searchCriteria === "year") {
  //     return filteredBills.filter((bill) => {
  //       const billDate = new Date(bill.date);
  //       return billDate.getFullYear() === currentDate.getFullYear();
  //     });
  //   }

  //   return filteredBills; // Trả về toàn bộ dữ liệu nếu không có tiêu chí nào được chọn
  // };

  // const filteredData = filterData();

  const columns = [
    {
      title: "Mã người dùng",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Mã cuộc hẹn",
      dataIndex: "appointmentId",
      key: "appointmentId",
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "paymentDate",
      key: "paymentDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
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
      <div className="bill-container">
        <h2>Quản lý hóa đơn</h2>
        {/* <div className="header-container">
          <div className="current-date">
            {currentDate.toLocaleString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })}
          </div>

          <div className="search-buttons">
            <button
              className={searchCriteria === "day" ? "selected" : ""}
              onClick={() => setSearchCriteria("day")}
            >
              Ngày
            </button>
            <button
              className={searchCriteria === "week" ? "selected" : ""}
              onClick={() => setSearchCriteria("week")}
            >
              Tuần
            </button>
            <button
              className={searchCriteria === "month" ? "selected" : ""}
              onClick={() => setSearchCriteria("month")}
            >
              Tháng
            </button>
            <button
              className={searchCriteria === "year" ? "selected" : ""}
              onClick={() => setSearchCriteria("year")}
            >
              Năm
            </button>
          </div>
          <Input
            placeholder="Tìm kiếm theo tên khách hàng hoặc ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div> */}

        {/* {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : filteredData.length === 0 ? (
          <p>Không có hóa đơn nào cho tiêu chí đã chọn.</p>
        ) : ( */}
        <Table columns={columns} dataSource={data} />
        {/* )} */}

        {/* <Modal
          title={`Xử lý thanh toán cho Hóa đơn ID: ${currentBill?.id}`}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          centered
        >
          <Form onFinish={handleOk}>
            <Form.Item
              label="Phương thức thanh toán"
              name="paymentMethod"
              rules={[{ required: true }]}
            >
              <Select placeholder="Chọn phương thức thanh toán">
                <Option value="cash">Tiền mặt</Option>
                <Option value="card">Thẻ</Option>
                <Option value="bankTransfer">Chuyển khoản</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Xác nhận thanh toán
              </Button>
            </Form.Item>
          </Form>
        </Modal> */}
      </div>
    </div>
  );
};

export default Bill;
