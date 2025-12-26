import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Auth.css";
import { axiosInstance } from "../../api/axiosInstance";
import { useAuthStore } from "../../stores/useAuthStore";

type LocationState = {
  from?: string;
};

export default function Auth() {
  const [pageType, setPageType] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const location = useLocation();
  const from = (location.state as LocationState | null)?.from ?? "/";

  const handlePageChange = (type: string, keepEmail = false) => {
    if (!keepEmail) {
      setEmail("");
    }
    setPassword("");
    setPasswordConfirm("");
    setUsername("");
    setPageType(type);
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (email === "" || password === "" || username === "") {
        alert("모든 항목을 입력해 주세요");
        return;
      }
      if (password !== passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다");
        return;
      }
      const { data } = await axiosInstance.post("/register", {
        email,
        password,
        username,
      });
      if (data) {
        alert("회원가입을 완료했습니다.\n로그인 후 이용해 주세요.");
        // 상태값 초기화 및 로그인 탭으로 화면 전환
        // *email은 그대로 로그인에서 사용하도록 상태값 변경 X
        handlePageChange("login", true);
      }
    } catch (error) {
      console.error(error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/login", {
        email,
        password,
      });
      console.log(data);
      // 받은 data(JWT) 정보를 전역 상태(zustand)에 저장 필요
      const accessToken = data?.accessToken ?? data?.token;
      const user = data?.user ?? null;

      setAuth(user, accessToken);
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      alert("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <main className="page__main">
      <article className="page-auth">
        <section className="page-auth__container">
          <nav className="page-auth__toggle">
            <button
              id="login-tab"
              className={`page-auth__toggle-button ${
                pageType === "login" && "page-auth__toggle-button--active"
              }`}
              onClick={() => handlePageChange("login")}
            >
              로그인
            </button>
            <button
              id="signup-tab"
              className={`page-auth__toggle-button ${
                pageType === "signup" && "page-auth__toggle-button--active"
              }`}
              onClick={() => handlePageChange("signup")}
            >
              회원가입
            </button>
          </nav>
          <div className="page-auth__form-section">
            <form
              className={`auth-form ${
                pageType === "login" && "auth-form--active"
              }`}
              id="login-form"
              onSubmit={handleLogin}
            >
              <label htmlFor="login-email" className="a11y-hidden">
                이메일
              </label>
              <input
                type="email"
                id="login-email"
                className="auth-form__input"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="login-password" className="a11y-hidden">
                비밀번호
              </label>
              <input
                type="password"
                id="login-password"
                className="auth-form__input"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="auth-form__submit">
                로그인
              </button>
            </form>
            <form
              className={`auth-form ${
                pageType === "signup" && "auth-form--active"
              }`}
              id="signup-form"
              onSubmit={handleSignup}
            >
              <label htmlFor="signup-email" className="a11y-hidden">
                이메일
              </label>
              <input
                type="email"
                id="signup-email"
                className="auth-form__input"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="signup-name" className="a11y-hidden">
                이름
              </label>
              <input
                type="text"
                id="signup-name"
                className="auth-form__input"
                placeholder="이름"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="signup-password" className="a11y-hidden">
                비밀번호
              </label>
              <input
                type="password"
                id="signup-password"
                className="auth-form__input"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="signup-confirm-password" className="a11y-hidden">
                비밀번호 확인
              </label>
              <input
                type="password"
                id="signup-confirm-password"
                className="auth-form__input"
                placeholder="비밀번호 확인"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
              <button type="submit" className="auth-form__submit">
                회원가입
              </button>
            </form>
          </div>
        </section>
      </article>
    </main>
  );
}
