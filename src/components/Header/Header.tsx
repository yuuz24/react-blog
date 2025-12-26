import { axiosInstance } from "../../api/axiosInstance";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

export default function Header() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const unsetAuth = useAuthStore((s) => s.unsetAuth);
  const isLoggedIn = Boolean(accessToken);

  const handleLogout = async () => {
    try {
      const { status } = await axiosInstance.post("/logout");
      if (status === 200) {
        // 로그아웃 성공 -> zustand 상태값 초기화
        unsetAuth();
      } else {
        throw new Error("로그아웃에 실패했습니다");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <header className="page__header">
      <h1 className="page__logo">
        <NavLink to="/" className="page__logo-link">
          JBNU
        </NavLink>
      </h1>
      <nav className="page__navigation">
        <ul className="page__nav-list">
          <li className="page__nav-item">
            <NavLink to="/write" className="page__nav-link">
              글쓰기
            </NavLink>
          </li>
          <li className="page__nav-item">
            {isLoggedIn ? (
              <button
                type="button"
                className="page__nav-link"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            ) : (
              <NavLink to="/auth" className="page__nav-link">
                인증
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
