import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

// 전체 메모들을 보여주는(시각화해주는) 컴포넌트
// DB에서 정보를 가져와 화면에 보여줌.
// MyHome, WriterHome 컴포넌트에서 모두 사용됨.

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

  // DB에서 메모 불러오는 함수
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
  // 컴포넌트가 마운트 될 때 메모를 가져오는 useEffect
  useEffect(() => {
    fetchMemos();
  }, []);

  // 새로운 메모가 전달될 때 마다 memos 상태 업데이트
  useEffect(() => {
    if (newMemo) {
      setMemos((prevMemos) => [...prevMemos, newMemo]);
    }
  }, [newMemo]);

  return (
    <MemoContainer>
      <MemoWrapper>
        {memos.length === 0 ? (
          <div>롤링페이퍼가 작성되지 않았습니다.</div> // 메모가 없는 경우 메시지 출력
        ) : (
          memos.map((memo) => (
            <Memo key={memo.id}>
              {/* 각 메모 이미지 클릭 시 해당 메모의 상세 내용을 보여줌 */}
              <MemoImg
                src="/image/memo2.png"
                onClick={() => onClickMemo(memo.name, memo.message, memo.id)} // id도 전달
              />
              <MemoName>{memo.name}</MemoName> {/* 메모 작성자 이름만 화면에 띄워줌 */}
            </Memo>
          ))
        )}
      </MemoWrapper>
    </MemoContainer>
  );
};

export default Memobox;
