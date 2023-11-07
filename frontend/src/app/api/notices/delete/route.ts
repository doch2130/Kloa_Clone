import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  // console.log('body ', body);
  try {
    const response = await fetch(`http://localhost:9999/mainNotices?id=${body.id}`);
    const data = await response.json();

    // console.log('data ', data);

    if (data.length > 0) {
      const existingDataId = data[0].id;
      const deleteResponse = await fetch(`http://localhost:9999/mainNotices/${existingDataId}`, {
        method: 'DELETE',
      });

      // console.log('deleteResponse.status ', deleteResponse.status);
      if (deleteResponse.status === 200) {
        return new NextResponse(JSON.stringify({ success: true, status: 200 }));
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