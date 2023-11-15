import NextAuth from "next-auth"
import NaverProvider from "next-auth/providers/naver"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from '@/app/lib/prisma'
import * as bcrypt from 'bcrypt'
import { signJwtAccessToken } from "@/app/lib/jwt"

const handler = NextAuth({
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    }),

    CredentialsProvider({
      credentials: {}, // 빈 객체로 설정
      async authorize(credentials, req) {
        const body = req.body;
        // console.log('body ', body);

        const findUser = await prisma.user.findFirst({
          where: {
            email: body?.email
          }
        });

        // 아이디만 찾아오고 비밀번호는 여기서 검증
        // id는 string으로 해야 authorize 함수 에러가 안남
        if (findUser && (await bcrypt.compare(body?.password, findUser.password))) {
          const user = { id: String(findUser.id), email: findUser.email, role: findUser.role };

          // JWT 토큰
          const accessToken = await signJwtAccessToken(user);
          // console.log('accessToken ', accessToken);
          const result = {
            id: String(findUser.id),
            email: findUser.email,
            role: findUser.role,
            // accessToken: `bearer ${accessToken}`,
            accessToken: accessToken,
          };

          return result;
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // 소셜 로그인의 경우 token.accessToken이 별도로 생성이 되지 않아서 조건문으로 데이터 추가
      if(token && token.accessToken === undefined && user !== undefined) {
        const accessToken = await signJwtAccessToken({id: user.id, email: user.email});
        token.accessToken = accessToken;
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
    async redirect({url, baseUrl}) {
      if(process.env.NODE_ENV === 'production') {
        // console.log('prod callback');
        baseUrl = `${process.env.PRODUCTION_NEXTAUTH_URL}`;
      } else {
        // console.log('dev callback');
        baseUrl = `${process.env.NEXTAUTH_URL}`;
      }
      return baseUrl; // 콜백 완료 후 리다이렉션될 URL
    },
  },
  // pages: {
  //   // 미들웨어 별도 함수 설정 안한 경우 사용
  //   // 미들웨어 로그인 안한 페이지 접근 시 로그인 하게 해당 페이지로 이동이 됨
  //   signIn: "/auth/login",
  // },
});

export { handler as GET, handler as POST };
