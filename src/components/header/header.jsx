import React, { useState, useEffect, useContext, createContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Select, Space } from "antd";
import { Dropdown, Button } from "antd";

import { motion } from "framer-motion";

import "./header.css";

//Material UI
import { useTheme } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import logo3 from "../../assets/image/logo3.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Layout, Menu, theme } from "antd";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";

//Ant Design
import AppBarStyled from "./AppBarStyled";
import {
  HomeOutlined,
  DashboardOutlined,
  UserOutlined,
  ProductOutlined,
  ProfileOutlined,
  SettingOutlined,
  BarsOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ScheduleOutlined,
  EnvironmentOutlined,
  DollarOutlined,
} from "@ant-design/icons";

import { logout, selectUser } from "../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
const { Header, Sider, Content } = Layout;

// Create a context
export const SidebarContext = createContext();

// Create a provider component
export const SidebarProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};

const HeaderComponent = () => {
  const theme = useTheme();
  const location = useLocation();

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { collapsed, setCollapsed } = useContext(SidebarContext);

  const handleProfileClick = () => {
    const profilePath = `/profile/${user?.role?.toLowerCase()}`;
    navigate(profilePath);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const items = [
    {
      key: "1",
      label: (
        <div onClick={handleProfileClick}>
          <AccountCircleIcon /> Hồ sơ
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={handleLogout}>
          <LogoutIcon /> Đăng xuất
        </div>
      ),
    },
  ];

  const appBarStyle = {
    position: "fixed",
    color: "inherit",
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      width: `calc(100% - ${collapsed ? "80px" : "240px"})`,
      ml: `${collapsed ? "80px" : "240px"}`,
      transition: "all 0.3s ease",
      zIndex: theme.zIndex.drawer + 1,
    },
  };

  const renderUserButtons = () => (
    <div className="d-flex">
      <Dropdown
        menu={{ items }}
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
      >
        <Button className="icon-button">
          <AccountCircleIcon style={{ width: "40px", height: "40px" }} />
        </Button>
      </Dropdown>
    </div>
  );

  return (
    <>
      {!user?.role || ["CUSTOMER"].includes(user?.role) ? (
        <header className="p-4 flex items-center justify-between my-header">
          <nav className="navbar my-navbar navbar-expand-lg navbar-expand-sm fixed-top">
            <div className="container-fluid">
              <Link className="navbar-brand my-navbar-brand me-auto" to="/">
                <img src={logo3} alt="B-Local Logo" className="logo-image" />
              </Link>
              <div
                className="offcanvas my-offcanvas offcanvas-end"
                tabIndex="-1"
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
              >
                <div className="offcanvas-header">
                  <img
                    src={logo3}
                    alt="B-Local Logo"
                    className="logo-image offcanvas-title"
                    id="offcanvasNavbarLabel"
                    style={{ position: "relative", width: "100%" }}
                  />
                  <motion.button
                    type="button"
                    className="btn-close my-btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    style={{ position: "absolute", top: 10, right: 10 }}
                  ></motion.button>
                </div>
                <ul className="navbar-nav my-navbar-nav justify-content-center flex-grow-1 pe-3">
                  <li className="nav-item my-nav-item">
                    <Link
                      className="nav-link my-nav-link mx-lg-2"
                      active
                      aria-current="page"
                      to="/"
                    >
                      Trang chủ
                    </Link>
                  </li>
                  <li className="nav-item my-nav-item">
                    <Link
                      className="nav-link my-nav-link mx-lg-2"
                      active
                      to="/about"
                    >
                      Về B-Local
                    </Link>
                  </li>
                  <li className="nav-item my-nav-item">
                    <Link
                      className="nav-link my-nav-link mx-lg-2"
                      active
                      to="/services"
                    >
                      Dịch vụ
                    </Link>
                  </li>
                  <li className="nav-item my-nav-item">
                    <Link
                      className="nav-link my-nav-link mx-lg-2"
                      active
                      to="/location"
                    >
                      Vị trí
                    </Link>
                  </li>
                </ul>
              </div>

              {!user ? (
                <Link className="login-button" to="/login">
                  Đăng nhập
                </Link>
              ) : (
                renderUserButtons()
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="navbar-toggler my-navbar-toggler pe-0"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </motion.button>
            </div>
          </nav>
        </header>
      ) : (
        <>
          <AppBarStyled open={!collapsed} {...appBarStyle}>
            <Toolbar>
              <IconButton
                type="text"
                disableRipple
                aria-label="open drawer"
                onClick={() => setCollapsed(!collapsed)}
                edge="start"
                color="secondary"
                variant="light"
                sx={{
                  color: "text.primary",
                  bgcolor: collapsed ? "grey.200" : "grey.100",
                  ml: { xs: 0, lg: -2 },
                }}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </IconButton>
            </Toolbar>
          </AppBarStyled>
          {!location.pathname.includes("/login") &&
            !location.pathname.includes("/register") && (
              <Sider
                collapsed={collapsed}
                collapsible
                trigger={null}
                className={`sidebar ${collapsed ? "collapsed" : ""}`}
                width={240}
                collapsedWidth={80}
              >
                <div className="logo">
                  <div className="logo-icon">
                    <img src={logo3} alt="B-Local Logo" />
                  </div>
                </div>
                {user?.role === "MANAGER" && (
                  <Menu
                    theme="light"
                    mode="inline"
                    inlineCollapsed={collapsed}
                    className={`menu-bar ${collapsed ? "collapsed" : ""}`}
                    style={{ lineHeight: "50px" }}
                  >
                    {/* <Menu.Item
                      key="dashboard"
                      icon={<DashboardOutlined />}
                      onClick={() => navigate("/manager/dashboard")}
                    >
                      Dashboard
                    </Menu.Item> */}
                    <Menu.Item
                      key="employee"
                      icon={<UserOutlined />}
                      onClick={() => navigate("/manager/dashboard/employee")}
                    >
                      Quản Lí Nhân Viên
                    </Menu.Item>
                    <Menu.Item
                      key="finance"
                      icon={<AccountBalanceIcon />}
                      onClick={() => navigate("manager/dashboard/finance")}
                    >
                      Báo Cáo Tài Chính
                    </Menu.Item>
                    {/* <Menu.Item
                      key="users"
                      icon={<UserOutlined />}
                      onClick={() => navigate("/manager/dashboard/user")}
                    >
                      Quản Lí Người Dùng
                    </Menu.Item> */}
                    <Menu.Item
                      key="salary"
                      icon={<DollarOutlined />}
                      onClick={() => navigate("/manager/dashboard/salary")}
                    >
                      Quản Lí Lương Cơ Bản
                    </Menu.Item>
                    <Menu.Item
                      key="salaryEmployee"
                      icon={<DollarOutlined />}
                      onClick={() =>
                        navigate("/manager/dashboard/salary/employee")
                      }
                    >
                      Quản Lí Lương Nhân Viên
                    </Menu.Item>
                    {/* <Menu.Item
                      key="services"
                      icon={<ProductOutlined />}
                      onClick={() => navigate("/manager/dashboard/service")}
                    >
                      Quản Lí Dịch Vụ
                    </Menu.Item> */}
                    <Menu.Item
                      key="profile"
                      icon={<ProfileOutlined />}
                      onClick={() => navigate("/profile/manager")}
                    >
                      Thông Tin Cá Nhân
                    </Menu.Item>
                    <Menu.Item
                      key="employee-schedule"
                      icon={<ScheduleOutlined />}
                      onClick={() =>
                        navigate("/manager/dashboard/schedule/employee")
                      }
                    >
                      Lịch Làm Việc Stylist
                    </Menu.Item>
                    {/* <Menu.Item
                      key="personal-schedule"
                      icon={<ScheduleOutlined />}
                      onClick={() =>
                        navigate("/manager/dashboard/schedule/personal")
                      }
                    >
                      Lịch Cá Nhân
                    </Menu.Item> */}
                    <Menu.Item
                      key="logout"
                      onClick={handleLogout}
                      icon={<LogoutOutlined />}
                    >
                      Đăng xuất
                    </Menu.Item>
                  </Menu>
                )}
                {user?.role === "ADMIN" && (
                  <Menu
                    theme="light"
                    mode="inline"
                    inlineCollapsed={collapsed}
                    className={`menu-bar ${collapsed ? "collapsed" : ""}`}
                    style={{ lineHeight: "50px" }}
                  >
                    {/* <Menu.Item
                      key="dashboard"
                      icon={<DashboardOutlined />}
                      onClick={() => navigate("/admin/dashboard")}
                    >
                      Dashboard
                    </Menu.Item> */}
                    <Menu.Item
                      key="employee"
                      icon={<UserOutlined />}
                      onClick={() => navigate("/admin/dashboard/employee")}
                    >
                      Quản Lí Nhân Viên
                    </Menu.Item>
                    <Menu.Item
                      key="customer"
                      icon={<UserOutlined />}
                      onClick={() => navigate("/admin/dashboard/customer")}
                    >
                      Quản Lí Khách Hàng
                    </Menu.Item>
                    <Menu.Item
                      key="services"
                      icon={<ProductOutlined />}
                      onClick={() => navigate("/admin/dashboard/service")}
                    >
                      Quản Lí Dịch Vụ
                    </Menu.Item>
                    <Menu.Item
                      key="branches"
                      icon={<EnvironmentOutlined />}
                      onClick={() => navigate("/admin/dashboard/branch")}
                    >
                      Quản Lí Chi Nhánh
                    </Menu.Item>
                    <Menu.Item
                      key="profile"
                      icon={<ProfileOutlined />}
                      onClick={() => navigate("/profile/admin")}
                    >
                      Thông Tin Cá Nhân
                    </Menu.Item>
                    <Menu.Item
                      key="logout"
                      onClick={handleLogout}
                      icon={<LogoutOutlined />}
                    >
                      Đăng xuất
                    </Menu.Item>
                  </Menu>
                )}
                {user?.role === "CASHIER" && (
                  <Menu
                    theme="light"
                    mode="inline"
                    inlineCollapsed={collapsed}
                    className={`menu-bar ${collapsed ? "collapsed" : ""}`}
                    style={{ lineHeight: "50px" }}
                  >
                    <Menu.Item
                      key="appointment"
                      icon={<ScheduleOutlined />}
                      onClick={() => navigate("/staff/appointment")}
                    >
                      Lịch Hẹn
                    </Menu.Item>
                    <Menu.Item
                      key="profile"
                      icon={<ProfileOutlined />}
                      onClick={() => navigate("/profile/cashier")}
                    >
                      Thông Tin Cá Nhân
                    </Menu.Item>
                    {/* <Menu.Item
                      key="personal-schedule"
                      icon={<ScheduleOutlined />}
                      onClick={() => navigate("/staff/schedule/personal")}
                    >
                      Lịch Cá Nhân
                    </Menu.Item> */}
                    <Menu.Item
                      key="stylist-schedule"
                      icon={<ScheduleOutlined />}
                      onClick={() => navigate("/staff/schedule/stylist")}
                    >
                      Lịch Của Stylist
                    </Menu.Item>
                    <Menu.Item
                      key="bill"
                      icon={<UserOutlined />}
                      onClick={() => navigate("/staff/bill")}
                    >
                      Hóa Đơn
                    </Menu.Item>
                    <Menu.Item
                      key="logout"
                      onClick={handleLogout}
                      icon={<LogoutOutlined />}
                    >
                      Đăng xuất
                    </Menu.Item>
                  </Menu>
                )}
                {user?.role === "STYLIST" && (
                  <Menu>
                    <Menu.Item
                      key="work-schedule"
                      icon={<UserOutlined />}
                      onClick={() => navigate("/stylist/schedule/personal")}
                    >
                      Lịch Làm Việc
                    </Menu.Item>
                    <Menu.Item
                      key="profile"
                      icon={<ProfileOutlined />}
                      onClick={() => navigate("/profile/stylist")}
                    >
                      Thông Tin Cá Nhân
                    </Menu.Item>
                    <Menu.Item
                      key="logout"
                      onClick={handleLogout}
                      icon={<LogoutOutlined />}
                    >
                      Đăng xuất
                    </Menu.Item>
                  </Menu>
                )}
              </Sider>
            )}
        </>
      )}
    </>
  );
};

export default HeaderComponent;
