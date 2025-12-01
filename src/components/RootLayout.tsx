import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="page">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
