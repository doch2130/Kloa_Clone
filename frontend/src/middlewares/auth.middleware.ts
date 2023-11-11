import { NextRequest, NextResponse } from "next/server"
import { JWT } from "next-auth/jwt"
import { verifyJwt } from "@/app/lib/jwt"

// 로그인 안 한 상태에서만 접속 가능 리스트
// 비밀번호 찾기 페이지 추가 필요
export const withOutAuthList = [
  '/auth/login', '/auth/signup'
];

// 로그인 한 상태에서만 접속 가능 리스트
export const withAuthList = [
  '/notices/write', '/notices/update/:path*'
];

export const withManagerList = [
  '/manager'
]

export const authList = [...withAuthList, ...withOutAuthList, ...withManagerList];


export async function withAuth(req: NextRequest, token: JWT | null):Promise<Response> {
  try {
    const url = req.nextUrl.clone()
    url.pathname = '/auth/login';

    if(token !== null && (await verifyJwt(token))) {
      return NextResponse.next();
    } else {
      req.cookies.delete("next-auth.session-token");
      return NextResponse.redirect(url);
    }

  } catch (error) {
    console.log('withAuth에서 에러 발생:', error);
    return NextResponse.error();
  }
}


export async function withManagerAuth(req: NextRequest, token: JWT | null):Promise<Response> {
  try {
    const url = req.nextUrl.clone()
    url.pathname = '/auth/login';

    if(token !== null) {
      const payload = await verifyJwt(token);
      if(payload) {
        if(payload.email === 'test1') {
          return NextResponse.next();
        } else {
          url.pathname = '/';
          return NextResponse.redirect(url);
        }
      } else {
        req.cookies.delete("next-auth.session-token");
        return NextResponse.redirect(url);
      }
    } else {
      req.cookies.delete("next-auth.session-token");
      return NextResponse.redirect(url);
    }

  } catch (error) {
    console.log('withAuth에서 에러 발생:', error);
    return NextResponse.error();
  }
}




export async function withOutAuth(req: NextRequest, token: JWT | null):Promise<Response> {
  try {
    const url = req.nextUrl.clone()
    url.pathname = '/';

    if(token !== null && (await verifyJwt(token))) {
      return NextResponse.redirect(url);
    } else {
      req.cookies.delete("next-auth.session-token");
      return NextResponse.next();
    }

  } catch (error) {
    console.log('withOutAuth에서 에러 발생:', error);
    return NextResponse.error();
  }
}
