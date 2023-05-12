import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { login, getUser } from "@/api/api-calls"

export default NextAuth({
  providers: [
    CredentialsProvider ({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'grafbase'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        try {
          return await login(credentials.email, credentials.password)
        } catch (e) {
          return false
        }
      }
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/",
    error: "/auth/error"
  },
  callbacks: {
    async session({ session, token}) {
      try {
        session.user = await getUser(token.key, false)
        return session
      } catch (e) {
        return null
      }
    },
    async jwt({token, user, account, profile}) {
      if (user) {
        return user;
      }

      return token;
    },
  }
})