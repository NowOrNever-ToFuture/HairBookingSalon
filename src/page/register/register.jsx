import {
  Layout,
  Row,
  Col,
  Button,
  Form,
  Input,
  Typography,
  DatePicker,
} from "antd";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  CalendarOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import background from "../../assets/image/login.jpg";
import { toast } from "react-toastify";
import api from "../../config/axios";
const { Title, Text } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: null,
  });

  const handleRegister = async (values) => {
    const date = values.dateOfBirth.format("DD/MM/YYYY");
    console.log(date);
    values.dateOfBirth = date;
    console.log(values.dateOfBirth);
    try {
      await api.post("auth/sign-up", {
        username: values.username,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
        dateOfBirth: values.dateOfBirth,
        role: "CUSTOMER",
      });
      // setNewUser({
      //   username: "",
      //   password: "",
      //   email: "",
      //   phoneNumber: "",
      //   dateOfBirth: null,
      // });
      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Layout style={{ height: "100vh", backgroundColor: "whitesmoke" }}>
      <Row style={{ height: "100%", margin: 0 }}>
        <Col
          xs={0}
          sm={0}
          md={16}
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
          }}
        />

        <Col xs={24} sm={24} md={8} style={{ padding: "50px", height: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Title level={2}>ĐĂNG KÝ</Title>
            <Form
              name="register"
              initialValues={{ remember: true }}
              style={{ width: "100%", maxWidth: "300px", marginTop: "10px" }}
              onFinish={handleRegister}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Tên đăng nhập không được để trống",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
              </Form.Item>

              {/* Số điện thoại */}
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Số điện thoại không được để trống",
                  },
                  {
                    pattern: /^[0-9]{10,11}$/,
                    message: "Số điện thoại không hợp lệ",
                  },
                ]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
              </Form.Item>

              {/* Ngày sinh */}
              <Form.Item
                name="dateOfBirth"
                rules={[
                  {
                    required: true,
                    message: "Ngày sinh không được để trống",
                  },
                ]}
              >
                <DatePicker
                  prefix={<CalendarOutlined />}
                  format="DD/MM/YYYY"
                  placeholder="Chọn ngày sinh"
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Email không hợp lệ",
                  },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Mật khẩu không được để trống",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Mật khẩu"
                />
              </Form.Item>

              <Form.Item
                name="confirm"
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
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Xác nhận mật khẩu"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  ĐĂNG KÝ
                </Button>
              </Form.Item>
            </Form>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "20rem",
                marginTop: "-15px",
                marginBottom: "5px",
                textAlign: "center",
              }}
            >
              <hr style={{ flex: 1, borderColor: "black" }} />
              <span style={{ padding: "0 10px", fontSize: "12px" }}>
                HOẶC TIẾP TỤC VỚI
              </span>
              <hr style={{ flex: 1, borderColor: "black" }} />
            </div>

            <Form>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    marginRight: "90px",
                    width: "100%",
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid lightgray",
                  }}
                >
                  <FcGoogle /> Đăng nhập bằng Google
                </Button>
              </Form.Item>
            </Form>

            <Text style={{ marginTop: "-20px" }}>
              Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </Text>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default Register;
