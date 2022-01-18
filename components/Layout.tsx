import React from 'react'
import Head from 'next/head'

interface LayoutProps {
  children: React.ReactNode
  metaHead?: string
}

const Layout: React.FC<LayoutProps> = ({ children, metaHead }) => {
  return (
    <div>
      <Head>
        <title>Financial Tracker | {metaHead}</title>
      </Head>
      {children}
    </div>
  )
}

export default Layout
