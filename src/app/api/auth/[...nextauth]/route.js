import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { connectDB } from '@/utils/database'
import { CredentialsProvider } from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import User from '@/models/user'

// const prisma = new PrismaClient()

export const authOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    // CredentialsProvider({
    //   name: 'credentials',
    //   credentials: {
    //     username: {
    //       label: 'Username',
    //       type: 'text',
    //       placeholder: 'type your name',
    //     },
    //     password: {
    //       label: 'Password',
    //       type: 'password',
    //     },
    //   },
    //   async authorize(credentials) {

    //   }
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  // session: {
  //   strategy: 'jwt',
  // },
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email })

      session.user.id = sessionUser._id

      return session
    },
    async signIn({ profile }) {
      try {
        await connectDB()

        const userExist = await User.findOne({ email: profile.email })

        if (!userExist) {
          await User.create({
            email: profile.email,
            name: profile.name,
            image: profile.picture,
          })
        }

        return true
      } catch (error) {
        console.log(error)

        return false
      }
    },
  },
  secret: process.env.SECRET,
  // debug: process.env.NODE_ENV === 'development'
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
