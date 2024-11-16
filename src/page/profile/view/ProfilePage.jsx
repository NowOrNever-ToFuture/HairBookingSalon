import React, { useContext } from "react";
import ProfileInfo from "./ProfileInfo";
import HistoryTable from "./HistoryTable";
import { mockUserData, mockUsers } from "./mockData";
import { SidebarContext } from "../../../components/header/header";
import "./profile.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/userSlice";

const ProfilePage = () => {
  // Lấy dữ liệu người dùng từ mock data
  const { collapsed } = useContext(SidebarContext);
  const user = useSelector(selectUser);
  return (
    <>
      {["CUSTOMER"].includes(user?.role) ? (
        <div className="profile-page">
          <header className="header p-4 bg-gray-200 flex justify-between items-center"></header>

          <div className="profile-content container mx-auto p-6">
            {/* Hiển thị thông tin người dùng */}
            <ProfileInfo userData={user} />

            {/* Bảng lịch sử dịch vụ */}
            <HistoryTable userType={user?.role} />
          </div>
        </div>
      ) : (
        <div
          className="profile-page"
          style={{
            marginTop: "10px",
            marginLeft: collapsed ? "80px" : "240px",
            padding: "20px",
            width: `calc(100% - ${collapsed ? "80px" : "240px"})`,
          }}
        >
          <header className="header p-4 bg-gray-200 flex justify-between items-center"></header>

          <div className="profile-content container mx-auto p-6">
            {/* Hiển thị thông tin người dùng */}
            <ProfileInfo userData={user} />
            <HistoryTable userType={user?.role} />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
