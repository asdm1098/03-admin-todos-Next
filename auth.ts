import { signInEmailPassword } from "@/auth"
import prisma from "@/lib/prima"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google, 
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        const user = await signInEmailPassword(credentials.email as string, credentials.password as string )
 
        if (!user) {
        
          throw new Error("Invalid credentials.")
        }
 
        return user
      },
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ user }) {
      // console.log(user);
      return true;
    },

    async jwt({ token, user }) {
      // console.log({token});
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email ?? 'no-email',
        },
      })

      if ( dbUser?.isActive === false ) {
        throw Error('User is not active')
      };

      token.roles = dbUser?.roles ?? ['no-roles'];
      token.id = dbUser?.id ?? 'no-uuid';

      return token;
    },

    async session({ session, token, user }) {
      // console.log({session});
      if ( session && session.user ) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }
      return session;
    }
  
  }
})