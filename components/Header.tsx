import React, { useEffect, useState } from 'react'
import { classNames } from 'utils'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { GetStaticProps } from 'next'
import { hasuraAdminClient } from 'lib/hasura-admin-client'
import { GET_ALL_INCOME_BY_USER_ID_QUERY } from 'graphql/queries'
import useSWR from 'swr'

interface HeaderProps {
  user: any
  navigation: any
  userNavigation: any
  initialIncome?: any
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: session } = useSession()

  const initialIncome = await hasuraAdminClient.request(GET_ALL_INCOME_BY_USER_ID_QUERY, {
    user_id: session?.id
  })

  return {
    props: {
      initialIncome
    },
    revalidate: 1
  }
}

const Header: React.FC<HeaderProps> = ({ navigation, userNavigation }) => {
  const { data: session } = useSession()
  const [balance, setBalance] = useState(0.0)
  const user_id = session?.id

  const { data, mutate } = useSWR(
    [GET_ALL_INCOME_BY_USER_ID_QUERY, user_id],
    (query, user_id) => hasuraAdminClient.request(query, { user_id }),
    { revalidateOnMount: true }
  )

  useEffect(() => {
    mutate()
    getUpdateBalance()
  })

  function getUpdateBalance() {
    let total = 0.0
    data?.income.map(({ amount }) => {
      total += amount
    })
    setBalance(total)
  }

  return (
    <Disclosure as="nav" className="bg-indigo-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex items-center space-x-3 flex-shrink-0">
                  <Image
                    width={32}
                    height={32}
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                    layout="intrinsic"
                  />
                  <h3 className="block md:hidden text-white font-medium py-1 px-2 rounded text-sm">
                    Balance: <span className="font-semibold">₱{balance}</span>
                  </h3>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-indigo-900 text-white'
                            : 'text-gray-300 hover:bg-indigo-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}>
                        {item.name}
                      </a>
                    ))}
                    <h3 className="text-white text-sm bg-indigo-600 py-1 px-2 rounded shadow">
                      Balance: <span className="font-semibold">₱{balance}</span>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="max-w-xs bg-indigo-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <UserAvatar user={session?.user} />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                onClick={() => item.name === 'Sign out' && signOut()}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}>
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-indigo-800 inline-flex items-center justify-center p-2 rounded-md text-indigo-400 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-indigo-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}>
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-indigo-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <UserAvatar user={session?.user} />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {session?.user?.name}
                  </div>
                  <div className="text-sm font-medium leading-none text-indigo-400">
                    {session?.user?.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    onClick={() => item.name === 'Sign out' && signOut()}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-indigo-700">
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

function UserAvatar({ user }) {
  return (
    <Image
      src={
        user
          ? user?.image
          : 'https://th.bing.com/th/id/OIP.VU9SCHlocbhk9w84KYbmvgHaEF?w=297&h=180&c=7&r=0&o=5&pid=1.7'
      }
      width={32}
      height={32}
      className="rounded-full"
      layout="intrinsic"
      quality={75}
      alt=""
    />
  )
}

export default Header
