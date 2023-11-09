import NextAuth from "next-auth"
import NaverProvider from "next-auth/providers/naver"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from '@/app/lib/prisma'
import * as bcrypt from 'bcrypt'

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
          const user = { id: String(findUser.id), email: findUser.email };
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    // async session({ session, token, user }) {
    //   // Send properties to the client, like an access_token from a provider.
    //   session.accessToken = token.accessToken
      
    //   return session
    // }
  }
});

export { handler as GET, handler as POST };
