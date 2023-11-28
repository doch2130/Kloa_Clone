const { Notices } = require('../model/index');
const schedule = require('node-schedule');
const lostarkAPI = require('../api/lostark');

// 공지사항 데이터 가져오기
exports.noticesSchedule = () => {
  // 매일 오전 10시 3분 실행
  schedule.scheduleJob('0 3 10 * * *', async () => {
    try {
        console.log(new Date() + ' Notices Scheduler Running!');
        const NoticesApiResp = await lostarkAPI.noticesGetCall()
        
        if(NoticesApiResp.status !== 200) {
            console.log('Notices Scheduler Failed');
            return ;
        }

        const result = await noticesListUpdate(NoticesApiResp.data);

        if(result) {
            console.log(new Date() + ' Notices Scheduler Suceess!');
        } else {
            console.log(new Date() + ' Notices Scheduler Failed!');
        }
        return ;
    } catch (err) {
        console.log(new Date() + ' Notices Scheduler Failed!');
    }
  });
};

const noticesListUpdate = async (data) => {
    try {
      const topNoticesFive = data.slice(0, 5);
  
      for (let i = 4; i >= 0; i--) {
        if(!topNoticesFive[i].Title) {
          continue;
        }
        const isNoticeDuplicate = await Notices.findAll({
          where: {
           title: topNoticesFive[i].Title
          }
        });

        if(isNoticeDuplicate.length > 0) {
          continue;
        }
        
        await Notices.create({
          title: topNoticesFive[i].Title,
          category: topNoticesFive[i].Type,
          createdAt: new Date(topNoticesFive[i].Date),
          link: topNoticesFive[i].Link,
        });
      }
  
      return true;
  
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };


// 모험 섬 데이터 가져오기
exports.adventureIslandSchedule = () => {
    // 매주 수요일 오전 10시 4분
    schedule.scheduleJob('0 4 10 * * 3', async () => {
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
