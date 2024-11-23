import { Link } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import Memobox from "./MemoBox";
import WriteButton from "./WriteButton";
import WriteModal from "./WriteModal";

// 이 프로젝트의 Home화면이 되는 컴포넌트.
// 메모를 작성하고, 작성된 메모(이름만)를 보여주는 역할

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
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 관리
  const [newMemo, setNewMemo] = useState(null); // 새로운 메모 상태
  const openModal = () => setIsModalOpen(true); //모달 열기 함수
  const closeModal = () => setIsModalOpen(false); // 모달 닫기 함수

  // 새로운 메모 처리 함수
  const handleNewMemo = (memo) => {
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
      {/* 새로운 메모가 있을 경우, 메모박스를 렌더링 */}
      <Memobox newMemo={newMemo} onClickMemo={() => {}} />
      <WriteButton onClick={openModal} />
      {/* 모달이 열려 있으면 화면에 띄우기 */}
      {isModalOpen && (
        <Overlay onClick={closeModal}>
          <WriteModal closeModal={closeModal} onNewMemo={handleNewMemo} />
        </Overlay>
      )}
    </HomeContainer>
  );
};

export default WriterHome;
