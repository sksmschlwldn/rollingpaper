import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 로그아웃 화면 구성 컴포넌트
// MyHome(로그인 상태)에서 localStage를 초기화하며 홈(로그아웃)으로 빠져나옴.

const LogoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100vh;
`;

const AppTitle = styled.div`
  font-size: 40px;
  font-weight: 950;
  color: #5e7897;
  margin-top: 15vh;
`;

const LogoutButton = styled.button`
  border-radius: 10px;
  background: #5e7897;
  color: white;
  font-weight: bold;
  width: 150px;
  height: 40px;
  font-size: 16px;
  border: none;
  margin-top: 100px;
`;

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // localStorage 초기화
    navigate("/"); // 홈 화면으로 이동
  };

  return (
    <LogoutContainer>
      <AppTitle>
        2024 <br />
        RollingPaper
      </AppTitle>
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </LogoutContainer>
  );
};

export default LogOut;
