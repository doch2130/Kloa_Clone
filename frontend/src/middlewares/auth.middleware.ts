import { NextRequest, NextResponse } from "next/server"
import { verifyJwt } from "@/app/lib/jwt"

// 로그인 안 한 상태에서만 접속 가능 리스트
// 비밀번호 찾기 페이지 추가 필요
export const withOutAuthList = [
  '/auth/login', '/auth/signup'
];

// 로그인 한 상태에서만 접속 가능 리스트
export const withAuthList = [
  '/notices/write', '/notices/update/:path*', '/manager'
];


export async function withAuth(req: NextRequest, token: string) {
  try {
    // const token = req.cookies.get('next-auth.session-token');
    // console.log('withAuth ', token);

    const url = req.nextUrl.clone()
    url.pathname = '/auth/login';

    // if(token !== undefined && verifyJwt(token.value)) {
    if(token !== undefined && verifyJwt(token.slice(7))) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(url);
    }

  } catch (error) {
    console.log('err: ', error);
    throw new Error(`Couldn't check authentication`);
  }
}

export async function withOutAuth(req: NextRequest, token: string) {
  try {
    const url = req.nextUrl.clone()
    url.pathname = '/';

    // if(token !== undefined && verifyJwt(token.value)) {
    if(token !== undefined && verifyJwt(token.slice(7))) {
      return NextResponse.redirect(url);
    } else {
      return NextResponse.next();
    }

  } catch (error) {
    console.log('err: ', error);
    throw new Error(`Couldn't check authentication`);
  }
}
