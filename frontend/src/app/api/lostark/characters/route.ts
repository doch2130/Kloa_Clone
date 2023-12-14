// import { NextRequest, NextResponse } from "next/server";
// import prisma from '@/app/lib/prisma'
// import { verifyStringJwt } from "@/app/lib/jwt";
// import { NoticesApiResp } from "@/type/notice";

// async function noticesListUpdate(data:NoticesApiResp[]) {
//   // console.log('data ', data)
//   try {
//     const topNoticesFive = data.slice(0, 5);

//     for (let i = 4; i >= 0; i--) {
//       if(!topNoticesFive[i].Title) {
//         continue;
//       }
//       const isNoticeDuplicate = await prisma.notices.findMany({
//         where: {
//          title: topNoticesFive[i].Title
//         }
//       });

//       if(isNoticeDuplicate.length > 0) {
//         continue;
//       }

//       await prisma.notices.create({
//         data: {
//           title: topNoticesFive[i].Title,
//           category: topNoticesFive[i].Type,
//           createdAt: new Date(topNoticesFive[i].Date),
//           link: topNoticesFive[i].Link
//         }
//       });
//     }

//     return true;

//   } catch (error) {
//     console.error('Error:', error);
//     return false;
//   }
// }


// export async function GET(req: NextRequest) {
//   // 로스트아크 API 공지사항 데이터 가져오기
//   const url = 'https://developer-lostark.game.onstove.com/news/notices';

//   const accessToken = req.headers.get('Authorization');
//   // console.log('accessToken ', accessToken);

//   if(accessToken === null) {
//     return NextResponse.json({ redirect: true, status: 401 });
//     // return new NextResponse(JSON.stringify({redirect: true, status: 401}));
//   }

//   if(!(await verifyStringJwt(accessToken?.slice(7)))) {
//     // 인증 만료, 로그인 재요청
//     req.cookies.delete("next-auth.session-token");
//     return NextResponse.json({ redirect: true, status: 401 });
//     // return new NextResponse(JSON.stringify({redirect: true, status: 401}));
//   }

//   try {
//     const response = await fetch(url, {
//       method: 'GET',
//       cache: 'no-cache',
//       headers: {
//         'accept': 'application/json',
//         'authorization': `bearer ${process.env.NEXT_PUBLIC_LOSTARK_API}`
//       },
//     });
    
//     if (response.ok) {
//       const data = await response.json();
//       // console.log('data ', data);

//       const result = await noticesListUpdate(data);

//       if(result) {
//         return NextResponse.json({ message: 'Notices Update Success', status: 200 });
//         // return new NextResponse(JSON.stringify({message: 'Notices Update Success', status: 200}));
//       } else {
//         return NextResponse.json({ message: 'Notices Update error', status: 500 });
//         // return new NextResponse(JSON.stringify({message: 'Notices Update error', status: 500}));
//       }
//     } else {
//       return NextResponse.json({ message: 'Notices Update error', status: response.status });
//       // return new NextResponse(JSON.stringify({message: 'Notices Update error', status: response.status}));
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json({ message: 'Notices Update error', status: 500 });
//     // return new NextResponse(JSON.stringify({message: 'Notices Update error', status: 500}));
//   }
// }
