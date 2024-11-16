import Header from "../header/header";
import { Outlet } from "react-router-dom";
import "./layout.css";
import Footer from "../footer/footer";

const Layout = () => {
  return (
    <>
      <div className="layout">
        <Header />

        <main>
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
