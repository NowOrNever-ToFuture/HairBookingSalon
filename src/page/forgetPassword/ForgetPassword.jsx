import { Link } from "react-router-dom";
import { Layout, Row, Col, Button, Form, Input, Typography } from "antd";
import { MailOutlined, LockOutlined, KeyOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import { useState, useEffect } from "react";
import background from "../../assets/image/login.jpg";
import { toast } from "react-toastify";
import api from "../../config/axios";

const { Text } = Typography;

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleForgetPassword = async (values) => {
    try {
      // Gọi API gửi thông tin email và OTP để xác thực và đặt lại mật khẩu
      const response = await api.post("/auth/forget-password", {
        email: email,
        otp: otp,
        newPassword: newPassword,
      });

      console.log(response.data);
      toast.success("Mật khẩu đã được thay đổi thành công");
      // Sau khi thành công, chuyển hướng về trang login
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi đặt lại mật khẩu");
    }
  };

  useEffect(() => {
    // Tắt cuộn khi mở form quên mật khẩu
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
            <h2>QUÊN MẬT KHẨU</h2>
            <Form
              name="forgetPassword"
              style={{ width: "100%", maxWidth: "300px", marginTop: "10px" }}
              onFinish={handleForgetPassword}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email của bạn",
                  },
                  {
                    type: "email",
                    message: "Email không hợp lệ",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="otp"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã OTP",
                  },
                ]}
              >
                <Input
                  prefix={<KeyOutlined />}
                  type="text"
                  placeholder="Mã OTP"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu mới",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Mật khẩu mới"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  ĐẶT LẠI MẬT KHẨU
                </Button>
              </Form.Item>
            </Form>

            <Text style={{ marginTop: "-15px" }}>
              Đã nhớ mật khẩu? <Link to="/login">Đăng nhập</Link>
            </Text>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default ForgetPassword;
