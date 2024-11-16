import React, { useState, useEffect, useContext } from "react";
import { SidebarContext } from "../../components/header/header";
import { workSchedules } from "./workScheduleData"; // Nhập dữ liệu lịch làm việc
import "./personalSchedule.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Style } from "@mui/icons-material";

const daysOfWeek = [
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
  "Chủ Nhật",
];
const morningHours = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
];
const afternoonHours = ["15:00", "16:00", "17:00", "18:00", "19:00"];

const PersonalSchedule = () => {
  const { collapsed } = useContext(SidebarContext);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
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
    // Chuyển đổi dữ liệu lịch làm việc
    const formattedSchedule = workSchedules.map((work) => {
      const dayIndex = new Date(work.date).getDay(); // Lấy chỉ số ngày từ dữ liệu (0-6)
      const day = daysOfWeek[dayIndex === 0 ? 6 : dayIndex - 1]; // Chuyển đổi sang Thứ Hai (Thứ Bảy và Chủ Nhật là 6 và 0)

      return {
        day,
        startTime: work.startTime,
        endTime: work.endTime,
        status: work.status === "Làm việc" ? `Làm việc ` : work.status,
      };
    });

    // Cập nhật state với dữ liệu
    setTimeout(() => {
      setSchedule(formattedSchedule);
      setLoading(false);
    }, 1000);
  }, []);

  // Tạo layout thời khóa biểu theo ngày và giờ
  const renderSchedule = () => {
    return (
      <>
        <tr>
          <td className="hour-cell">Ca Sáng</td>
          {daysOfWeek.map((day) => {
            const morningTasks = schedule.filter(
              (item) =>
                item.day === day &&
                (morningHours.includes(item.startTime) ||
                  (item.endTime > "9:00" && item.startTime < "15:00"))
            );
            return (
              <td key={day} className="schedule-cell">
                {morningTasks.length > 0
                  ? morningTasks.map((task, index) => (
                      <div key={index}>{task.status}</div>
                    ))
                  : ""}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="hour-cell">Ca Chiều</td>
          {daysOfWeek.map((day) => {
            const afternoonTasks = schedule.filter(
              (item) =>
                item.day === day &&
                (afternoonHours.includes(item.startTime) ||
                  (item.endTime > "15:00" && item.startTime < "20:00"))
            );
            return (
              <td key={day} className="schedule-cell">
                {afternoonTasks.length > 0
                  ? afternoonTasks.map((task, index) => (
                      <div key={index}>{task.status}</div>
                    ))
                  : ""}
              </td>
            );
          })}
        </tr>
      </>
    );
  };

  return (
    <div
      style={{
        marginTop: "50px",
        marginLeft: collapsed ? "80px" : "240px",
        padding: "20px",
        width: `calc(100% - ${collapsed ? "80px" : "240px"})`,
      }}
    >
      <div className="schedule-container">
        <h2>Lịch Đi Làm Cá Nhân</h2>
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          // <table className="schedule-table">
          //   <thead>
          //     <tr>
          //       <th>Thời Gian</th>
          //       {daysOfWeek.map((day) => (
          //         <th key={day}>{day}</th>
          //       ))}
          //     </tr>
          //   </thead>
          //   <tbody>{renderSchedule()}</tbody>
          // </table>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>Thời Gian</TableCell>
                  {daysOfWeek.map((day) => (
                    <TableCell key={day} align="right">
                      {day}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
            </Table>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default PersonalSchedule;
