import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import styled from "styled-components";
import SignIn from "./components/SignIn";
import MyHome from "./components/MyHome";
import WriterHome from "./components/WriterHome";
import LogOut from "./components/LogOut";

const MainLayout = styled.div``;

function App() {
  // 로그인 상태를 확인하는 함수 (예시로 localStorage 사용)
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <MainLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WriterHome />} />
          <Route path="/signin" element={<SignIn />} />
          {/* 로그인 상태가 아닌 경우 로그인 페이지로 리다이렉트 */}
          <Route
            path="/master"
            element={isLoggedIn ? <MyHome /> : <Navigate to="/signin" />}
          />
          <Route path="/logout" element={<LogOut/>}/>
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
}

export default App;
