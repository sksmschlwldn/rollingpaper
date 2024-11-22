import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignContainer = styled.div`
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

const LoginBox = styled.div`
  margin-top: 50px;
`;

const IdPw = styled.div`
  font-size: 16px;
`;

const IdPwInput = styled.input`
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  width: 250px;
  height: 20px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  border-radius: 10px;
  background: #5e7897;
  color: white;
  font-weight: bold;
  width: 150px;
  height: 40px;
  font-size: 16px;
  border: none;
  margin-top: 10px;
`;

const SignIn = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3002/api/login", {
        id,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("isLoggedIn", true); // 로그인 상태 저장
        alert("로그인 성공!");
        navigate("/master"); // 로그인 성공 시 master으로 이동
      } else {
        alert("로그인 실패: " + response.data.message);
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <SignContainer>
      <AppTitle>
        Welcome to <br />
        2024 <br />
        RollingPaper
      </AppTitle>
      <LoginBox>
        <form onSubmit={handleSubmit}>
          <IdPw>ID</IdPw>
          <IdPwInput
            type="text"
            placeholder="아이디를 입력하세요"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <IdPw>PASSWORD</IdPw>
          <IdPwInput
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <SubmitButton type="submit">로그인</SubmitButton>
        </form>
      </LoginBox>
    </SignContainer>
  );
};

export default SignIn;