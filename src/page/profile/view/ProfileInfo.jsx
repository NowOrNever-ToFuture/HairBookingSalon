import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Nhập khẩu useNavigate
import "./profile.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Card, Space } from "antd";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { Flex, Radio } from "antd";
import { Link } from "react-router-dom";
import { Modal, Tooltip } from "antd";
import ChangePassword from "../update/ChangePassword";
import EditProfile from "../update/EditProfile";
import { SidebarContext } from "../../../components/header/header";

const ProfileInfo = ({ userData }) => {
  const navigate = useNavigate();
  const [editedUserData, setEditedUserData] = useState(userData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { collapsed } = useContext(SidebarContext);
  const dashboardStyle = {
    marginTop: "20px",
    marginLeft: collapsed ? "80px" : "240px",
    marginRight: "500px",
    padding: "20px",
    width: `calc(100% - ${collapsed ? "80px" : "240px"})`,
  };

  useEffect(() => {
    setEditedUserData(userData);
  }, [userData]);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* <Row>
        <Col md={4} xs={12} className="d-flex flex-column align-items-center">
          <Avatar size={170} icon={<UserOutlined />} />
          <div className="button-container" style={{ marginTop: "10px" }}>
            <Button
              onClick={() => openModal("changePassword")}
              type="primary"
              style={{ padding: "5px", fontSize: "15px" }}
            >
              Thay đổi mật khẩu
            </Button>
          </div>
        </Col>
        <Col md={8} xs={12} className="d-flex flex-column align-items-center">
          <Card
            title={
              <p
                style={{
                  marginBottom: "0",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "30px",
                  padding: "10px",
                  borderBottom: "2px solid black",
                }}
              >
                Thông tin cá nhân
              </p>
            }
            extra={
              <Tooltip title="Chỉnh sửa thông tin cá nhân">
                <Link
                  style={{ padding: "5px" }}
                  href="#"
                  onClick={() => openModal("editProfile")}
                >
                  <EditOutlined style={{ fontSize: "24px" }} />
                </Link>
              </Tooltip>
            }
            style={{ width: "100%", backgroundColor: "#f0f2f5" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <h6 style={{ color: "#909090", paddingLeft: "10px", margin: 0 }}>
                Thông tin liên hệ
              </h6>
              <hr
                style={{
                  flex: 1,
                  border: "none",
                  borderBottom: "2px dashed",
                  marginLeft: "10px",
                }}
              />
            </div>
            <div className="contact-info">
              <p>
                <strong>Họ và tên:</strong> {userData?.username}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {userData?.phoneNumber}
              </p>
              <p>
                <strong>Sinh nhật:</strong> {userData?.dateOfBirth}
              </p>
              <p>
                <strong>Email:</strong> {userData?.email}
              </p>
            </div>
          </Card>
        </Col>
      </Row> */}
      <Row className="profile-page" style={{ marginTop: "-20px" }}>
        {userData?.role !== "CUSTOMER" && (
          <Col
            md={12}
            xs={12}
            className="d-flex flex-column align-items-center"
            style={{ marginRight: "900px", marginTop: "-20px" }}
          >
            <Avatar
              style={{ marginTop: "10px" }}
              size={170}
              icon={<UserOutlined />}
            />
            {/* <div className="button-container" style={{ marginTop: "10px" }}>
              <Button
                onClick={() => openModal("changePassword")}
                type="primary"
                style={{ padding: "5px", fontSize: "15px" }}
              >
                Thay đổi mật khẩu
              </Button>
            </div> */}

            <Card
              title={
                <p
                  style={{
                    marginBottom: "0",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "30px",
                    padding: "10px",
                    borderBottom: "2px solid black",
                  }}
                >
                  Thông tin cá nhân
                </p>
              }
              // extra={
              //   <Tooltip title="Chỉnh sửa thông tin cá nhân">
              //     <Link
              //       style={{ padding: "5px" }}
              //       href="#"
              //       onClick={() => openModal("editProfile")}
              //     >
              //       <EditOutlined style={{ fontSize: "24px" }} />
              //     </Link>
              //   </Tooltip>
              // }
              style={{
                width: "100%",
                backgroundColor: "white",
                marginTop: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <h6
                  style={{ color: "#909090", paddingLeft: "10px", margin: 0 }}
                >
                  Thông tin liên hệ
                </h6>
                <hr
                  style={{
                    flex: 1,
                    border: "none",
                    borderBottom: "2px dashed",
                    marginLeft: "10px",
                  }}
                />
              </div>
              <div className="contact-info">
                <p>
                  <strong>Họ và tên:</strong> {userData?.username}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {userData?.phoneNumber}
                </p>
                <p>
                  <strong>Sinh nhật:</strong> {userData?.dateOfBirth}
                </p>
                <p>
                  <strong>Email:</strong> {userData?.email}
                </p>
                <p style={{ color: "blue" }}>
                  <strong>Vai Trò:</strong> {userData?.role}
                </p>
              </div>
            </Card>
          </Col>
        )}
        {userData?.role === "CUSTOMER" && (
          <>
            <Col
              md={4}
              xs={12}
              className="d-flex flex-column align-items-center"
            >
              <Avatar size={170} icon={<UserOutlined />} />
              {/* <div className="button-container" style={{ marginTop: "10px" }}>
                <Button
                  onClick={() => openModal("changePassword")}
                  type="primary"
                  style={{ padding: "5px", fontSize: "15px" }}
                >
                  Thay đổi mật khẩu
                </Button>
              </div> */}
            </Col>
            <Col
              md={8}
              xs={12}
              className="d-flex flex-column align-items-center"
            >
              <Card
                title={
                  <p
                    style={{
                      marginBottom: "0",
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "30px",
                      padding: "10px",
                      borderBottom: "2px solid black",
                    }}
                  >
                    Thông tin cá nhân
                  </p>
                }
                // extra={
                //   <Tooltip title="Chỉnh sửa thông tin cá nhân">
                //     <Link
                //       style={{ padding: "5px" }}
                //       href="#"
                //       onClick={() => openModal("editProfile")}
                //     >
                //       <EditOutlined style={{ fontSize: "24px" }} />
                //     </Link>
                //   </Tooltip>
                // }
                style={{ width: "100%", backgroundColor: "#ffff" }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h6
                    style={{ color: "#909090", paddingLeft: "10px", margin: 0 }}
                  >
                    Thông tin liên hệ
                  </h6>
                  <hr
                    style={{
                      flex: 1,
                      border: "none",
                      borderBottom: "2px dashed",
                      marginLeft: "10px",
                    }}
                  />
                </div>
                <div className="contact-info">
                  <p>
                    <strong>Họ và tên:</strong> {userData?.username}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong> {userData?.phoneNumber}
                  </p>
                  <p>
                    <strong>Sinh nhật:</strong> {userData?.dateOfBirth}
                  </p>
                  <p>
                    <strong>Email:</strong> {userData?.email}
                  </p>
                </div>
              </Card>
            </Col>
          </>
        )}
      </Row>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        {modalContent === "editProfile" && (
          <EditProfile userData={userData} onClose={handleCancel} />
        )}
        {modalContent === "changePassword" && (
          <ChangePassword onClose={handleCancel} />
        )}
      </Modal>
    </div>
  );
};

export default ProfileInfo;
