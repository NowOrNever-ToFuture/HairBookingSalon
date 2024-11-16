import React, { useEffect, useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import { appointments } from "./mockData"; // Import mock data
import "./appointment.css"; // Import CSS để tùy chỉnh giao diện
import { SidebarContext } from "../../components/header/header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import SortIcon from "@mui/icons-material/Sort";
import api from "../../config/axios";

const Appointment = () => {
  const { collapsed } = useContext(SidebarContext);
  const [data, setData] = useState(appointments); // Khởi tạo với mock data
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date()); // Lưu trữ ngày hiện tại
  const [statuses, setStatuses] = useState({}); // Trạng thái của từng cuộc hẹn
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("appointment");
      setData(response.data);
      console.log(response.data);
    };

    fetchData();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
    // Giả lập việc tải dữ liệu
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Giả lập thời gian tải 500ms

    return () => clearTimeout(timer); // Dọn dẹp timer khi component bị hủy
  }, []);

  useEffect(() => {
    // Cập nhật ngày hiện tại
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60 * 24); // Cập nhật mỗi ngày

    return () => clearInterval(interval); // Dọn dẹp interval khi component bị hủy
  }, []);

  const handleStatusChange = (id, status) => {
    setStatuses((prevStatuses) => {
      if (prevStatuses[id]) return prevStatuses; // Prevent status change if already set
      return {
        ...prevStatuses,
        [id]: status,
      };
    });
  };

  const renderStatus = (id) => {
    const status = statuses[id] || "Đang chờ";
    return (
      <span
        className={
          status === "Đã xác nhận"
            ? "status-confirmed"
            : status === "Đã hủy"
            ? "status-cancelled"
            : "status-pending"
        }
      >
        {status}
      </span>
    );
  };

  const handleSortToggle = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortedData = data.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div
      style={{
        marginTop: "50px",
        marginLeft: collapsed ? "80px" : "240px",
        padding: "20px",
        width: `calc(100% - ${collapsed ? "80px" : "240px"})`,
      }}
    >
      <div className="appointment-container">
        <h2>LỊCH HẸN</h2>
        <div className="header-container">
          <div className="current-date">
            {currentDate.toLocaleDateString("vi-VN", {
              day: "2-digit", // Định dạng 2 chữ số cho ngày
              month: "2-digit", // Định dạng 2 chữ số cho tháng
              year: "numeric", // Định dạng năm
            })}
          </div>
        </div>

        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : sortedData.length === 0 ? (
          <p>Không có cuộc hẹn nào cho tiêu chí đã chọn.</p>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">#</TableCell>
                  <TableCell align="center">Tên khách hàng</TableCell>
                  <TableCell align="center">Số điện thoại</TableCell>
                  <TableCell align="center">Tên dịch vụ</TableCell>
                  <TableCell align="center">Chi nhánh</TableCell>
                  <TableCell align="center">Giờ đặt</TableCell>
                  <TableCell align="center">Trạng thái</TableCell>
                  <TableCell align="center">Ngày hẹn</TableCell>
                  <TableCell align="center">Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((appointment) => (
                  <StyledTableRow
                    key={appointment.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell align="center">
                      {appointment.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {appointment.fullname}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {appointment.phoneNumber}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {appointment.serviceName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {appointment.branchName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {appointment.slotTime}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {appointment.appointmentStatus === "PENDING"
                        ? "Đang chờ"
                        : appointment.appointmentStatus === "CONFIRMED"
                        ? "Đã xác nhận"
                        : "Đã hủy"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {appointment.appointmentDate}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Tooltip title="Xác nhận">
                        <IconButton
                          onClick={() =>
                            handleStatusChange(appointment.id, "Đã xác nhận")
                          }
                          disabled={!!statuses[appointment.id]}
                        >
                          <DoneOutlineIcon sx={{ color: "#84EB2C" }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Hủy">
                        <IconButton
                          onClick={() =>
                            handleStatusChange(appointment.id, "Đã hủy")
                          }
                          disabled={!!statuses[appointment.id]}
                        >
                          <CancelOutlinedIcon sx={{ color: "red" }} />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default Appointment;
