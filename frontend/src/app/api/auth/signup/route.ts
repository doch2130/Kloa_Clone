import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  // console.log(body);

  try {
    const response = await fetch(`http://localhost:9999/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: body.email,
        pwd: body.pwd,
        privacy: body.privacy
      }),
    });

    if(response.ok) {
      const data = await response.json();
      // return new Response(JSON.stringify(data), {
      //   status: response.status,
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      return new NextResponse(JSON.stringify({ status: 200 }));

    } else {
      return new NextResponse('Error user add', { status: response.status });
    }

  } catch (error) {
    console.error('user add error: ', error);
    return new NextResponse('An error occurred', { status: 500 });
  }
}
