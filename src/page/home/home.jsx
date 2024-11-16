/* eslint-disable react/no-unknown-property */
import React, { useRef, useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./home.css";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import BackGround1 from "../../assets/carousel/Background 1.webp";
import BackGround2 from "../../assets/carousel/Background 2.webp";
import BackGround3 from "../../assets/carousel/Background 3.webp";
import BackGround4 from "../../assets/carousel/Background 4.webp";
import Background_Booking from "../../assets/image/bogo-background.jpg";
import Background_About from "../../assets/image/barber-pole-bg2.jpg";
import Background_Location from "../../assets/image/barbers-icons-bg2.jpg";
import Background_Feedback from "../../assets/image/wood-panel-4.jpg";
import Mini_Home from "../../assets/image/mini-home-salon.jpg";
import Stack from "@mui/material/Stack";

import scissor from "../../assets/image/barbers-stripes-2.png";
import iconLeft from "../../assets/image/bogo-left-stripes.png";
import iconRight from "../../assets/image/bogo-right-stripes.png";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import iconHairCut from "../../assets/icon/haircut-icon.png";
import iconHairDye from "../../assets/icon/hairdye-icon.png";
import iconHairWash from "../../assets/icon/hairwash-icon.png";
import { useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/features/userSlice";
import api from "../../config/axios";
// import { Star } from "@mui/icons-material";

const Home = () => {
  // const role = localStorage.getItem("role") || sessionStorage.getItem("role");
  // const username =
  //   localStorage.getItem("username") || sessionStorage.getItem("username");
  const [dataService, setDataService] = useState([]);
  const [dataBranch, setDataBranch] = useState([]);
  const userList = useSelector((state) => state.user);
  console.log(userList);
  const user = useSelector(selectUser);

  const fetchDataService = async () => {
    try {
      const response = await api.get("services");
      setDataService(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const fetchDataBranch = async () => {
    try {
      const response = await api.get("branch");
      setDataBranch(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      alert("Failed to fetch data");
    }
  };

  // const serviceDetails = {
  //   1: {
  //     icon: iconHairDye,
  //     description:
  //       "Bạn muốn thay đổi với màu tóc mới? Chúng tôi sử dụng các sản phẩm nhuộm tóc an toàn và chất lượng, giúp bạn có mái tóc ấn tượng, nổi bật.",
  //   },
  //   2: {
  //     icon: iconHairCut,
  //     description: "Mô tả cho dịch vụ 2",
  //   },
  //   3: {
  //     icon: iconHairWash,
  //     description: "Mô tả cho dịch vụ 3",
  //   },
  // };

  const icon = {
    iconHairCut,
    iconHairDye,
    iconHairWash,
  };

  useEffect(() => {
    fetchDataService();
    fetchDataBranch();
  }, []);

  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
      {!["ADMIN", "MANAGER", "STYLIST", "CASHIER"].includes(user?.role) && (
        <div>
          <Carousel className="row">
            <Carousel.Item className="col-lg-12 col-md-12">
              <img src={BackGround1} alt="Background 1" text="First slide" />
              <Carousel.Caption>
                <h3>B Local Salon</h3>
                <div className="info">
                  <div className="branch-info">
                    <h4>CHI NHÁNH</h4>
                    <p style={{ marginBottom: "-5px" }}>
                      {" "}
                      123 Điện Biên Phủ, HCM
                    </p>
                    <p>123 Ung Văn Khiêm, HCM</p>
                  </div>
                  <Link to="/booking">
                    <button
                      className="booking-button"
                      style={{ fontWeight: "bold" }}
                    >
                      ĐẶT LỊCH NGAY
                    </button>
                  </Link>

                  <div className="time-info">
                    <h4>THỜI GIAN</h4>

                    <p style={{ marginBottom: "-5px" }}>
                      Thứ 2 - Chủ nhật: 9AM - 8PM
                    </p>
                    <p>Làm xuyên cả ngày lễ</p>
                  </div>
                </div>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item className="col-lg-12 col-md-12">
              <img src={BackGround2} alt="Background 2" text="Second slide" />
              <Carousel.Caption>
                <h3>B Local Salon</h3>
                <div className="info">
                  <div className="branch-info">
                    <h4>CHI NHÁNH</h4>
                    <p style={{ marginBottom: "-5px" }}>
                      {" "}
                      123 Điện Biên Phủ, HCM
                    </p>
                    <p>123 Ung Văn Khiêm, HCM</p>
                  </div>
                  <Link to="/booking">
                    <button
                      className="booking-button"
                      style={{ fontWeight: "bold" }}
                    >
                      ĐẶT LỊCH NGAY
                    </button>
                  </Link>

                  <div className="time-info">
                    <h4>THỜI GIAN</h4>

                    <p style={{ marginBottom: "-5px" }}>
                      Thứ 2- Chủ nhật: 9AM - 8PM
                    </p>
                    <p>Làm xuyên cả ngày lễ</p>
                  </div>
                </div>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item className="col-lg-12 col-md-12">
              <img src={BackGround3} alt="Background 3" text="Second slide" />
              <Carousel.Caption>
                <h3>B Local Salon</h3>
                <div className="info">
                  <div className="branch-info">
                    <h4>CHI NHÁNH</h4>
                    <p style={{ marginBottom: "-5px" }}>
                      {" "}
                      123 Điện Biên Phủ, HCM
                    </p>
                    <p>123 Ung Văn Khiêm, HCM</p>
                  </div>
                  <Link to="/booking">
                    <button
                      className="booking-button"
                      style={{ fontWeight: "bold" }}
                    >
                      ĐẶT LỊCH NGAY
                    </button>
                  </Link>

                  <div className="time-info">
                    <h4>THỜI GIAN</h4>

                    <p style={{ marginBottom: "-5px" }}>
                      Thứ 2- Chủ nhật: 9AM - 8PM
                    </p>
                    <p>Làm xuyên cả ngày lễ</p>
                  </div>
                </div>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item className="col-lg-12 col-md-12">
              <img src={BackGround4} alt="Background 4" text="Second slide" />
              <Carousel.Caption>
                <h3>B Local Salon</h3>
                <div className="info">
                  <div className="branch-info">
                    <h4>CHI NHÁNH</h4>
                    <p style={{ marginBottom: "-5px" }}>
                      {" "}
                      123 Điện Biên Phủ, HCM
                    </p>
                    <p>123 Ung Văn Khiêm, HCM</p>
                  </div>
                  <Link to="/booking">
                    <button
                      className="booking-button"
                      style={{ fontWeight: "bold" }}
                    >
                      ĐẶT LỊCH NGAY
                    </button>
                  </Link>

                  <div className="time-info">
                    <h4>THỜI GIAN</h4>

                    <p style={{ marginBottom: "-5px" }}>
                      Thứ 2- Chủ nhật: 9AM - 8PM
                    </p>
                    <p>Làm xuyên cả ngày lễ</p>
                  </div>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          {/* Trang About */}

          <Container
            fluid
            style={{
              backgroundImage: `url(${Background_About})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "50px 0",
            }}
          >
            <Row className="justify-content-md-center">
              <Col lg={12} style={{ marginBottom: "1rem" }}>
                {/* Tiêu đề chính */}
                <h2
                  style={{
                    marginLeft: "2rem",
                    color: "#d40000",
                    fontSize: "60px",
                    fontWeight: "bold",
                    textAlign: "left",
                    padding: "10px",
                  }}
                >
                  HIỆN TẠI LÀ TƯƠNG LAI,
                </h2>
                {/* Tiêu đề phụ */}
                <h3
                  style={{
                    marginRight: "2rem",
                    color: "black",
                    fontSize: "40px",
                    fontWeight: "normal",
                    textAlign: "right",
                    padding: "10px",
                    fontFamily: "Roboto",
                  }}
                >
                  KHÔNG SỢ THỜI TRANG LUÂN HỒI & THAY ĐỔI XU HƯỚNG.
                </h3>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col
                xl={6}
                lg={6}
                md={6}
                xs={12}
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={Mini_Home}
                  style={{
                    width: "80%",
                    height: "auto",
                    border: "2px solid black", // Viền màu đen
                    padding: "10px", // Khoảng đệm giữa viền và ảnh
                    boxSizing: "border-box",
                    backgroundColor: "white", // Tạo nền trắng cho viền
                  }}
                  className="responsive-image"
                  alt="Mini Home"
                />
              </Col>
              <Col
                xl={6}
                lg={6}
                md={6}
                xs={12}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  color: "black",
                  alignItems: "center",
                }}
              >
                <h1
                  style={{
                    color: "#212529",
                    borderTop: "3px solid #212529",
                    borderBottom: "3px solid #212529",
                    padding: "10px",
                    width: "70%", // Chiều rộng của tiêu đề
                    margin: "10px 0", // Khoảng cách trên và dưới giảm xuống
                  }}
                >
                  VỀ B-LOCAL SALON
                </h1>
                <div style={{ width: "80%", paddingTop: "10px" }}>
                  {" "}
                  {/* Đặt mô tả trong div để giữ chiều rộng */}
                  <p
                    style={{
                      lineHeight: "2.0",
                      fontSize: "20px",
                      margin: "0 0 10px",
                      fontFamily: "Roboto", // Font chữ
                      fontWeight: "500",
                      color: "#282A36",
                    }}
                  >
                    {" "}
                    {/* Giảm khoảng cách dưới */}
                    Chào mừng đến với B-Local Salon, nơi cung cấp dịch vụ cắt
                    tóc nam, gội đầu và cắt tóc cho trẻ em tại TP.HCM. Chúng tôi
                    cam kết mang đến trải nghiệm làm đẹp tốt nhất với sự chú
                    trọng vào chất lượng và sự hài lòng của khách hàng.
                  </p>
                  <p
                    style={{
                      lineHeight: "2.0",
                      fontSize: "20px",
                      margin: "0 0 10px",
                      fontFamily: "Roboto",
                      fontWeight: "500",
                      color: "#282A36",
                    }}
                  >
                    {" "}
                    {/* Giảm khoảng cách dưới */}
                    Đội ngũ thợ cắt tóc chuyên nghiệp của chúng tôi luôn sẵn
                    sàng tư vấn và đáp ứng nhu cầu của bạn. Hãy đến trải nghiệm
                    dịch vụ cắt tóc nam, gội đầu thư giãn và tạo kiểu tóc theo
                    yêu cầu.
                  </p>
                  <p
                    style={{
                      lineHeight: "2.0",
                      fontSize: "20px",
                      margin: "0 0 10px",
                      fontFamily: "Roboto",
                      fontWeight: "500",
                      color: "#282A36",
                    }}
                  >
                    {" "}
                    {/* Giảm khoảng cách dưới */}
                    Chúng tôi mong được chào đón bạn tại B-Local Salon!
                  </p>
                </div>
                <Link
                  to="/about"
                  style={{
                    fontSize: "16px",
                    textDecoration: "none",
                    backgroundColor: "#d40000",
                    padding: "12px",
                    borderRadius: "4px",
                    color: "white",
                    fontWeight: "bold",
                    marginTop: "5px",
                  }}
                >
                  TÌM HIỂU THÊM
                </Link>
              </Col>
            </Row>
          </Container>

          <Container
            fluid
            style={{
              backgroundImage: `url(${Background_Booking})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "100px 0",
              textAlign: "center",
            }}
          >
            <Row
              className="justify-content-md-center"
              style={{
                display: "flex",
                flexDirection: "row", // Sắp xếp theo chiều dọc
                alignItems: "center", // Căn giữa theo chiều ngang
                justifyContent: "center", // Căn giữa theo chiều dọc
                textAlign: "center",
              }}
            >
              <Col lg={12}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    margin: "0 auto",
                    marginTop: "20px",
                  }}
                >
                  <img
                    src={iconLeft}
                    style={{
                      maxWidth: "80px", // Thay đổi kích thước tối đa của icon
                      height: "auto", // Tự động điều chỉnh chiều cao
                      marginRight: "30px", // Khoảng cách giữa icon và chữ
                      marginTop: "8px",
                    }}
                  />

                  {/* Chữ chính */}
                  <h2
                    style={{
                      color: "white",
                      margin: "0",
                      fontSize: "35px",
                    }}
                  >
                    Sẵn Sàng Đặt Lịch
                  </h2>

                  {/* Icon bên phải */}
                  <img
                    src={iconRight}
                    style={{
                      maxWidth: "80px", // Thay đổi kích thước tối đa của icon
                      height: "auto", // Tự động điều chỉnh chiều cao
                      marginLeft: "30px", // Khoảng cách giữa icon và chữ
                      marginTop: "8px",
                    }}
                  />
                </div>

                <h5
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    fontSize: "50px",
                    lineHeight: "0.7",
                    marginTop: "20px", // Khoảng cách giữa dòng chữ chính và tiêu đề
                  }}
                >
                  Đặt Lịch Cắt Tóc
                </h5>
                <Link
                  to="/booking"
                  style={{
                    fontSize: "30px",
                    textDecoration: "none",
                    fontWeight: "lighter",
                    color: "red",
                    textShadow: "none",
                    marginBottom: "-50px",
                    lineHeight: "4.0",
                  }}
                >
                  Đặt Lịch Ngay
                </Link>
              </Col>
            </Row>
          </Container>

          <Container
            fluid
            style={{
              backgroundImage: `url(${Background_Location})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "50px 0",
            }}
          >
            <Row
              className="align-items-center"
              style={{
                display: "flex",
                flexDirection: "row", // Sắp xếp theo chiều dọc
                alignItems: "center", // Căn giữa theo chiều ngang
                justifyContent: "center", // Căn giữa theo chiều dọc
                textAlign: "center",
              }}
            >
              <Col lg={12}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    margin: "0 auto",
                    marginTop: "20px",
                  }}
                >
                  <img
                    src={scissor}
                    style={{
                      maxWidth: "50%", // Thay đổi kích thước tối đa của icon
                      height: "auto", // Tự động điều chỉnh chiều cao
                      display: "block",
                      margin: "0 auto",
                    }}
                    alt="Scissor"
                  />
                </div>
                <h1
                  className="font-weight-bold"
                  style={{
                    fontWeight: "bold",
                    color: "#282A36",
                    fontSize: "50px",
                    lineHeight: "1.2",
                    marginTop: "20px", // Khoảng cách giữa dòng chữ chính và tiêu đề
                  }}
                >
                  Chi Nhánh B-Local Gần Bạn
                </h1>
                <Link
                  to="/location"
                  style={{
                    fontSize: "30px",
                    textDecoration: "none",
                    fontWeight: "lighter",
                    color: "red",
                    textShadow: "none",
                    marginBottom: "-50px",
                    lineHeight: "4.0",
                  }}
                >
                  Xem Chi Nhánh
                </Link>
              </Col>
            </Row>
          </Container>
          <Container
            fluid
            style={{
              backgroundImage: `url(${Background_About})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "50px 0",
            }}
          >
            <Row
              className="align-items-center"
              style={{
                display: "flex",
                flexDirection: "row", // Sắp xếp theo chiều dọc
                alignItems: "center", // Căn giữa theo chiều ngang
                justifyContent: "center", // Căn giữa theo chiều dọc
                textAlign: "center",
              }}
            >
              <Col lg={12}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    margin: "0 auto",
                    marginTop: "20px",
                  }}
                >
                  <img
                    src={scissor}
                    style={{
                      maxWidth: "50%", // Thay đổi kích thước tối đa của icon
                      height: "auto", // Tự động điều chỉnh chiều cao
                      display: "block",
                      margin: "0 auto",
                    }}
                    alt="Scissor"
                  />
                </div>
                <h1
                  className="font-weight-bold"
                  style={{
                    fontWeight: "bold",
                    color: "#282A36",
                    fontSize: "60px",
                    lineHeight: "2.0",
                    marginTop: "20px", // Khoảng cách giữa dòng chữ chính và tiêu đề
                  }}
                >
                  Dịch Vụ Của Chúng Tôi
                </h1>

                <p
                  style={{
                    textAlign: "center",
                    color: "#42403f",
                    fontStyle: "normal",
                    fontWeight: "400",
                    textTransform: "none",
                    lineHeight: "2.0",
                    fontSize: "30px",
                    margin: "0 0 10px",
                  }}
                >
                  Đảm bảo sự phục vụ tận tâm và cảm giác thoải mái khi trải
                  nghiệm cắt tóc theo phong cách cổ điển.
                </p>
                <Link
                  to="/services"
                  style={{
                    fontSize: "30px",
                    textDecoration: "none",
                    color: "red",
                    textShadow: "none",
                    fontWeight: "bold",
                    padding: "10px",
                  }}
                >
                  Xem Dịch Vụ
                </Link>
              </Col>
            </Row>
            <Row
              className="align-items-center"
              style={{
                display: "flex",
                flexDirection: "row", // Sắp xếp theo chiều dọc
                alignItems: "center", // Căn giữa theo chiều ngang
                justifyContent: "center", // Căn giữa theo chiều dọc
                textAlign: "center",
              }}
            >
              {dataService.map((service) => (
                <Col
                  lg={3}
                  xs={12}
                  style={{ display: "flex", justifyContent: "center" }}
                  className="card-container"
                  key={service.id}
                >
                  <Card className="card" sx={{ maxWidth: 345 }}>
                    <CardContent>
                      <div
                        style={{
                          width: "80px",
                          height: "60px",
                        }}
                      >
                        <img src={icon[service.imgSrc]} alt="" srcset="" />
                      </div>
                    </CardContent>
                    <CardContent class="content">
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          lineHeight: "1.3em",
                          fontWeight: "bold",
                        }}
                      >
                        {service.serviceName}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          lineHeight: "1.3em",
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        {new Intl.NumberFormat("vi-VN").format(
                          service.servicePrice
                        )}{" "}
                        VNĐ
                      </Typography>
                      <Typography
                        variant="p"
                        sx={{
                          color: "text.secondary",
                          fontSize: "1.2rem",
                          lineHeight: "2em",
                        }}
                      >
                        {service.serviceDetail}
                      </Typography>
                    </CardContent>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Home;
