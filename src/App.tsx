import RootLayout from "./components/RootLayout";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Write from "./pages/Write/Write";
import Read from "./pages/Read/Read";
import { Routes, Route } from "react-router-dom";
import UnauthenticatedLayout from "./components/UnauthenticatedLayout";
import AuthenticatedLayout from "./components/AuthenticatedLayout";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route element={<UnauthenticatedLayout />}>
          <Route path="/auth" element={<Auth />} />
        </Route>
        <Route element={<AuthenticatedLayout />}>
          <Route path="/write" element={<Write />} />
        </Route>
        <Route path="/read/:id" element={<Read />} />
      </Route>
    </Routes>
  );
}
