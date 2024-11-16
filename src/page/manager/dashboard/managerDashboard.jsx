import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card, CardContent } from "@mui/material";

import { RiseOutlined, FallOutlined } from "@ant-design/icons";

import Plot from "react-plotly.js";
import { Chart } from "react-google-charts";

import React, { useContext } from "react";
import { SidebarContext } from "../../../components/header/header";
// const cards = [
//   {
//     title: "Khách hàng",
//     value: "4,42,236",
//     change: "59.3%",
//     extra: "35,000",
//     direction: "up",
//   },
//   {
//     title: "Doanh số",
//     value: "$78,250",
//     change: "70.5%",
//     extra: "8,900",
//     direction: "up",
//   },
//   {
//     title: "Chi tiêu",
//     value: "$18,800",
//     change: "-27.4%",
//     extra: "1,943",
//     direction: "down",
//   },
//   {
//     title: "Lợi nhuận",
//     value: "$35,078",
//     change: "-27.4%",
//     extra: "$20,395",
//     direction: "down",
//   },
// ];

// const xArray = ["Italy", "France", "Spain", "USA", "Argentina"];
// const yArray = [55, 49, 44, 24, 15];

// const data = [
//   {
//     x: xArray,
//     y: yArray,
//     type: "bar",
//     orientation: "v",
//     marker: { color: "rgba(0,0,255,0.6)" },
//   },
// ];

// const layout = { title: "World Wide Wine Production" };

const index = () => {
  const { collapsed } = useContext(SidebarContext);
  const role = localStorage.getItem("role") || sessionStorage.getItem("role");
  const dashboardStyle = {
    marginTop: "50px",
    marginLeft: collapsed ? "80px" : "240px",
    padding: "20px",
    width: `calc(100% - ${collapsed ? "80px" : "240px"})`,
  };

  return (
    <>
      <div style={dashboardStyle}>
        {/* <h4>Dashboard</h4>
          <Box display="flex" justifyContent="space-around" textAlign="left">
            {cards.map((card, index) => (
              <Card
                key={index}
                sx={{
                  width: "23%",
                  padding: "20px",
                  textAlign: "left",
                  borderRadius: "16px",
                  maxHeight: "200px",
                }}
              >
                <CardContent>
                  <Typography variant="p" color="textSecondary">
                    {card.title}
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="row"
                    sx={{ paddingTop: "10px" }}
                  >
                    <Typography
                      sx={{ marginRight: "8px", fontWeight: "bold" }}
                      variant="h6"
                    >
                      {card.value}
                    </Typography>
                    <Chip
                      sx={{
                        color: card.direction === "up" ? "blue" : "red",
                        backgroundColor:
                          card.direction === "up"
                            ? "rgba(52, 152, 219, 0.1)"
                            : "rgba(231, 76, 60, 0.1)",
                        padding: "10px",
                        marginLeft: "10px",
                        borderRadius: "5px",
                      }}
                      icon={
                        card.direction === "up" ? (
                          <RiseOutlined color="secondary" />
                        ) : (
                          <FallOutlined color="red" />
                        )
                      }
                      label={card.change}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ padding: "10px 0 0 0" }}
                  >
                    {card.direction === "up"
                      ? "Bạn đã tăng thêm "
                      : "Bạn đã giảm "}
                    <span
                      style={{
                        color: card.direction === "up" ? "blue" : "red",
                      }}
                    >
                      {card.extra}
                    </span>{" "}
                    trong năm nay
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <h4 style={{ padding: "10px 0" }}>Chart</h4>
          <Box display="flex" justifyContent="space-around" textAlign="left">
            <Plot
              data={[
                {
                  x: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"],
                  y: [10, 15, 13, 17],
                  type: "scatter",
                  mode: "lines+markers",
                  marker: { color: "red" },
                },
                {
                  type: "bar",
                  x: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"],
                  y: [12, 9, 15, 12, 6, 16, 13],
                },
              ]}
              layout={{
                title: "A Fancy Plot",
              }}
              style={{ width: "46%", maxHeight: "400px" }}
            />

            <Plot
              data={data}
              layout={{
                ...layout,
              }}
              style={{ width: "46%", maxHeight: "400px" }}
            />
          </Box>

          <h4 style={{ padding: "10px 0" }}>Dashboard</h4>
          <Chart
            width={"600px"}
            height={"400px"}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={[
              ["Year", "Sales", "Expenses", "Profit"],
              ["2014", 1000, 400, 200],
              ["2015", 1170, 460, 250],
              ["2016", 660, 1120, 300],
              ["2017", 1030, 540, 350],
            ]}
            options={{
              chart: {
                title: "Company Performance",
                subtitle: "Sales, Expenses, and Profit: 2014-2017",
              },
            }}
            rootProps={{ "data-testid": "2" }}
          /> */}
      </div>
    </>
  );
};

export default index;
