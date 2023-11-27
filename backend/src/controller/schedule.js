const schedule = require('node-schedule');
const noticesAPI = require('../api/lostark');

// 모험 섬 데이터 가져오기
exports.islandSchedule = () => {
    // 매주 수요일 오전 10시 4분
    schedule.scheduleJob('4 10 * * 3', () => {
        console.log(new Date() + ' Island Scheduler Running!');
        // melonCrawling.melonCrawlingFunction((result) => {
        //     if(result === true) {
        //         // res.send(true);
        //         console.log('멜론 실시간 크롤링 Success');
        //     } else {
        //         // res.send(false);
        //         console.log('멜론 실시간 크롤링 False');
        //     }
        // });
    });
};

// 공지사항 데이터 가져오기
exports.noticesSchedule = () => {
  // 매일 오전 10시 3분 실행
  schedule.scheduleJob('3 10 * * *', async () => {
    try {
        console.log(new Date() + ' Notices Scheduler Running!');
        const NoticesApiResp = await noticesAPI.noticesGetCall();
        
        if(NoticesApiResp.status !== 200) {
            console.log('Notices Scheduler Failed');
            return ;
        }
        
        const result = await noticesAPI.noticesListUpdate(NoticesApiResp.data);
        
        if(result) {
            console.log(new Date() + ' Notices Scheduler Success!');
        } else {
            console.log(new Date() + ' Notices Scheduler Failed!');
        }   
    } catch (err) {
        console.log(new Date() + ' Notices Scheduler Failed!');
    }
  });
};