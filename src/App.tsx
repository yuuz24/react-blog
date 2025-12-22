import RootLayout from "./components/RootLayout";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Write from "./pages/Write/Write";
import Read from "./pages/Read/Read";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/write" element={<Write />} />
        <Route path="/read/:id" element={<Read />} />
      </Route>
    </Routes>
  );
}
