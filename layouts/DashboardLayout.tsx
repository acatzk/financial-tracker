import DefaultLayout from 'layouts/DefaultLayout'
import React from 'react'
import Header from 'components/Header'
import { navigation, user, userNavigation } from 'mock/list'
import { classNames } from 'utils'
import { dashboardLink } from 'mock/list'

interface DashboardLayoutProps {
  children: React.ReactNode
  metaHead?: string
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, metaHead }) => {
  return (
    <DefaultLayout metaHead={metaHead}>
      <Header user={user} navigation={navigation} userNavigation={userNavigation} />

      <header className="bg-white shadow">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-4 px-4 sm:px-4 lg:px-8">
          <nav>
            <ul className="flex items-center space-x-6">
              {dashboardLink.map(({ name, href }, i) => (
                <li key={i}>
                  <a
                    href={`/dashboard/${href}`}
                    className={classNames(
                      'font-medium pb-6 text-gray-600',
                      'hover:text-gray-800 transition ease-in-out duration-150',
                      name === 'Overview' && 'text-gray-800  border-b-2 border-gray-500'
                    )}>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            className={classNames(
              'flex items-center space-x-1 bg-green-500 py-2 px-3 rounded text-white font-semibold text-sm',
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
            <span>Add Expense</span>
          </button>
        </div>
      </header>
      {children}
    </DefaultLayout>
  )
}

export default DashboardLayout
