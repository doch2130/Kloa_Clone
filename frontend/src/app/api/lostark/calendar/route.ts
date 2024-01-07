
import { NextRequest, NextResponse } from "next/server"
import { ContentsCalendar, OrganizeContentsCalendar, RewardItem, OrganizeRewardItem, OrganizeAdventureIslandList } from '@/types/contentsCalendar'
import { verifyStringJwt } from "@/libs/jwt"
import path from 'path';
import fs from "fs";
import { writeFile } from "fs/promises";

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
            const filterStartTimes = item.StartTimes.filter((time: string) => dateKey === time.substring(0, 10));

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
  const sortedResult: OrganizeAdventureIslandList = {};

  sortedKeys.forEach((key) => {
    sortedResult[key] = sortedData[key];
  });

  // return sortedData;
  return sortedResult;
}

const calendarFileSave = async (filterAdventureIsland:OrganizeAdventureIslandList) => {
  try {
    // console.log('filterAdventureIsland ', filterAdventureIsland);
    const keyArray = Object.keys(filterAdventureIsland);

    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    const folderName = `${year}${month}`;

    // 현재 폴더 디렉토리 경로 가져오는 함수 (frontend 폴더)
    // console.log('process.cwd() ',process.cwd());
    const filePath = path.join(process.cwd(), `/src/assets/Schedule/${folderName}`);

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }

    for (let i = 0; i < keyArray.length; i++) {
      const fileData = filterAdventureIsland[keyArray[i]];
      const fileName = `${filePath}/${keyArray[i]}.json`

     await writeFile(fileName, JSON.stringify(fileData, null, 2), 'utf-8');
    }

    console.log('Success');
    return true;
    
  } catch (error) {
    console.error('Update error: ', error);
    return false;
    // alert('데이터 갱신 중 에러가 발생하였습니다. 잠시 후 다시 시도 해주세요.');
  }
}


export async function GET(req: NextRequest) {
  // 로스트아크 API 캘린더 데이터 가져오기
  const url = 'https://developer-lostark.game.onstove.com/gamecontents/calendar';

  const accessToken = req.headers.get('Authorization');
  // console.log('accessToken ', accessToken);

  if(accessToken === null) {
    return NextResponse.json({ redirect: true, status: 401 });
    // return new NextResponse(JSON.stringify({redirect: true, status: 401}));
  }

  if(!(await verifyStringJwt(accessToken?.slice(7)))) {
    // 인증 만료, 로그인 재요청
    req.cookies.delete("next-auth.session-token");
    return NextResponse.json({ redirect: true, status: 401 });
    // return new NextResponse(JSON.stringify({redirect: true, status: 401}));
  }

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
      const saveAdventureIsland = await calendarFileSave(filterAdventureIsland);

      if(saveAdventureIsland) {
        return NextResponse.json({ message: 'Calendar Update Success', status: 200 });
        // return new NextResponse(JSON.stringify({message: 'Calendar Update Success', status: 200}));
      } else {
        return NextResponse.json({ message: 'Calendar Update error', status: 500 });
        // return new NextResponse(JSON.stringify({message: 'Calendar Update error', status: 500}));
      }
    } else {
      return NextResponse.json({ message: 'Calendar Update error', status: response.status });
      // return new NextResponse(JSON.stringify({message: 'Calendar Update error', status: response.status}));
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Calendar Update error', status: 500 });
    // return new NextResponse(JSON.stringify({message: 'Calendar Update error', status: 500}));
  }
}
