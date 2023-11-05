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
      credentials: {
        email: { label: "email", type: "text" },
      },
      async authorize(credentials, req) {
        // console.log('req ', req);
        const body = req.body;

        const user = { id: '1', email: body?.email };
        
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
});

export { handler as GET, handler as POST };
