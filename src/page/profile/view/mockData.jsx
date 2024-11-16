// mockData.js

// Dữ liệu cá nhân của người dùng
const mockUserData = {
  customer: {
    name: "Nguyễn Thị Tường Tư",
    phone: "0123456789",
    email: "member123@gmail.com",
    gender: "Nữ",
  },
  staff: {
    name: "Trần Văn B",
    phone: "0987654321",
    email: "staff@example.com",
    role: "Nhân viên lễ tân",
  },
  stylist: {
    name: "Lê Văn C",
    phone: "0912345678",
    email: "stylist@example.com",
    skills: "Cắt tóc, uốn tóc, nhuộm tóc",
  },
  manager: {
    name: "Lê Văn C",
    phone: "0912345678",
    email: "stylist@example.com",
    skills: "Cắt tóc, uốn tóc, nhuộm tóc",
  },
  admin: {
    name: "Nguyen Minh D",
    phone: "0912345678",
    email: "admin@example.com",
    role: "Admin",
  },
  manager: {
    name: "Tran Thi F",
    phone: "0912345678",
    email: "admin@example.com",
    role: "Quản lý",
  },
  staff2: {
    // Thông tin cho nhân viên mới
    name: "Trần Văn C",
    phone: "0987654321",
    email: "staff2@example.com", // Đổi email để phân biệt với nhân viên khác
    role: "Nhân viên lễ tân",
  },
};

// Danh sách người dùng giả lập với thông tin đăng nhập
const mockUsers = [
  {
    username: "tanthuan",
    password: "123",
    role: "customer",
    personalInfo: mockUserData.customer, // Thông tin cá nhân của khách hàng
  },
  {
    username: "yenvy",
    password: "123",
    role: "staff",
    personalInfo: mockUserData.staff, // Thông tin cá nhân của nhân viên
  },
  {
    username: "ngoctu",
    password: "123",
    role: "stylist",
    personalInfo: mockUserData.stylist, // Thông tin cá nhân của nhà tạo mẫu
  },
  {
    username: "quangminh",
    password: "123",
    role: "admin",
    personalInfo: mockUserData.admin, // Thông tin cá nhân của admin
  },
  {
    username: "tuandat",
    password: "123",
    role: "manager",
    personalInfo: mockUserData.manager, // Thông tin cá nhân của quản lý
  },
  {
    username: "lananh",
    password: "123",
    role: "staff",
    personalInfo: mockUserData.staff2, // Thông tin cho nhân viên mới
  },
  {
    username: "pilaf",
    password: "123",
    role: "manager",
    personalInfo: mockUserData.manager, // Thông tin cá nhân của nhà tạo mẫu
  },
];

// Xuất dữ liệu
export { mockUserData, mockUsers };
