import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const url = 'https://developer-lostark.game.onstove.com/news/notices';

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
      return new NextResponse(JSON.stringify(data), {
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

export async function POST(req: NextRequest) {
  const body = await req.json();
  // console.log(body);

  const date = new Date();

  try {
    const response = await fetch('http://localhost:9999/mainNotices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        category: body.category,
        title: body.title,
        textData: body.textData,
        writeTime: date,
        viewCount: 0,
        likeCount: 0,
      })
    });

    if(response.ok) {
      const data = await response.json();
      return new NextResponse(JSON.stringify({message: 'Success', status: response.status}));
    } else {
      return new NextResponse('Error Write data', { status: response.status });
    }
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('An error occurred', { status: 500 });
  }
}



export async function PATCH(req: NextRequest) {
  const body = await req.json();
  // console.log('body ', body);
  try {
    const response = await fetch(`http://localhost:9999/mainNotices?id=${body.id}`);
    const data = await response.json();

    // console.log('data ', data);

    if (data.length > 0) {
      const updateViewCount = data[0].viewCount + 1;
      const existingDataId = data[0].id;
      const patchResponse = await fetch(`http://localhost:9999/mainNotices/${existingDataId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          viewCount: updateViewCount
        })
      });

      // console.log('patchResponse.status ', patchResponse.status);
      if (patchResponse.status === 200) {
        return new NextResponse(JSON.stringify({ success: true, status: 200, viewCount: updateViewCount }));
      } else {
        return new NextResponse(JSON.stringify({ success: true, status: 404 }));
      }
    } else {
      return new NextResponse(JSON.stringify({ success: true, status: 404 }));
    }
  } catch (err) {
    console.log('err', err);
    return new NextResponse(JSON.stringify({ success: false, status: 500 }));
  }
}