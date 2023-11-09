import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  // console.log('body ', body);
  try {
    const response = await fetch(`http://localhost:9999/mainNotices?id=${body.postId}`);
    const data = await response.json();

    // console.log('data ', data);

    if (data.length > 0) {
      const updateRecomendCount = data[0].recomendCount + 1;
      const existingDataId = data[0].id;
      const patchResponse = await fetch(`http://localhost:9999/mainNotices/${existingDataId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recomendCount: updateRecomendCount
        })
      });

      // console.log('patchResponse.status ', patchResponse.status);
      if (patchResponse.status === 200) {
        return new NextResponse(JSON.stringify({ success: true, status: 200, recomendCount: updateRecomendCount }));
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