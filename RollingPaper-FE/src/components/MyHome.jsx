import { Link } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import Memobox from "./MemoBox";
import MemoModal from "./MemoModal";

const HomeContainer = styled.div`
  position: relative;
  height: 110vh;
  display: flex;
  background: #d9e3f0;
  align-items: center;
  flex-direction: column;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #5f87b5;
  margin-top: 90px;
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
  top: 30px;
  right: 10px;
`;

const MyHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ name: "", message: "" }); // content -> message로 변경

  const handleOpenModal = (name, message) => {
    // content -> message로 변경
    setModalData({ name, message }); // DB에서 가져온 message를 modalData에 저장
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <HomeContainer>
      <Link to={"/logout"}>
        <AccountImg src="/image/account.svg" />
      </Link>
      <Title>
        <Highlight>지우</Highlight>의 롤링페이퍼를 꾸며주세요
      </Title>
      <Memobox onClickMemo={handleOpenModal} />

      {isModalOpen && (
        <Overlay>
          <MemoModal
            closeModal={handleCloseModal}
            name={modalData.name}
            message={modalData.message} // message로 전달
          />
        </Overlay>
      )}
    </HomeContainer>
  );
};

export default MyHome;
