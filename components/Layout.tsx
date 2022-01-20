import React from 'react'
import Head from 'next/head'

interface LayoutProps {
  children: React.ReactNode
  metaHead?: string
}

const Layout: React.FC<LayoutProps> = ({ children, metaHead }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Financial Tracker | {metaHead}</title>
      </Head>
      <div className="min-h-screen antialiase">{children}</div>
    </React.Fragment>
  )
}

export default Layout
