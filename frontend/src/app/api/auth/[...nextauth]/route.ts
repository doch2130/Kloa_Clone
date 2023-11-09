import NextAuth from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import CredentialsProvider from "next-auth/providers/credentials";

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

        const response = await fetch(`http://localhost:9999/users?id=${body?.email}&pwd=${body?.pwd}`, {
          method: 'GET',
        });
        const result = await response.json();
        // console.log('result ', result);

        if (result.length > 0) {
          const user = { id: result.no, email: result.email };
          return user;
        } else {
          return null;
        }
      }
    })
  ],
});

export { handler as GET, handler as POST };
