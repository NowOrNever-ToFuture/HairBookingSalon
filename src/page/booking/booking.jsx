import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Row,
  Col,
  message,
} from "antd";
import { FaCalendarAlt } from "react-icons/fa";
import img1 from "../../assets/image/salon1.jpg";
import img2 from "../../assets/image/salon2.jpg";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { toast } from "react-toastify";

const { Option } = Select;

const BookingForm = () => {
  const imageMap = {
    img1,
    img2,
  };
  const user = useSelector(selectUser);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [dataBranch, setDataBranch] = useState([]);
  const [dataTime, setDataTime] = useState([]);
  const [dataService, setDataService] = useState([]);
  const [dataStylist, setDataStylist] = useState([]);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [price, setPrice] = useState(0.0);

  const handleServiceChange = (value) => {
    const selectedService = dataService.find((service) => service.id === value);
    console.log(selectedService);
    if (selectedService) {
      form.setFieldsValue({ total: selectedService.servicePrice.toFixed(2) });
      console.log(selectedService.servicePrice);
    }
  };

  const fetchDataStylist = async () => {
    try {
      const response = await api.get("user");
      const stylist = response.data.filter((user) =>
        ["STYLIST"].includes(user.role)
      );
      setDataStylist(stylist);
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

  const fetchDataTime = async () => {
    try {
      const response = await api.get("slot");
      setDataTime(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const fetchDataService = async () => {
    try {
      const response = await api.get("services");
      setDataService(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchDataBranch();
    fetchDataTime();
    fetchDataService();
    fetchDataStylist();
  }, []);

  useEffect(() => {
    if (!user) {
      console.log("User is not logged in");
      navigate("/login");
      toast.error("Vui lòng đăng nhập để đặt lịch.");
    }
  }, [user, navigate]);

  const handleBooking = async (values) => {
    try {
      const response = await api.post("appointment", {
        fullname: values.name,
        phoneNumber: values.phone,
        serviceId: values.service,
        branchName:
          dataBranch.find((branch) => branch.id === selectedBranch)
            ?.branchName || "",
        userId: selectedStylist || 0, // Use the selected stylist's ID
        total: values.total,
        slotId:
          dataTime.find((time) => time.slotTime === selectedTime)?.id || 0,
        status: "PENDING",
        appointmentDate: values.date.format("DD/MM/YYYY"),
      });

      if (response.status === 200) {
        console.log(response.data);
        toast.success("Đặt lịch thành công!");

        const paymentResponse = await api.post("payment", {
          userId: user?.id,
          paymentMethod: "VNPAY",
          appointmentId: new URLSearchParams(new URL(response.data).search).get(
            "vnp_TxnRef"
          ),
          paymentDate: new Date().toISOString().split("T")[0],
          status: "SUCCESS",
        });

        if (paymentResponse.status === 200) {
          console.log(paymentResponse.data);
          toast.success("Thanh toán thành công!");
        } else {
          message.error("Thanh toán không thành công. Vui lòng thử lại.");
        }
        form.resetFields();
        setSelectedTime(null);
        window.location.href = response.data;
      } else {
        message.error("Đặt lịch không thành công. Vui lòng thử lại.");
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("Đặt lịch không thành công. Vui lòng thử lại sau.");
    }
  };

  const onFinish = (values) => {
    if (!selectedTime) {
      message.error("Vui lòng chọn khung giờ!");
    } else {
      handleBooking({ ...values, selectedTime });
    }
  };

  const handleBranchChange = (branch) => {
    setSelectedBranch(branch);
  };

  const handleTimeSelect = (time) => {
    if (selectedTime === time) {
      setSelectedTime(null);
      message.info("Đã bỏ chọn khung giờ: " + time);
    } else {
      setSelectedTime(time);
      message.success(`Bạn đã chọn khung giờ: ${time}`);
    }
  };

  return (
    <>
      {["CUSTOMER"].includes(user?.role) && (
        <div
          style={{
            background: "#EEEEEE",
            marginBottom: "3rem",
            paddingTop: "1rem",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "black",
              fontWeight: "bold",
              fontSize: "30px",
              margin: "20px",
            }}
          >
            Đặt Lịch Giữ Chỗ
          </h1>
          <div
            style={{
              maxWidth: "60%",
              margin: "auto",
              padding: "20px",
              backgroundColor: "#f0f2f5",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập họ và tên." },
                ]}
              >
                <Input
                  placeholder="Họ và tên"
                  style={{
                    borderRadius: "4px",
                    fontWeight: "bold",
                    fontSize: "17px",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại." },
                ]}
                initialValue={user?.phoneNumber}
              >
                <Input
                  placeholder="Số điện thoại"
                  style={{
                    borderRadius: "4px",
                    fontWeight: "bold",
                    fontSize: "17px",
                  }}
                  readOnly
                />
              </Form.Item>

              <Form.Item label="Chọn chi nhánh">
                <Row gutter={[16, 16]}>
                  {dataBranch.map((branch, index) => (
                    <Col xs={24} sm={12} key={index}>
                      <div
                        style={{
                          textAlign: "center",
                          cursor: "pointer",
                          border:
                            selectedBranch === branch.id
                              ? "2px solid black"
                              : "none",
                          borderRadius: "4px",
                          padding: "5px",
                        }}
                        onClick={() => handleBranchChange(branch.id)}
                      >
                        <img
                          src={imageMap[branch.imageSrc.split(" ")[0]]}
                          alt={`Chi nhánh ${branch.branchName}`}
                          style={{ width: "100%", borderRadius: "4px" }}
                        />
                        <p style={{ fontWeight: "bold", margin: "5px 0" }}>
                          {branch.branchName}
                        </p>
                        <p style={{ color: "#888", fontSize: "14px" }}>
                          {branch.branchAddress}
                        </p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Form.Item>
              {/* Chọn thợ cắt tóc */}
              <Form.Item
                name="username"
                label="Chọn thợ cắt tóc"
                rules={[
                  { required: true, message: "Vui lòng chọn thợ cắt tóc." },
                ]}
              >
                <Select
                  placeholder="Chọn thợ cắt tóc"
                  onChange={(value) => setSelectedStylist(value)}
                >
                  {dataStylist.map((stylist) => (
                    <Option key={stylist.id} value={stylist.id}>
                      {stylist.username}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="date"
                label="Chọn ngày đặt lịch"
                rules={[{ required: true, message: "Vui lòng chọn ngày." }]}
              >
                {/* <DatePicker
                  placeholder="Chọn ngày đặt lịch"
                  format="DD-MM-YYYY"
                  style={{ width: "100%" }}
                /> */}
                <DatePicker
                  placeholder="Chọn ngày đặt lịch"
                  format="DD-MM-YYYY"
                  style={{ width: "100%" }}
                  disabledDate={(current) => {
                    const today = new Date();
                    const oneMonthLater = new Date();
                    oneMonthLater.setMonth(today.getMonth() + 1);
                    return (
                      current && (current < today || current > oneMonthLater)
                    );
                  }}
                  // disabledDate={(current) => {
                  //   const today = new Date();
                  //   const oneMonthLater = new Date();
                  //   oneMonthLater.setMonth(today.getMonth() + 1);
                  //   return (
                  //     current &&
                  //     (current < today.setHours(0, 0, 0, 0) ||
                  //       current > oneMonthLater)
                  //   );
                  // }}
                />
              </Form.Item>

              <Form.Item label="Chọn khung giờ dịch vụ">
                <Row gutter={[8, 8]}>
                  {dataTime.map((time) => (
                    <Col xs={8} sm={6} lg={4} key={time.id}>
                      <div
                        onClick={() => handleTimeSelect(time.slotTime)}
                        style={{
                          border: "1px solid lightgrey",
                          borderRadius: "6px",
                          width: "100%",
                          height: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "10px",
                          fontWeight: "bold",
                          cursor: "pointer",
                          backgroundColor:
                            selectedTime === time.slotTime ? "#52C41A" : "#fff",
                        }}
                      >
                        {time.slotTime}
                      </div>
                    </Col>
                  ))}
                </Row>
              </Form.Item>

              <Form.Item
                name="service"
                label="Chọn dịch vụ"
                rules={[{ required: true, message: "Vui lòng chọn dịch vụ." }]}
              >
                <Select
                  placeholder="Chọn dịch vụ"
                  onChange={handleServiceChange}
                >
                  {dataService.map((service) => (
                    <Option key={service.id} value={service.id}>
                      {service.serviceName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Giá tiền" name="total">
                <Input
                  readOnly
                  style={{
                    borderRadius: "4px",
                    fontWeight: "bold",
                    fontSize: "17px",
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<FaCalendarAlt />}
                  style={{
                    width: "100%",
                    height: "40px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    backgroundColor: "#D40000",
                  }}
                >
                  Đặt lịch
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingForm;
