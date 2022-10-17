import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type User = {
  id: string;
  username: string;
};

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.SECRET,
  },
  providers: [
    CredentialsProvider({
      name: 'Login',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (
          process.env.USERNAME === credentials?.username &&
          process.env.USERNAME === credentials?.password
        ) {
          return { username: process.env.USERNAME } as User;
        }
        return null;
      },
    }),
  ],
});
