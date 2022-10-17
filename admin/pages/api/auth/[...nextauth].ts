import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type User = {
  id: string;
  name: string;
};

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.SECRET,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Login',
      credentials: {
        name: { label: 'Name', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (
          process.env.USERNAME === credentials?.name &&
          process.env.PASSWORD === credentials?.password
        ) {
          return { name: process.env.USERNAME } as User;
        }
        return null;
      },
    }),
  ],
});
