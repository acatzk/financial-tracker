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
      <div className="h-screen flex items-center justify-center bg-[#0F0F0F]">
        <Loading className="w-10 h-10 text-white" />
      </div>
    </React.Fragment>
  )
}

export default Dashboard
