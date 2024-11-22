import styled from "styled-components";

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
const DeleteButton = styled.button`
  position: absolute;
  top: 72%;
  left: 25%;
  border-radius: 10px;
  background: #ffffff;
  color: #5e7897;
  font-weight: bold;
  width: 150px;
  height: 40px;
  font-size: 16px;
  border: none;
  margin-top: 100px;
`;

const MemoModal = ({ closeModal, name, message, id }) => {
  return (
    <ModalWrapper>
      <MemoImg src="/image/memo.svg" />
      <Name>{name}</Name>
      <Content>{message}</Content> {/* message가 여기에 표시됩니다 */}
      <ExitImg onClick={closeModal} src="/image/exit2.svg" />
    </ModalWrapper>
  );
};

export default MemoModal;
