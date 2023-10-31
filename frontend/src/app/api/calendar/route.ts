// 현재 api 방식
// src/app/api
// api/hello/example.ts

import { NextRequest } from "next/server";

async function calendarFilter(data:any) {
  let i = 0;
  let fieldBossTime = [];
  let chaosGateTime = [];
  while(true) {
    if(data[i].CategoryName === '필드보스') {
      fieldBossTime = data[i].StartTimes;
    }
    if(data[i].CategoryName === '카오스게이트') {
      chaosGateTime = data[i].StartTimes;
    }

    if(fieldBossTime.length !== 0 && chaosGateTime.length !== 0) {
      break;
    }
    i++;
  }

  // console.log('fieldBossTime ', fieldBossTime);
  // console.log('chaosGateTime ', chaosGateTime);
  return [ fieldBossTime, chaosGateTime ];
}

async function calendarAdvantureFilter(data:any) {
  // advanture는 필드보스, 카오스게이트랑 달리 여러 개의 데이터가 필요하기 때문에 따로 분리
  const advantureIsland:any = [];
  data.forEach((el:any) => {
    if(el.CategoryName === '모험 섬') {
      advantureIsland.push(el);
    }
  });
  // console.log('advantureIsland ', advantureIsland);
  // console.log('advantureIsland[0].RewardItems ', advantureIsland[0].RewardItems);

  // RewardItems 불필요한 데이터 제거
  advantureIsland.map((el:any) => {
    return (
      el.RewardItems = el.RewardItems.map((element:any) => {
        return {
          Name: element.Name,
          icon: element.Icon,
        }
      })
    )
  });
  return advantureIsland;
}




const updateCalendar = async (advantureIsland:any, fieldBossTime:any, chaosGateTime:any) => {
    try{
      const adventureIslandResult = await fetch('http://localhost:9999/adventureIsland', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(advantureIsland),
      });

      const fieldbossResult = await fetch('http://localhost:9999/fieldboss', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fieldBossTime),
      });
      const chaosgateResult = await fetch('http://localhost:9999/chaosgate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(chaosGateTime),
      });
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
      const [ fieldBossTime, chaosGateTime ] = await calendarFilter(data);
      const advantureIsland = await calendarAdvantureFilter(data);
      updateCalendar(advantureIsland, fieldBossTime, chaosGateTime);
      return new Response(JSON.stringify(data), {
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

// // export async function POST(req: Request) {
// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   console.log(req.cookies.get('cookie'));
//   console.log(body);
//   console.log(req.headers.get('Authorization'));

//   // return new Response('OK');
//   return new Response(JSON.stringify({ hello: 'world' }));
// }


