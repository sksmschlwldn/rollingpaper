import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
    navigate("/"); // 홈 화면으로 리디렉션
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
