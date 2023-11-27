require("dotenv").config({ path: "./config/.env" });

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

      // const result = await noticesListUpdate(data);

      if(data) {
        return { data, status: 200};
        // return new NextResponse(JSON.stringify({message: 'Notices Update Success', status: 200}));
      } else {
        return { data, status: 500};
        // return new NextResponse(JSON.stringify({message: 'Notices Update error', status: 500}));
      }
    } else {
      return { data: [], status: 500};
      // return new NextResponse(JSON.stringify({message: 'Notices Update error', status: response.status}));
    }
  } catch (error) {
    console.error('Error:', error);
    return { data: [], status: 500};
    // return new NextResponse(JSON.stringify({message: 'Notices Update error', status: 500}));
  }
}

exports.noticesListUpdate = async (data) => {
  try {
    const topNoticesFive = data.slice(0, 5);

    for (let i = 4; i >= 0; i--) {
      if(!topNoticesFive[i].Title) {
        continue;
      }
      const isNoticeDuplicate = await notices.findAll({
        where: {
         title: topNoticesFive[i].Title
        }
      });

      if(isNoticeDuplicate.length > 0) {
        continue;
      }
      
      await notices.create({
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
