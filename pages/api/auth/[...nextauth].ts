import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import jwt from 'jsonwebtoken'

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: `${process.env.FACEBOOK_ID}`,
      clientSecret: `${process.env.FACEBOOK_SECRET}`
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`
    })
  ],
  secret: process.env.SECRET,

  session: {
    strategy: 'jwt'
  },

  jwt: {
    secret: process.env.SECRET,

    // encode: async ({ secret, token, maxAge }) => {
    //   const jwtClaims = {
    //     "sub": token?.id.toString(),
    //     "name": token?.name ,
    //     "email": token?.email,
    //     "iat": Date.now() / 1000,
    //     "exp": Math.floor(Date.now() / 1000) + (24*60*60),
    //     "https://hasura.io/jwt/claims": {
    //       "x-hasura-allowed-roles": ["user"],
    //       "x-hasura-default-role": "user",
    //       "x-hasura-role": "user",
    //       "x-hasura-user-id": token?.id,
    //     }
    //   };
    //   const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: 'HS256'});
    //   return encodedToken;
    // },

    // decode: async ({ secret, token, maxAge }) => {
    //   const decodedToken = jwt.verify(token, secret, { algorithms: ['HS256']});
    //   return decodedToken;
    // },
  },

  pages: {
    // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) { return true },
    // async redirect({ url, baseUrl }) { return baseUrl },
    async session({ session, token, user }) { 
      const encodedToken = jwt.sign(token, `${process.env.SECRET}`, { algorithm: 'HS256'})
      session.id = token.id
      session.token = encodedToken
      return Promise.resolve(session) 
    },
    
    async jwt({ token, user, account, profile }) { 
      const userSignedIn = user ? true : false
      if (userSignedIn) {
        token.id = user?.id.toString()
      }
      return Promise.resolve(token) 
    }
  },

  events: {},

  debug: false
})
