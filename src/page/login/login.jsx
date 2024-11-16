import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
// import { useAuthorization } from "../../components/authorization/AuthorizationContext";
import { Layout, Row, Col, Button, Form, Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import { toast } from "react-toastify";
import { Checkbox } from "antd";
import { useEffect, useState } from "react";
import background from "../../assets/image/login.jpg";
import api from "../../config/axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
const { Text } = Typography;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    console.log(values);
    try {
      const response = await api.post(`auth/sign-in`, {
        email: email,
        password: password,
      });

      const user = response.data;
      console.log(user);
      if (!user?.deleted) {
        // localStorage.setItem("rememberMe", rememberMe ? "true" : "false");
        dispatch(login(user));
        if (user.role === "ADMIN") {
          navigate("/admin/dashboard/employee");
        } else if (user.role === "MANAGER") {
          navigate("/manager/dashboard/user");
        } else if (user.role === "CASHIER") {
          navigate("/staff/appointment");
        } else if (user.role === "STYLIST") {
          navigate("/stylist/schedule/personal");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Tài khoản đã bị xóa. Vui lòng liên hệ hỗ trợ.");
      }
    } catch (err) {
      console.log(err);
      // toast.error(err.response.data);
      toast.error("Thông tin đăng nhập không chính xác");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log(user.accessToken);
      // Assign role as 'customer'
      const userData = { username: user.email, role: "customer" };
      console.log(userData);
      navigate("/"); // Redirect to booking page
    } catch (error) {
      console.error("Google login failed", error);
      toast.alert("Đăng nhập bằng Google thất bại.");
    }
  };
  useEffect(() => {
    // Tắt cuộn
    document.body.style.overflow = "hidden";

    // Bật lại cuộn khi component bị huỷ
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
            <h2>ĐĂNG NHẬP</h2>
            <Form
              name="login"
              // initialValues={{ rememberMe: false }}
              style={{ width: "100%", maxWidth: "300px", marginTop: "10px" }}
              onFinish={handleLogin}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Tên đăng nhập không được để trống",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Mật khẩu không được để trống" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              {/* <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                

                <Link to="/forgetPassword" style={{ textAlign: "center" }}>
                  Quên mật khẩu
                </Link>
              </Form.Item> */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  ĐĂNG NHẬP
                </Button>
              </Form.Item>
            </Form>
            <div style={{ width: "100%", maxWidth: "300px", margin: "0 auto" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
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
              <Form.Item>
                <Button
                  type="default"
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid lightgray",
                  }}
                  onClick={handleGoogleLogin}
                >
                  <FcGoogle /> Đăng nhập bằng Google
                </Button>
              </Form.Item>
            </div>

            <Text style={{ marginTop: "-20px" }}>
              Bạn chưa có tài khoản? <Link to="/register">Đăng kí ngay</Link>
            </Text>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default Login;
