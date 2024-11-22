const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3002;

// Middleware
app.use(cors()); // CORS 설정
app.use(bodyParser.json()); // JSON 파싱

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // MySQL 사용자명
  password: "jiwoo2003@", // MySQL 비밀번호
  database: "rollingpaper", // DB 이름
});

db.connect((err) => {
  if (err) {
    console.error("MySQL 연결 오류:", err);
    return;
  }
  console.log("MySQL 연결 성공");
});

// 로그인 API
app.post("/api/login", (req, res) => {
  const { id, password } = req.body;

  // Master 계정 확인
  if (id === "master" && password === "1234") {
    return res.json({ success: true, message: "Master 로그인 성공" });
  }

  // Database에서 사용자 확인
  const query = "SELECT * FROM user WHERE id = ? AND password = ?";
  db.query(query, [id, password], (err, results) => {
    if (err) {
      console.error("DB 조회 중 오류 발생:", err);
      return res.status(500).json({ success: false, message: "서버 오류" });
    }

    if (results.length > 0) {
      res.json({ success: true, message: "로그인 성공" });
    } else {
      res.json({
        success: false,
        message: "아이디 또는 비밀번호가 잘못되었습니다.",
      });
    }
  });
});

// 메시지 제출 API
app.post("/api/submit-message", (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.json({
      success: false,
      message: "이름과 메시지를 모두 입력해야 합니다.",
    });
  }

  const query = "INSERT INTO messages (name, message) VALUES (?, ?)";
  db.query(query, [name, message], (err, result) => {
    if (err) {
      console.error("메시지 저장 중 오류 발생:", err);
      return res
        .status(500)
        .json({ success: false, message: "메시지 저장에 실패했습니다." });
    }

    res.json({ success: true, message: "메시지가 성공적으로 저장되었습니다." });
  });
});

app.get("/api/messages", (req, res) => {
  const query = "SELECT * FROM messages"; // messages 테이블에서 모든 메모 가져오기
  db.query(query, (err, results) => {
    if (err) {
      console.error("DB 조회 중 오류 발생:", err);
      return res.status(500).json({ success: false, message: "서버 오류" });
    }

    res.json({ success: true, messages: results });
  });
});

// 특정 메모를 가져오는 API
app.get("/api/messages/:id", (req, res) => {
  const messageId = req.params.id; // URL 파라미터에서 id를 가져옴
  const query = "SELECT * FROM messages WHERE id = ?";

  db.query(query, [messageId], (err, results) => {
    if (err) {
      console.error("DB 조회 중 오류 발생:", err);
      return res.status(500).json({ success: false, message: "서버 오류" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "메모를 찾을 수 없습니다." });
    }

    // 메모 데이터를 응답
    res.json({ success: true, message: results[0] });
  });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
