import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

export default function RootLayout() {
  const location = useLocation();
  const isReadPage = location.pathname.startsWith("/read/");

  return (
    <div className="page">
      <Header />
      <Outlet />
      <Footer showLinks={!isReadPage} />
    </div>
  );
}
