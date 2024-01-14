import NextAuth from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'

const handler = NextAuth({
  providers: [
    TwitterProvider({
      clientId: 'kvGGQH11NdwCPN3CZbF6Jjt3u',
      clientSecret: '9PAVbr6YUujhDA4ZMxQV7afHxWNcwxgAfHVgxD9dXlYal8LeaC',
    }),
  ],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token['user'] = {
          followersCount: profile.followers_count,
          screenName: profile.screen_name,
          id: profile.id,
        }
      }

      return token
    },
    async session({ session, token, user }) {
      const data = {
        name: token.name,
        email: token.email,
        picture: token.picture,
        screenName: token.user.screenName,
        id: token.user.id,
      }

      return data
    },
  },
})

export { handler as GET, handler as POST }
