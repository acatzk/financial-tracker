import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Loading } from 'utils'
import Head from 'next/head'

const Dashboard: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.pathname === '/dashboard' ? router.push('/dashboard/overview') : ''
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Financial Tracker</title>
      </Head>
      <div className="h-screen flex items-center justify-center bg-white">
        <Loading className="w-10 h-10 text-black" />
      </div>
    </React.Fragment>
  )
}

export default Dashboard
