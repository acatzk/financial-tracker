import React from 'react'
import Head from 'next/head'

interface DefaultLayoutProps {
  children: React.ReactNode
  metaHead?: string
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, metaHead }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Financial Tracker | {metaHead}</title>
      </Head>
      <div className="min-h-screen antialiase">{children}</div>
    </React.Fragment>
  )
}

export default DefaultLayout
