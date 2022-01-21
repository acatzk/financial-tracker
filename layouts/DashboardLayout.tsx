import DefaultLayout from 'layouts/DefaultLayout'
import React from 'react'
import Header from 'components/Header'
import { navigation, user, userNavigation } from 'mock/list'
import { classNames } from 'utils'
import { dashboardLink } from 'mock/list'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface DashboardLayoutProps {
  children: React.ReactNode
  metaHead?: string
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, metaHead }) => {
  const router = useRouter()

  return (
    <DefaultLayout metaHead={metaHead}>
      <Header user={user} navigation={navigation} userNavigation={userNavigation} />

      <header className="bg-white shadow">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-4 px-4 sm:px-4 lg:px-8">
          <nav>
            <ul className="flex items-center space-x-6">
              {dashboardLink.map(({ name, href }, i) => (
                <li key={i}>
                  <Link href={`/dashboard/${href}`}>
                    <a
                      className={classNames(
                        'font-medium pb-6',
                        'hover:text-gray-800 border-b-2 transition ease-in-out duration-150',
                        router.pathname === `/dashboard/${href}`
                          ? 'text-gray-800  border-gray-500'
                          : 'text-gray-600 border-transparent'
                      )}>
                      {name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center space-x-2">
            <button
              className={classNames(
                'flex items-center space-x-1 bg-green-500 py-2 px-2 rounded text-white font-semibold text-sm',
                'hover:bg-green-600 active:bg-green-500',
                'transition ease-in-out duration-200'
              )}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Income</span>
            </button>
            <button
              className={classNames(
                'flex items-center space-x-1 bg-red-500 py-2 px-2 rounded text-white font-semibold text-sm',
                'hover:bg-red-600 active:bg-red-500',
                'transition ease-in-out duration-200'
              )}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Expense</span>
            </button>
          </div>
        </div>
      </header>
      {children}
    </DefaultLayout>
  )
}

export default DashboardLayout
