import bcrypt from 'bcrypt';
import NextAuth, { AuthOptions, User as NextAuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { pages } from '@/app/auth/config/page';

interface NextAuthUserWithStringId extends NextAuthUser {
  id: string;
}
import prisma from '@/libs/prismadb';
import { PAGES_DIR_ALIAS } from 'next/dist/lib/constants';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    //   profile(profile) {
    //     return {
    //       id: profile.id.toString(),
    //       name: profile.name || profile.login,
    //       email: profile.email,
    //       image: profile.avatar_url,
    //     } as NextAuthUserWithStringId;
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: pages,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
