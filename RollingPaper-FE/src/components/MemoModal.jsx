import styled from "styled-components";

// Myhome 컴포넌트에서 하나의 메모를 클릭시,
// 해당 메모의 상세 내용(message)을 보여주는 컴포넌트

const ModalWrapper = styled.div`
  text-align: left;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const MemoImg = styled.img`
  width: 300px;
  margin: 3px;
`;

const Name = styled.div`
  position: absolute;
  top: 20%;
  left: 15%;
  color: #334760;
  font-size: 30px;
  font-weight: bold;
`;

const Content = styled.div`
  position: absolute;
  width: 240px;
  top: 35%;
  left: 8%;
  color: #466486;
  font-size: 18px;
  font-weight: 650;
`;

const ExitImg = styled.img`
  position: absolute;
  top: 10%;
  right: 8%;
  width: 35px;
`;

const MemoModal = ({ closeModal, name, message, id }) => {
  return (
    <ModalWrapper>
      <MemoImg src="/image/memo.svg" />
      <Name>{name}</Name>
      <Content>{message}</Content>
      <ExitImg onClick={closeModal} src="/image/exit2.svg" />
    </ModalWrapper>
  );
};

export default MemoModal;
