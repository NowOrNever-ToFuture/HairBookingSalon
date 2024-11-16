import React, { useState, useEffect } from "react";
import "./profile.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Rate } from "antd";
import { logout, selectUser } from "../../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../config/axios";

const HistoryTable = ({ userType }) => {
  const [rating, setRating] = useState(null);
  const [isRated, setIsRated] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(selectUser);
  const handleRateChange = (value) => {
    if (!isRated) {
      setRating(value);
      setIsRated(true);
    }
  };

  const fetchData = async () => {
    try {
      const response = await api.get("appointment");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);

      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {userType === "CUSTOMER" && (
        <div style={{ marginBottom: "10px" }} className="history-table mt-6">
          <h3 className="text-lg font-semibold mb-2">Lịch sử</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Thời gian</TableCell>
                  <TableCell align="right">Chi nhánh</TableCell>
                  <TableCell align="right">Thợ cắt tóc</TableCell>
                  <TableCell align="right">Dịch vụ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .filter(
                    (appointment) =>
                      appointment.phoneNumber === user?.phoneNumber
                  )
                  .map((appointment) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={appointment.id}
                    >
                      <TableCell align="right">
                        {appointment.appointmentDate}
                      </TableCell>
                      <TableCell align="right">
                        {appointment.branchName}
                      </TableCell>
                      <TableCell align="right">
                        {appointment.user.username}
                      </TableCell>
                      <TableCell align="right">
                        {appointment.serviceName}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {userType === "STYLIST" && (
        <div className="history-table mt-6">
          <h3
            className="text-lg font-semibold mb-2"
            style={{ marginBottom: "10px" }}
          >
            Lịch sử
          </h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Thời gian</TableCell>
                  <TableCell align="right">Chi nhánh</TableCell>
                  <TableCell align="right">Tên Khách Hàng</TableCell>
                  <TableCell align="right">Dịch vụ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .filter((appointment) => appointment.user.id === user?.id)
                  .map((appointment) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={appointment.id}
                    >
                      <TableCell align="right">
                        {appointment.appointmentDate}
                      </TableCell>
                      <TableCell align="right">
                        {appointment.branchName}
                      </TableCell>
                      <TableCell align="right">
                        {appointment.fullname}
                      </TableCell>
                      <TableCell align="right">
                        {appointment.serviceName}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default HistoryTable;
