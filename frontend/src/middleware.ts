import { NextRequest } from 'next/server'
import { withOutAuthList, withAuthList, withAuth, withOutAuth, withManagerList, withManagerAuth, authList } from '@/middlewares/auth.middleware'
import { JWT, getToken } from "next-auth/jwt"

// 미들웨어 함수를 따로 지정하지 않는 경우 config에 url만 설정해서 사용하는 함수
// export { default } from 'next-auth/middleware'

export async function middleware(req: NextRequest) {
  const pathName = req.nextUrl.pathname;
  const secret = process.env.NEXTAUTH_SECRET;
  const token:JWT | null = await getToken({ req, secret });


  // 글 작성, 수정
  // notices 부분은 나중에 관리자 부분에 합치면 됨
  if(withAuthList.includes(pathName) || pathName.startsWith('/notices/update/')) {
    // console.log('manager');
    return await withAuth(req, token);
  }

  // 관리자
  if(withManagerList.includes(pathName)) {
    // console.log('manager');
    return await withManagerAuth(req, token);
  }

  // 로그인, 회원가입
  // if(withOutAuthList.includes(pathName)) {
  if(withOutAuthList.includes(pathName)) {
    // console.log('login');
    return await withOutAuth(req, token);
  }
}

// 미들웨어가 실행될 특정 pathname을 지정하면, 해당 pathname에서만 실행 가능 
const config = {
	mathcher : authList
}

export default config;
