import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  // console.log(body);

  try {
    const usersList = await fetch(`http://localhost:9999/users?id=${body.id}&pwd=${body.pwd}`, {
      method: 'GET',
    });
    const result = await usersList.json();

    if(result.length === 0) {
      return new Response('Not Found Data', { status: 401 });
    }

    // 'Success Data'
    return new Response(JSON.stringify({ id: body.id, status: 200 }));

  } catch (error) {
    console.error('user search error: ', error);
  }
}
