import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet /> {/* renders child routes here */}
      <Footer />
    </>
  );
};

export default MainLayout;
