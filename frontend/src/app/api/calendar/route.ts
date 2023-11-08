
import { NextResponse } from "next/server";
import { ContentsCalendar, OrganizeContentsCalendar, RewardItem, OrganizeRewardItem, OrganizeAdventureIslandList } from '@/type/contentsCalendar'

async function calendarAdventureFilter(data:ContentsCalendar[]) {
  const adventureIsland = data.filter((el:ContentsCalendar) => el.CategoryName === '모험 섬');
  
  const sortedData:OrganizeAdventureIslandList = {};

  adventureIsland.forEach((item:ContentsCalendar) => {
    // console.log('item ', item);
    // 모험 섬 중 출현을 안하는 경우도 있음
    if(item.StartTimes !== null) {

      item.StartTimes.forEach((startTime:string) => {
        const dateKey = startTime.substring(0, 10);
        if (!sortedData[dateKey]) {
          sortedData[dateKey] = [];
        }

        // 중복 데이터 여부 확인
        const isDuplicate = sortedData[dateKey].some((dataItem:OrganizeContentsCalendar) => dataItem.ContentsName === item.ContentsName);

        if (!isDuplicate) {
          let RewardItemType = '실링';


          const sortedReward:OrganizeRewardItem[] = [];

          item.RewardItems.forEach((reward:RewardItem) => {
            if (reward.StartTimes !== null) {
              reward.StartTimes.forEach((time:string) => {
                if(time.substring(0, 10) === dateKey) {
                  if (reward.Name === '골드') {
                    RewardItemType = '골드';
                  } else if (reward.Name === '대양의 주화 상자') {
                    RewardItemType = '주화';
                  } else if (reward.Name === '영혼의 잎사귀') {
                    RewardItemType = '카드';
                  }

                  // 보상 아이템 중복 데이터 여부 확인
                  const isRewardDuplicate = sortedReward.some((dataItem: OrganizeRewardItem) => dataItem.Name === reward.Name);
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

          item.RewardItems.forEach((reward:RewardItem) => {
            if (reward.StartTimes === null) {
              sortedReward.push({
                Name: reward.Name,
                Icon: reward.Icon,
              });
            }
          });


          if(item.StartTimes !== null) {
            const filterStartTimes = item.StartTimes.filter((time:string) => dateKey === time.substring(0, 10));

            sortedData[dateKey].push({
              ContentsName: item.ContentsName,
              ContentsIcon: item.ContentsIcon,
              RewardItemType: RewardItemType,
              StartTimes: filterStartTimes,
              RewardItems: sortedReward,
            });
          }

        }

      });
    }
  });

  return sortedData;
}


const updateCalendar = async (filterAdventureIsland:OrganizeAdventureIslandList) => {
  try {
    const adventureIslandList = await fetch('http://localhost:9999/adventureIsland');
    const updateData = await adventureIslandList.json();
    // console.log('updateData ', updateData);
    // console.log('filterAdventureIsland ', filterAdventureIsland);

    updateData.forEach((el:OrganizeAdventureIslandList) => {
      for (const date in filterAdventureIsland) {
        if (filterAdventureIsland.hasOwnProperty(date)) {
          el[date] = filterAdventureIsland[date];
        }
      }
    });

    // console.log('updateData ', updateData[0]);

    // 임시로 데이터 삭제 후 삽입 방식 사용
    await fetch('http://localhost:9999/adventureIsland/1', {
      method: 'DELETE',
    });

    await fetch('http://localhost:9999/adventureIsland', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData[0]),
    });

    console.log('Success');
    
  } catch (error) {
    console.error('Update error: ', error);
    // alert('데이터 갱신 중 에러가 발생하였습니다. 잠시 후 다시 시도 해주세요.');
  }
}

export async function GET() {
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
      const filterAdventureIsland = await calendarAdventureFilter(data);
      await updateCalendar(filterAdventureIsland);
      return new NextResponse(JSON.stringify(filterAdventureIsland), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new NextResponse('Error fetching data', { status: response.status });
    }
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('An error occurred', { status: 500 });
  }
}
