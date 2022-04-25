/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    HASURA_GRAPHQL_API_ENDPOINT: process.env.HASURA_GRAPHQL_API_ENDPOINT,
    HASURA_GRAPHQL_ADMIN_SECRET: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    FACEBOOK_ID: process.env.FACEBOOK_ID,
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    SECRET: process.env.SECRET,
    NEXT_PUBLIC_NHOST_BACKEND: process.env.NEXT_PUBLIC_NHOST_BACKEND
  },
  images: {
    domains: [
      'tailwindui.com',
      'images.unsplash.com',
      'media.istockphoto.com',
      'avatars.githubusercontent.com',
      'th.bing.com',
      'lh3.googleusercontent.com'
    ]
  }
}
