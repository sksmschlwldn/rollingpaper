import { Link } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import Memobox from "./MemoBox";
import MemoModal from "./MemoModal";
import axios from "axios";

// 로그인 이후의 화면을 보여주는 컴포넌트
// 메모의 상세정보(message)를 확인 할 수 있음.

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
const AllDeleteButton = styled.button`
  width: 170px;
  height: 46px;
  background: #5e7897;
  font-weight: 600;
  font-size: 22px;
  color: #ffffff;
  text-align: center;
  border-radius: 20px;
  border: none;
  outline: none;
  margin-top: 30px;
`;

const MyHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [modalData, setModalData] = useState({ name: "", message: "" }); // 모달이 표시할 데이터

  const handleOpenModal = (name, message) => {
    setModalData({ name, message }); // DB에서 가져온 message를 modalData에 저장
    setIsModalOpen(true); // 모달 상태가 열림으로 설정
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 상태가 닫힘으로 설정
  };

  const handleDeleteAll = async () => {
    const confirmDelete = window.confirm(
      "정말로 모든 메모를 삭제하시겠습니까?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete("http://localhost:3002/api/messages");
      if (response.data.success) {
        alert("모든 메모가 삭제되었습니다.");
        window.location.reload();
      } else {
        alert("메모 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("메모 삭제 오류:", error);
      alert("서버와의 연결에 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <HomeContainer>
      <Link to={"/logout"}>
        <AccountImg src="/image/account.svg" />
      </Link>
      <Title>
        <Highlight>지우</Highlight>의 롤링페이퍼를 꾸며주세요
      </Title>
      <Memobox onClickMemo={handleOpenModal} />{" "}
      {/* Memobox 클릭 시 handleOpenModal 호출 */}
      {/* 모달이 열려 있으면 화면에 띄우기 */}
      {isModalOpen && (
        <Overlay>
          <MemoModal
            closeModal={handleCloseModal}
            name={modalData.name} // 메모 작성자 이름 전달
            message={modalData.message} // 메모 메시지 전달
          />
        </Overlay>
      )}
      <AllDeleteButton onClick={handleDeleteAll}>전체 삭제</AllDeleteButton>
    </HomeContainer>
  );
};

export default MyHome;
