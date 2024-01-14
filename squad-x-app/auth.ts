import NextAuth from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'

export const authOptions = {
  providers: [
    TwitterProvider({
      clientId: '7PIusLd4RsBZH5yFJgWBHwb03',
      clientSecret: 'SlrWvdJ5aFZD68K5t1HEdh1WsPiSjqz6a54YEQcOQK9pUqrmdW',
      version: '2.0',
    }),
  ],
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
