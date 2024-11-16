// src/page/staff/mockData.js
export const appointments = [
  {
    id: 1,
    customerName: "Nguyễn Văn A",
    date: "2024-10-18",
    time: "12h30",
    barber: "Thái Sơn", // Tên thợ cắt tóc
    service: "Dưỡng tóc", // Dịch vụ
    status: "Đã xác nhận",
  },
  {
    id: 2,
    customerName: "Trần Thị B",
    date: "2024-10-16", // Cập nhật để cuộc hẹn có cùng ngày với cuộc hẹn đầu tiên
    time: "13h00",
    barber: "Mai Lan", // Tên thợ cắt tóc khác
    service: "Cắt tóc", // Dịch vụ
    status: "Đã xác nhận",
  },
  {
    id: 3,
    customerName: "Lê Văn C",
    date: "2024-10-19",
    time: "12h20",
    barber: "Ngọc Bích", // Tên thợ cắt tóc
    service: "Gội đầu", // Dịch vụ
    status: "Đã hủy",
  },
  {
    id: 4,
    customerName: "Phạm Thị D",
    date: "2024-10-17",
    time: "11h00",
    barber: "Thái Sơn", // Tên thợ cắt tóc
    service: "Cắt tóc và tạo kiểu", // Dịch vụ
    status: "Đã xác nhận",
  },
  {
    id: 5,
    customerName: "Trần Văn E",
    date: "2024-10-22",
    time: "14h00",
    barber: "Ngọc Bích", // Tên thợ cắt tóc
    service: "Nhuộm tóc", // Dịch vụ
    status: "Đã xác nhận",
  },
];
