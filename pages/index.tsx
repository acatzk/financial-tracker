import { NextPage } from 'next'
import DefaultLayout from 'layouts/DefaultLayout'
import Image from 'next/image'
import { classNames } from 'utils'
import LoginDialog from 'components/LoginDialog'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const Index: NextPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (session) router.push('/dashboard')
  }, [session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  return (
    <DefaultLayout metaHead="Sign in">
      <div className="relative bg-white overflow-hidden min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-white lg:max-w-2xl lg:w-full ">
            <main className="mt-6 sm:mt-14 md:mt-32 lg:mt-64 xl:mt-64 mx-auto max-w-7xl px-4">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block text-indigo-600 xl:inline">Financial Tracker</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Get track to your daily financial expenses and income and see the statistic for
                  the future analysis on what and how to improve your financial situation
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <LoginDialog open={open} setOpen={setOpen} />
                    <button
                      onClick={() => setOpen(true)}
                      className={classNames(
                        'w-full flex items-center justify-center px-8 py-3 border border-transparent',
                        'text-base font-medium rounded-md border-indigo-600 text-indigo-600',
                        'hover:bg-indigo-600 hover:text-white md:py-4 md:text-lg md:px-10',
                        'focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                        'transition ease-in-out duration-150 active:bg-indigo-700'
                      )}>
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="mt-4 md:mt-0 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="relative h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full">
            <Image
              src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80"
              layout="fill"
              objectFit="cover"
              alt=""
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Index
