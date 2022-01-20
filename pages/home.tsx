import Layout from 'components/Layout'
import { NextPage } from 'next'
import React from 'react'
import Header from 'components/Header'

const user = {
  name: 'Joshua Galit',
  email: 'joshuaimalay@gmail.com',
  imageUrl: 'https://avatars.githubusercontent.com/u/38458781?v=4'
}
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Statistics', href: '#', current: false },
  { name: 'Financial Status', href: '#', current: false }
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' }
]

const Home: NextPage = () => {
  return (
    <Layout metaHead="Home">
      <Header user={user} navigation={navigation} userNavigation={userNavigation} />

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
          </div>
          {/* /End replace */}
        </div>
      </main>
    </Layout>
  )
}

export default Home
