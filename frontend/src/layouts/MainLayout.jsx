import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/layout.css";

const MainLayout = ({ children }) => {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
