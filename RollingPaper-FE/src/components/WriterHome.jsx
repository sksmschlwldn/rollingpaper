import { Link } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import Memobox from "./MemoBox";
import WriteButton from "./WriteButton"; // 버튼 컴포넌트
import WriteModal from "./WriteModal";

const HomeContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  background: #d9e3f0;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #5f87b5;
  margin-top: 80px;
  margin-bottom: 30px;
`;

const Highlight = styled.span`
  color: #0054b7;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const AccountImg = styled.img`
  position: absolute;
  top: 20px;
  right: 10px;
`;

const WriterHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMemo, setNewMemo] = useState(null); // 새로운 메모 상태 추가

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleNewMemo = (memo) => {
    // 새로운 메모가 작성되었을 때 상태 업데이트
    setNewMemo(memo);
  };

  return (
    <HomeContainer>
      <Link to="./signin">
        <AccountImg src="/image/account.svg" />
      </Link>
      <Title>
        <Highlight>지우</Highlight> 의 롤링페이퍼를 꾸며주세요
      </Title>
      <Memobox newMemo={newMemo} onClickMemo={() => {}} />
      <WriteButton onClick={openModal} />
      {isModalOpen && (
        <Overlay onClick={closeModal}>
          <WriteModal closeModal={closeModal} onNewMemo={handleNewMemo} />
        </Overlay>
      )}
    </HomeContainer>
  );
};

export default WriterHome;
