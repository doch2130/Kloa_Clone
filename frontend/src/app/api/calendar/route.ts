// 현재 api 방식
// src/app/api
// api/hello/example.ts

import { NextRequest } from "next/server";

async function calendarAdventureFilter(data:any) {
  const adventureIsland = data.filter((el:any) => el.CategoryName === '모험 섬');
  
  const sortedData:any = {};

  adventureIsland.forEach((item:any) => {
    // 모험 섬 중 출현을 안하는 경우도 있음
    if(item.StartTimes !== null) {

      item.StartTimes.forEach((startTime:any) => {
        const dateKey = startTime.substring(0, 10);
        if (!sortedData[dateKey]) {
          sortedData[dateKey] = [];
        }

        // 중복 데이터 여부 확인
        const isDuplicate = sortedData[dateKey].some((dataItem: any) => dataItem.ContentsName === item.ContentsName);

        if (!isDuplicate) {
          let RewardItemType = '실링';


          const sortedReward:any = [];

          item.RewardItems.forEach((reward:any) => {
            if (reward.StartTimes !== null) {
              reward.StartTimes.forEach((time:any) => {
                if(time.substring(0, 10) === dateKey) {
                  if (reward.Name === '골드') {
                    RewardItemType = '골드';
                  } else if (reward.Name === '대양의 주화 상자') {
                    RewardItemType = '주화';
                  } else if (reward.Name === '영혼의 잎사귀') {
                    RewardItemType = '카드';
                  }

                  // 보상 아이템 중복 데이터 여부 확인
                  const isRewardDuplicate = sortedReward.some((dataItem: any) => dataItem.Name === reward.Name);
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

          item.RewardItems.forEach((reward:any) => {
            if (reward.StartTimes === null) {
              sortedReward.push({
                Name: reward.Name,
                Icon: reward.Icon,
              });
            }
          });


          const filterStartTimes = item.StartTimes.filter((time:any) => dateKey === time.substring(0, 10));

          sortedData[dateKey].push({
            ContentsName: item.ContentsName,
            ContentsIcon: item.ContentsIcon,
            RewardItemType: RewardItemType,
            StartTimes: filterStartTimes,
            RewardItems: sortedReward,
          });
        }

      });
    }
  });

  return sortedData;
}

const updateCalendar = async (adventureIsland:any) => {
  try {
    // const adventureIslandResult = 
    await fetch('http://localhost:9999/adventureIsland', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adventureIsland),
    });
    console.log('Success');
  } catch (error) {
    console.error('Update error: ', error);
    // alert('데이터 갱신 중 에러가 발생하였습니다. 잠시 후 다시 시도 해주세요.');
  }
}




export async function GET(request: NextRequest) {
  const url = 'https://developer-lostark.game.onstove.com/gamecontents/calendar';

  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'accept': 'application/json',
        'authorization': `bearer ${process.env.NEXT_PUBLIC_LOSTARK_API}`
      },
    });

    if (response.ok) {
      const data = await response.json();
      const adventureIsland = await calendarAdventureFilter(data);
      await updateCalendar(adventureIsland);
      return new Response(JSON.stringify(adventureIsland), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new Response('Error fetching data', { status: response.status });
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response('An error occurred', { status: 500 });
  }
}
