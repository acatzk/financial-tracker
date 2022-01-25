import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Loading } from 'utils'
import Head from 'next/head'
import { useSession } from 'next-auth/react'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  useEffect(() => {
    if (session) {
      router.push('/dashboard/overview')
    } else {
      router.push('/')
    }
  }, [session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

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
