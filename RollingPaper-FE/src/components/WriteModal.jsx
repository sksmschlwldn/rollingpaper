import styled from "styled-components";
import React, { useState } from "react";
import axios from "axios";

// 메모 작성 모달 컴포넌트
// 사용자로부터 이름과 메시지를 입력받아 서버에 전달하고, 메모를 작성하는 역할

const ModalWrapper = styled.div`
  max-width: 400px;
  width: 100%;
  height: 430px;
  background: #ffffff;
  border-radius: 40px 40px 0 0;
  bottom: 0;
  position: fixed;
`;

const Title = styled.div`
  font-size: 19px;
  font-weight: bold;
  margin-top: 20px;
  color: #000000;
  text-align: center;
`;

const SubTitle = styled.div`
  font-weight: bold;
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 12px;
  color: #000000;
`;

const NameBox = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: #f4f4f4;
  padding: 0 0 0 10px;
  box-sizing: border-box;
  margin-bottom: 5px;
`;

const InputWrapper = styled.div`
  padding: 30px;
`;

const MessageBox = styled.textarea`
  width: 100%;
  height: 140px;
  box-sizing: border-box;
  border: none;
  border-radius: 10px;
  background: #f4f4f4;
  margin-bottom: 13px;
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SendButton = styled.button`
  width: 160px;
  height: 45px;
  font-size: 20px;
  font-weight: bold;
  background: #5e7897;
  border-radius: 20px;
  border: none;
  color: #ffffff;
  margin: 3px;
`;

const ExitButton = styled.button`
  width: 160px;
  height: 45px;
  font-size: 20px;
  font-weight: bold;
  background: #ced1d6;
  border-radius: 20px;
  border: none;
  color: #ffffff;
  margin: 3px;
`;

const WriteModal = ({ closeModal, onNewMemo }) => {
  const [name, setName] = useState(""); // 이름상태
  const [message, setMessage] = useState(""); // 메시지 상태

  // 메모 폼 제출시 서버로 메모 보내기 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3002/api/submit-message", // 서버 API로 메모 전송
        {
          name,
          message,
        }
      );

      if (response.data.success) {
        const newMemo = { id: response.data.id, name, message }; // 새 메모 데이터
        onNewMemo(newMemo); // 부모 컴포넌트에 새로운 메모 전달
        closeModal(); // 모달 닫기
      } else {
        alert(response.data.message); //실패시 메시지 출력
      }
    } catch (error) {
      console.error("메모 제출 오류:", error);
      alert("서버와의 연결에 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <ModalWrapper onClick={(e) => e.stopPropagation()}>
      <form onSubmit={handleSubmit}>
        <Title>작성하기</Title>
        <InputWrapper>
          <SubTitle>이름</SubTitle>
          <NameBox
            placeholder="이름을 입력하시오."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={4}
          />
          <SubTitle>지우에게 하고 싶은 말</SubTitle>
          <MessageBox
            placeholder="메시지를 입력하시오."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            maxLength={90}
          />
          <ButtonWrapper>
            <ExitButton type="button" onClick={closeModal}>
              취소하기
            </ExitButton>
            <SendButton type="submit">보내기</SendButton>
          </ButtonWrapper>
        </InputWrapper>
      </form>
    </ModalWrapper>
  );
};

export default WriteModal;
