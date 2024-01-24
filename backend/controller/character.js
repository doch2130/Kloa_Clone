const { CharacterInfo } = require('../model/characterinfo');
const schedule = require('node-schedule');

// 캐릭터 일일 방문 Count 초기화
exports.todayVisitInitScheduler = () => {
  // 매일 오전 0시 1분 30초 실행
  schedule.scheduleJob(' 30 1 0 * * *', async () => {
    try {
      console.log(new Date() + ' Character Visit Count Scheduler Running!');
      const VistCountResp = await CharacterInfo.update({ todayVisit: 0 }, { where: {} });
      
      if(VistCountResp) {
        console.log(new Date() + ' Character Visit Count Scheduler Suceess!');
      } else {
        console.log(new Date() + ' Character Visit Count Scheduler Failed!');
      }
      return ;
    } catch (err) {
      console.log(new Date() + ' Character Visit Count Scheduler Failed!');
    }
  })
}
