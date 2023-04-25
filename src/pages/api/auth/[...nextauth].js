import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

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
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        const keyResponse = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        try {
          return await keyResponse.json()
        } catch (ignored) {
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
      const user = await getUserFromKey(token)
      session.user = user
      return session
    },
    async jwt({token, user, account, profile}) {
      if (user) {
        return user;
      }

      return token;
    },
  }
})


async function getUserFromKey({ key }) {
  const url = "http://localhost:8080/api/user/get?key=" + key + "&baseId=1"
  const getResponse = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    const user = await getResponse.json()
    return {
      id: user.id,
      key: key,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
    }
  } catch (ignored) {
    return null
  }
}