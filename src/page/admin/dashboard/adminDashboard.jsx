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

const layout = { title: "World Wide Wine Production" };

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
      <div style={dashboardStyle}></div>
    </>
  );
};

export default index;
