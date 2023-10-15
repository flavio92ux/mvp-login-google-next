import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { connectDB } from '@/utils/database'
import User from '@/models/user'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email })

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
            image: profile.picture
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
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
