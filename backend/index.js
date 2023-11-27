const express = require('express');
const app = express();
const port = 12500;
const cors = require('cors');
const config = require('./config/key');
const lostarkSchedule = require("./controller/schedule");

const corsOption = {
  origin: config.Host, // 허락하는 요청 주소
  credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const router = require("./routes");
// app.use('/', router);
// app.get('/api/hello', (req, res) => {});

app.get('*', (req, res) => {
  res.send('잘못된 접근 주소 입니다.');
});

app.listen(port, () => {
  console.log(`Kloa Schedule Server Port: ${port}`);

  // 로스트아크 공지사항 자동 스케줄
  lostarkSchedule.noticesSchedule();
  lostarkSchedule.adventureIslandSchedule();
});
