require("dotenv").config({ path: "./config/.env" });
const fs = require('fs').promises;
const path = require('path');

// 공지사항 API
exports.noticesGetCall = async () => {
  // 로스트아크 API 공지사항 데이터 가져오기
  const url = 'https://developer-lostark.game.onstove.com/news/notices';

  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'accept': 'application/json',
        'authorization': `bearer ${process.env.LOSTARK_API}`
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      return { data, status: 200};

    } else {
      return { data: [], status: 500};
    }
  } catch (error) {
    console.error('Error:', error);
    return { data: [], status: 500};
  }
}

// 모험 섬 데이터 API
exports.adventureIslandGetCall = async () => {
  // 로스트아크 API 캘린더 데이터 가져오기
  const url = 'https://developer-lostark.game.onstove.com/gamecontents/calendar';

  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'accept': 'application/json',
        'authorization': `bearer ${process.env.LOSTARK_API}`
      },
    });

    if (response.ok) {
      const data = await response.json();
      const filterAdventureIsland = await calendarAdventureFilter(data);
      const saveAdventureIsland = await calendarFileSave(filterAdventureIsland);

      if(saveAdventureIsland) {
        return { status: 200 }; 
      } else {
        return { status: 500 };
      }
    } else {
      return { status: 500 };
    }
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
}

// 모험 섬 데이터 정리
const calendarAdventureFilter = async (data) => {
  const adventureIsland = data.filter((el) => el.CategoryName === '모험 섬');
  
  const sortedData = {};

  adventureIsland.forEach((item) => {
    // console.log('item ', item);
    // 모험 섬 중 출현을 안하는 경우도 있음
    if(item.StartTimes !== null) {

      item.StartTimes.forEach((startTime) => {
        const dateKey = startTime.substring(0, 10);
        if (!sortedData[dateKey]) {
          sortedData[dateKey] = [];
        }

        // 중복 데이터 여부 확인
        const isDuplicate = sortedData[dateKey].some((dataItem) => dataItem.ContentsName === item.ContentsName);

        if (!isDuplicate) {
          let RewardItemType = '실링';


          const sortedReward = [];

          item.RewardItems.forEach((reward) => {
            if (reward.StartTimes !== null) {
              reward.StartTimes.forEach((time) => {
                if(time.substring(0, 10) === dateKey) {
                  if (reward.Name === '골드') {
                    RewardItemType = '골드';
                  } else if (reward.Name === '대양의 주화 상자') {
                    RewardItemType = '주화';
                  } else if (reward.Name === '영혼의 잎사귀') {
                    RewardItemType = '카드';
                  }

                  // 보상 아이템 중복 데이터 여부 확인
                  const isRewardDuplicate = sortedReward.some((dataItem) => dataItem.Name === reward.Name);
                  if(!isRewardDuplicate) {
                    sortedReward.push({
                      Name: reward.Name,
                      Icon: reward.Icon,
                    });
                  }
                }
              });
            }
          });

          item.RewardItems.forEach((reward) => {
            if (reward.StartTimes === null) {
              sortedReward.push({
                Name: reward.Name,
                Icon: reward.Icon,
              });
            }
          });


          if(item.StartTimes !== null) {
            const filterStartTimes = item.StartTimes.filter((time) => dateKey === time.substring(0, 10));

            sortedData[dateKey].push({
              ContentsName: item.ContentsName,
              ContentsIcon: item.ContentsIcon,
              RewardItemType: RewardItemType,
              StartTimes: filterStartTimes,
              RewardItems: sortedReward,
            });

            sortedData[dateKey].sort((a, b) => {
              const aStartTime = a.StartTimes[0];
              const bStartTime = b.StartTimes[0];
              return aStartTime.localeCompare(bStartTime);
            });
          }
        }

      });
    }
  });

  // Sort the data based on date keys
  const sortedKeys = Object.keys(sortedData).sort();
  const sortedResult = {};

  sortedKeys.forEach((key) => {
    sortedResult[key] = sortedData[key];
  });

  // return sortedData;
  return sortedResult;
}

// 모험 섬 데이터 파일 저장
const calendarFileSave = async (filterAdventureIsland) => {
  try {
    // console.log('filterAdventureIsland ', filterAdventureIsland);
    const keyArray = Object.keys(filterAdventureIsland);

    for (let i = 0; i < keyArray.length; i++) {
      const fileData = filterAdventureIsland[keyArray[i]];

      const folderName = keyArray[i].slice(0, 7).replace('-', '');
      const filePath = path.join(__dirname, `../../frontend/src/assets/Schedule/${folderName}`);
      
      try {
        await fs.access(filePath);
      } catch (error) {
        // If the folder doesn't exist, create it
        await fs.mkdir(filePath, { recursive: true });
      }

      const fileName = `${filePath}/${keyArray[i]}.json`
      await fs.writeFile(fileName, JSON.stringify(fileData, null, '\t'))

    }

    console.log('Success');
    return true;
    
  } catch (error) {
    console.error('Update error: ', error);
    return false;
    // alert('데이터 갱신 중 에러가 발생하였습니다. 잠시 후 다시 시도 해주세요.');
  }
}
