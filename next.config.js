/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    HASURA_GRAPHQL_API_ENDPOINT: process.env.HASURA_GRAPHQL_API_ENDPOINT,
    HASURA_GRAPHQL_ADMIN_SECRET: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
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
