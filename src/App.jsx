import Layout from "./components/layout/layout";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Home from "./page/home/home";
import About from "./page/about/about";
import Location from "./page/location/location";
import Services from "./page/services/services";
import Login from "./page/login/login";
import Register from "./page/register/register";
import ProfilePage from "./page/profile/view/ProfilePage"; // Import ProfilePage
import EditProfile from "./page/profile/update/EditProfile"; // Import EditProfile component
import ChangePassword from "./page/profile/update/ChangePassword"; // Import ChangePassword component
import Booking from "./page/booking/booking";
import ProfileInfo from "./page/profile/view/ProfileInfo";
import { AuthorizationProvider } from "./components/authorization/AuthorizationContext";
import NotFoundPage from "./404/NotFoundPage";
import ForgetPassword from "./page/forgetPassword/ForgetPassword";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/features/userSlice";
import { SidebarProvider } from "./components/header/header";
// import ManagerDashboard from "./page/manager/dashboard/managerDashboard";
// import AdminDashboard from "./page/admin/dashboard/adminDashboard";
// import ManageService from "./page/manager/manageService/index";
// import ManageUser from "./page/manager/manageUser";
import FinanceReport from "./page/manager/financeReport/";
import ManageSalary from "./page/manager/manageBaseSalary";
import ManageEmployeeSchedule from "./page/manager/manageEmployeeSchedule";
import ManageEmployeeSalary from "./page/manager/manageEmployeeSalary";
import ManageCustomer from "./page/admin/manageCustomer";
import ManageEmployee from "./page/admin/manageEmployee";
import ManageEmployee2 from "./page/manager/manageEmployee";
import ManageService2 from "./page/admin/manageService";
// import Branch from "./page/admin/manageBranch";
import Appointment from "./page/staff/appointment";
// import PersonalSchedule from "./page/staff/personalSchedule";
import Bill from "./page/staff/bill";
import WorkSchedule from "./page/stylist/workSchedule";
import StylistSchedule from "./page/staff/stylistSchedule";
import ManageBranch from "./page/admin/manageBranch";

