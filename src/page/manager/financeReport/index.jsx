import React, { useState, useEffect, useContext } from "react";
import { SidebarContext } from "../../../components/header/header";
import {
  Form,
  Input,
  Popconfirm,
  Table,
  Typography,
  Button,
  Select,
} from "antd";

const columns = [
  {
    title: "Mã dịch vụ",
    dataIndex: "serviceCode",
    width: 150,
  },
  {
    title: "Tên Dịch Vụ",
    dataIndex: "serviceName",
    width: 150,
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    width: 100,
  },
  {
    title: "Đơn Giá",
    dataIndex: "unitPrice",
    width: 150,
    render: (text) =>
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(text),
    sorter: (a, b) => parseFloat(a.totalPrice) - parseFloat(b.totalPrice),
  },
  {
    title: "Thành Tiền",
    dataIndex: "totalPrice",
    width: 150,
    render: (text) =>
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(text),
    sorter: (a, b) => parseFloat(a.unitPrice) - parseFloat(b.unitPrice),
  },
  {
    title: "Ngày Thực Hiện",
    dataIndex: "executionDate",
    width: 200,
    sorter: (a, b) => new Date(a.executionDate) - new Date(b.executionDate),
  },
];

const dataSource = Array.from({
  length: 100,
}).map((_, i) => {
  const quantity = Math.floor(Math.random() * 10) + 1;
  const unitPrice = (Math.random() * 100000).toFixed(2);
  const totalPrice = (quantity * unitPrice).toFixed(2);
  const executionDate = new Date(
    Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
  ).toISOString(); // Recent dates within the last 30 days
  return {
    key: i,
    serviceCode: `DV${i}`,
    serviceName: `Dịch vụ ${i}`,
    quantity,
    unitPrice,
    totalPrice,
    executionDate,
  };
});

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const Finance = () => {
  const { collapsed } = useContext(SidebarContext);
  const [selectedOption, setSelectedOption] = useState("Last 24 Hours");
  const [filteredData, setFilteredData] = useState(dataSource);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    filterData();
  }, [selectedOption]);

  const filterData = () => {
    const now = new Date();
    let filtered = [];

    if (selectedOption === "Last 24 Hours") {
      filtered = dataSource.filter((item) => {
        const executionDate = new Date(item.executionDate);
        return now - executionDate <= 24 * 60 * 60 * 1000;
      });
    } else if (selectedOption === "Current Month") {
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      filtered = dataSource.filter((item) => {
        const executionDate = new Date(item.executionDate);
        return (
          executionDate.getMonth() === currentMonth &&
          executionDate.getFullYear() === currentYear
        );
      });
    }

    console.log("Filtered Data:", filtered); // Debugging log
    setFilteredData(filtered);
    calculateTotalRevenue(filtered);
  };

  const calculateTotalRevenue = (data) => {
    const total = data.reduce(
      (sum, item) => sum + parseFloat(item.totalPrice),
      0
    );
    setTotalRevenue(total.toFixed(2));
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
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
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Báo Cáo Tài Chính</h2>
        <Select
          defaultValue="Trong Vòng 24 Tiếng"
          style={{ width: 200, marginLeft: "auto" }}
          onChange={handleOptionChange}
        >
          <Option value="Last 24 Hours">Trong Vòng 24 Tiếng</Option>
          <Option value="Current Month">Trong Vòng 1 Tháng</Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          pageSize: 50,
        }}
        scroll={{
          y: 55 * 5,
        }}
      />
      <Typography.Title level={4} style={{ marginTop: 16 }}>
        Tổng Doanh Thu:{" "}
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(totalRevenue)}
      </Typography.Title>
    </div>
  );
};

export default Finance;
