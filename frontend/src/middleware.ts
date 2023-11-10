import { NextRequest } from 'next/server'
import { withOutAuthList, withAuthList, withAuth, withOutAuth } from '@/middlewares/auth.middleware'
import { getToken } from "next-auth/jwt"

import jwt, { JwtPayload } from "jsonwebtoken";

// 미들웨어 함수를 따로 지정하지 않는 경우 config에 url만 설정해서 사용하는 함수
// export { default } from 'next-auth/middleware'

export async function middleware(req: NextRequest) {
  const pathName = req.nextUrl.pathname;
  // console.log('pathName ', pathName);
  // console.log('startsWith ', pathName.startsWith('/notices/update/'));

  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  // console.log('token test ' , token);
  // console.log('token accessToken ' , token?.accessToken);
  const tokenValue: string = (token?.accessToken || '') as string;

  // 관리자, 글 작성, 수정
  // if(withAuthList.includes(pathName)) {
  if(withAuthList.includes(pathName) || pathName.startsWith('/notices/update/')) {
    console.log('manager');
    return await withAuth(req, tokenValue);
  }

  // 로그인, 회원가입
  // if(withOutAuthList.includes(pathName)) {
  if(withOutAuthList.includes(pathName)) {
    console.log('login');
    return await withOutAuth(req, tokenValue);
  }
}

// 미들웨어가 실행될 특정 pathname을 지정하면, 해당 pathname에서만 실행 가능 
export const config = {
	mathcher : [...withAuthList, ...withOutAuthList]
}