function App() {
  const user = useSelector(selectUser);
  console.log(user);
  // const PreAuth = ({ children }) => {
  //   if (user && user.role === "ADMIN") {
  //     return children;
  //   } else {
  //     return <Navigate to="/" />;
  //   }
  // };

  const router = createBrowserRouter([
    {
      element: (
        <SidebarProvider>
          <Layout />
        </SidebarProvider>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "location",
          element: <Location />,
        },
        {
          path: "services",
          element: <Services />,
        },
        {
          path: "booking",
          element: <Booking />,
        },
        {
          path: "staff/appointment", // Route cho lịch hẹn
          element:
            user && ["CASHIER"].includes(user.role) ? (
              <Appointment />
            ) : (
              <Navigate to="/login" />
            ),
        },
        // {
        //   path: "staff/schedule/personal",
        //   element:
        //     user && ["CASHIER"].includes(user.role) ? (
        //       <PersonalSchedule />
        //     ) : (
        //       <Navigate to="/login" />
        //     ),
        // },
        {
          path: "staff/bill",
          element:
            user && ["CASHIER"].includes(user.role) ? (
              <Bill />
            ) : (
              <Navigate to="/login" />
            ),
        },
        {
          path: "staff/schedule/stylist",
          element:
            user && ["CASHIER"].includes(user.role) ? (
              <StylistSchedule />
            ) : (
              <Navigate to="/login" />
            ),
        },
        {
          path: "stylist/schedule/personal",
          element:
            user && ["STYLIST"].includes(user.role) ? (
              <WorkSchedule />
            ) : (
              <Navigate to="/login" />
            ),
        },
        // {
        //   path: "manager/dashboard",
        //   element:
        //   user && ["MANAGER"].includes(user.role) ? (
        //     <ManagerDashboard />
        //   ) : (
        //     <Navigate to="/login" />
        //   ),
        // },
        // {
        //   path: "manager",
        //   element:
        //     user && ["MANAGER"].includes(user.role) ? (
        //       <ManagerDashboard />
        //     ) : (
        //       <Navigate to="/login" />
        //     ),
        // },
        // {
        //   path: "manager/dashboard/service",
        //   element:
        //     user && ["MANAGER"].includes(user.role) ? (
        //       <ManageService />
        //     ) : (
        //       <Navigate to="/login" />
        //     ),
        // },
        // {
        //   path: "manager/dashboard/user",
        //   element:
        //     user && ["MANAGER"].includes(user.role) ? (
        //       <ManageUser />
        //     ) : (
        //       <Navigate to="/login" />
        //     ),
        // },
        {
          path: "manager/dashboard/employee",
          element:
            user && ["MANAGER"].includes(user.role) ? (
              <ManageEmployee2 />
            ) : (
              <Navigate to="/login" />
            ),
        },
        {
          path: "manager/dashboard/salary",
          element:
            user && ["MANAGER"].includes(user.role) ? (
              <ManageSalary />
            ) : (
              <Navigate to="/login" />
            ),
        },
        {
          path: "manager/dashboard/salary/employee",
          element:
            user && ["MANAGER"].includes(user.role) ? (
              <ManageEmployeeSalary />
            ) : (
              <Navigate to="/login" />
            ),
        },
        {
          path: "manager/dashboard/finance",
          element:
            user && ["MANAGER"].includes(user.role) ? (
              <FinanceReport />
            ) : (
              <Navigate to="/login" />
            ),
        },
        // {
        //   path: "manager/dashboard/schedule/personal",
        //   element:
        //     user && ["MANAGER"].includes(user.role) ? (
        //       <ManagePersonalSchedule />
        //     ) : (
        //       <Navigate to="/login" />
        //     ),
        // },
        {
          path: "manager/dashboard/schedule/employee",
          element:
            user && ["MANAGER"].includes(user.role) ? (
              <ManageEmployeeSchedule />
            ) : (
              <Navigate to="/login" />
            ),
        },
        // {
        //   path: "admin/dashboard",
        //   element: <AdminDashboard />,
        // },
        // {
        //   path: "admin",
        //   element:
        //     user && ["ADMIN"].includes(user.role) ? (
        //       <AdminDashboard />
        //     ) : (
        //       <Navigate to="/login" />
        //     ),
        // },
        {
          path: "admin/dashboard/customer",
          element:
            user && ["ADMIN"].includes(user.role) ? (
              <ManageCustomer />
            ) : (
              <Navigate to="/login" />
            ),
        },
        {
          path: "admin/dashboard/employee",
          element:
            user && ["ADMIN"].includes(user.role) ? (
              <ManageEmployee />
            ) : (
              <Navigate to="/login" />
            ),
        },
        {
          path: "admin/dashboard/service",
          element:
            user && ["ADMIN"].includes(user.role) ? (
              <ManageService2 />
            ) : (
              <Navigate to="/login" />
            ),
        },
        {
          path: "admin/dashboard/branch",
          element:
            user && ["ADMIN"].includes(user.role) ? (
              <ManageBranch />
            ) : (
              <Navigate to="/login" />
            ),
        },
        {
          element: <AuthorizationProvider />,
          children: [
            // {
            //   path: "profile",
            //   element: <ProfileInfo />,
            // },
            {
              path: "profile/customer",
              element: <ProfilePage />,
            },
            {
              path: "profile/cashier",
              element: <ProfilePage />,
            },
            {
              path: "profile/stylist",
              element: <ProfilePage />,
            },
            {
              path: "profile/admin",
              element: <ProfilePage />,
            },
            {
              path: "profile/manager",
              element: <ProfilePage />,
            },
            {
              path: "profile/update",
              children: [
                {
                  path: "EditProfile",
                  element: <EditProfile />,
                },
                {
                  path: "ChangePassword",
                  element: <ChangePassword />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "forgetPassword",
      element: <ForgetPassword />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
