import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/misc.css";

const MainLayout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout-main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;