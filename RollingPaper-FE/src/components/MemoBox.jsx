import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const MemoContainer = styled.div`
  width: 330px;
  height: 490px;
  background: #ffffff;
  outline: 3px solid #5e7897;
  display: flex;
  align-items: center;
  border-radius: 30px;
  position: relative;
`;

const MemoWrapper = styled.div`
  display: flex;
  width: 330px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Memo = styled.div`
  position: relative;
`;

const MemoImg = styled.img`
  width: 100px;
  margin: 2px;
`;

const MemoName = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  font-size: 14px;
  font-weight: bold;
  transform: translateX(-50%);
`;

const Memobox = ({ onClickMemo, newMemo, onDelete }) => {
  const [memos, setMemos] = useState([]);

  const fetchMemos = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/messages");
      if (response.data.success) {
        setMemos(response.data.messages);
      }
    } catch (error) {
      console.error("메모 불러오기 오류:", error);
    }
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  useEffect(() => {
    if (newMemo) {
      setMemos((prevMemos) => [...prevMemos, newMemo]);
    }
  }, [newMemo]);

  const handleDelete = (id) => {
    setMemos((prevMemos) => prevMemos.filter((memo) => memo.id !== id)); // 메모 삭제
  };

  return (
    <MemoContainer>
      <MemoWrapper>
        {memos.length === 0 ? (
          <div>롤링페이퍼가 작성되지 않았습니다.</div> // 비어있는 경우 메시지 출력
        ) : (
          memos.map((memo) => (
            <Memo key={memo.id}>
              <MemoImg
                src="/image/memo2.png"
                onClick={() => onClickMemo(memo.name, memo.message, memo.id)} // id도 전달
              />
              <MemoName>{memo.name}</MemoName>
            </Memo>
          ))
        )}
      </MemoWrapper>
    </MemoContainer>
  );
};

export default Memobox;
