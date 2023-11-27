const schedule = require('node-schedule');
const lostarkAPI = require('../api/lostark');

// 공지사항 데이터 가져오기
exports.noticesSchedule = () => {
  // 매일 오전 10시 3분 실행
  schedule.scheduleJob('3 10 * * *', async () => {
    try {
        console.log(new Date() + ' Notices Scheduler Running!');
        const NoticesApiResp = await lostarkAPI.noticesGetCall()
        
        if(NoticesApiResp.status !== 200) {
            console.log('Notices Scheduler Failed');
            return ;
        }
        console.log(new Date() + ' Notices Scheduler Suceess!');
    } catch (err) {
        console.log(new Date() + ' Notices Scheduler Failed!');
    }
  });
};


// 모험 섬 데이터 가져오기
exports.adventureIslandSchedule = () => {
    // 매주 수요일 오전 10시 4분
    schedule.scheduleJob('4 10 * * 3', async () => {
        try {
            console.log(new Date() + ' Island Scheduler Running!');
            const adventureIslandApiResp = await lostarkAPI.adventureIslandGetCall();
            
            if(adventureIslandApiResp.status !== 200) {
                console.log('Island Scheduler Failed');
                return ;
            }
            console.log(new Date() + ' Island Scheduler Suceess!');
        } catch (err) {
            console.log(new Date() + ' Island Scheduler Failed!');
        }
    });
};
