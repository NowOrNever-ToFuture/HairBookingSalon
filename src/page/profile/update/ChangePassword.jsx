import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css"; // Import CSS cho trang
const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Trạng thái để hiển thị popup
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới không khớp!");
      return;
    }
    // Logic cập nhật mật khẩu sẽ được thêm vào đây
    console.log("Cập nhật mật khẩu:", currentPassword, newPassword);

    // Hiển thị popup thành công
    setShowSuccessPopup(true);
  };
  const handleCancel = () => {
    const isDirty =
      currentPassword !== "" || newPassword !== "" || confirmPassword !== "";
    if (
      isDirty &&
      window.confirm(
        "Bạn có chắc chắn muốn hủy? Tất cả thay đổi sẽ không được lưu."
      )
    ) {
      navigate(-1); // Quay về trang trước đó
    } else if (!isDirty) {
      navigate(-1);
    }
  };
  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    navigate(-1); // Quay lại trang trước đó khi đóng popup
  };
  return (
    <div className="change-password-container">
      <div className="change-password-header">
        <h1>Thay đổi mật khẩu</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentPassword">Mật khẩu hiện tại:</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">Mật khẩu mới:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Xác nhận mật khẩu mới:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="button-container">
          <div className="update-button-container">
            <button type="submit" className="change-password-button">
              Cập nhật
            </button>
          </div>
          <div className="cancel-button-container">
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Hủy
            </button>
          </div>
        </div>
      </form>
      {showSuccessPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Cập nhật thành công!</h2>
            <button onClick={handleClosePopup} className="close-popup-button">
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ChangePassword;
