import styled from "styled-components";

// 작성하기 버튼
// WriterHome에서 RollingPaper에 메모를 남기기 위해 이 버튼을 클릭하면
// WriteModal이 열리며, 내용 작성 가능

const Button = styled.button`
  width: 170px;
  height: 46px;
  background: #5e7897;
  font-weight: bold;
  font-size: 22px;
  color: #ffffff;
  text-align: center;
  border-radius: 20px;
  border: none;
  outline: none;
  margin-top: 30px;
`;

const WriteButton = ({ onClick }) => {
  return <Button onClick={onClick}>작성하기</Button>;
};

export default WriteButton;
