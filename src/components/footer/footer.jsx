import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Place as PlaceIcon,
  LocalPhone as LocalPhoneIcon,
  Email as EmailIcon,
  YouTube as YouTubeIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
} from "@mui/icons-material";
import logo2 from "../../assets/image/logo2.png";
import "./footer.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/features/userSlice";

const Footer = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const [isQuickLinksCollapsed, setQuickLinksCollapsed] = useState(true);
  const [isContactInfoCollapsed, setContactInfoCollapsed] = useState(true);
  const user = useSelector(selectUser);

  const toggleQuickLinksCollapse = () =>
    setQuickLinksCollapsed(!isQuickLinksCollapsed);
  const toggleContactInfoCollapse = () =>
    setContactInfoCollapsed(!isContactInfoCollapsed);

  if (
    isLoginPage ||
    isRegisterPage ||
    ["ADMIN", "MANAGER", "STYLIST", "CASHIER"].includes(user?.role)
  ) {
    return null;
  }

  return (
    <footer className="Footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-4 col-12 ft-1">
            <img src={logo2} alt="B-Local Logo" className="logo-image-footer" />
            <p>
              B-Local Salon: Nơi tỏa sáng phong cách, chăm sóc tóc chuyên nghiệp
              tại địa phương.
            </p>
            <div className="footer-icons">
              <Link to="#">
                <FacebookIcon sx={{ fontSize: 30, color: "black" }} />
              </Link>
              <Link to="#">
                <InstagramIcon sx={{ fontSize: 30, color: "black" }} />
              </Link>
              <Link to="#">
                <YouTubeIcon sx={{ fontSize: 30, color: "black" }} />
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 col-12 ft-2">
            <h5>
              Liên Kết Nhanh
              <button
                className="btn btn-link d-md-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#quickLinks"
                aria-expanded={!isQuickLinksCollapsed}
                aria-controls="quickLinks"
                onClick={toggleQuickLinksCollapse}
                style={{ padding: 0 }}
              >
                {isQuickLinksCollapsed ? (
                  <ArrowDropDownIcon sx={{ fontSize: 30, color: "#EB5566" }} />
                ) : (
                  <ArrowDropUpIcon sx={{ fontSize: 30, color: "#EB5566" }} />
                )}
              </button>
            </h5>
            <div
              className={`collapse d-md-block ${
                isQuickLinksCollapsed ? "collapse" : "show"
              }`}
              id="quickLinks"
            >
              <ul>
                <li className="nav-item">
                  <Link className="nav-link footer-nav-link mx-lg-2" to="/">
                    Trang chủ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link footer-nav-link mx-lg-2"
                    to="/about"
                  >
                    Về B-Local
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link footer-nav-link mx-lg-2"
                    to="/services"
                  >
                    Dịch vụ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link footer-nav-link mx-lg-2"
                    to="/location"
                  >
                    Vị trí
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 col-12 ft-3">
            <h5>
              Thông Tin Liên Hệ
              <button
                className="btn btn-link d-md-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#contactInfo"
                aria-expanded={!isContactInfoCollapsed}
                aria-controls="contactInfo"
                onClick={toggleContactInfoCollapse}
                style={{ padding: 0 }}
              >
                {isContactInfoCollapsed ? (
                  <ArrowDropDownIcon sx={{ fontSize: 30, color: "red" }} />
                ) : (
                  <ArrowDropUpIcon sx={{ fontSize: 30, color: "red" }} />
                )}
              </button>
            </h5>
            <div
              className={`collapse d-md-block ${
                isContactInfoCollapsed ? "collapse" : "show"
              }`}
              id="contactInfo"
            >
              <h6>
                <PlaceIcon fontSize="small" sx={{ color: "red" }} /> B Local
                Salon
              </h6>
              <p style={{ marginTop: -10 }}>123 Điện Biên Phủ, HCM</p>
              <h6>
                <PlaceIcon fontSize="small" sx={{ color: "red" }} /> B Local
                Salon
              </h6>
              <p style={{ marginTop: -10 }}>123 Ung Văn Khiêm, HCM</p>
              <p style={{ fontWeight: "bold" }}>
                <LocalPhoneIcon fontSize="small" sx={{ color: "red" }} /> (090)
                123 1234
              </p>
              <p
                style={{
                  fontWeight: "bold",
                  textDecoration: "none",
                  color: "#647089",
                }}
              >
                <EmailIcon fontSize="small" sx={{ color: "red" }} />{" "}
                b_localsalon@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
