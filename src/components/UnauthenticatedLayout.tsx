import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore"; // 경로 맞추기

type LocationState = {
  from?: string;
};

export default function UnauthenticatedLayout() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const location = useLocation();
  const from = (location.state as LocationState | null)?.from ?? "/";

  if (accessToken) {
    const target = from && from !== "/auth" ? from : "/";
    return <Navigate to={target} replace />;
  }

  return <Outlet />;
}
