import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Loading } from 'utils'
import Head from 'next/head'
import { useSession } from 'next-auth/react'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    if (session) {
      router.push('/dashboard/overview')
    } else {
      router.push('/')
    }
  }, [session])

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
