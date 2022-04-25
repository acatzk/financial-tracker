import { NextPage } from 'next'
import React from 'react'
import DashboardLayout from 'layouts/DashboardLayout'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { classNames } from 'utils'
import { GET_USER_INCOME_QUERY } from 'graphql/queries'
import useSWR from 'swr'
import { hasuraAdminClient } from 'lib/hasura-admin-client'
import { useSession, getSession } from 'next-auth/react'

// export const getStaticProps = async () => {
//   const { data: session } = useSession()

//   const initialData = await hasuraAdminClient.request(GET_USER_INCOME_QUERY, {
//     user_id: session?.id
//   })

//   return {
//     props: {
//       initialData
//     }
//   }
// }

type IncomeProps = {
  initialData: any
}

const Income: NextPage<IncomeProps> = () => {
  const { data: session } = useSession()
  const user_id = session?.id

  const { data, mutate } = useSWR(
    [GET_USER_INCOME_QUERY, user_id],
    (query, user_id) => hasuraAdminClient.request(query, { user_id }),
    { revalidateOnMount: true }
  )

  const income = [
    {
      date_from: '2022-02-08',
      income: 'Work',
      amount: 3000
    },
    {
      date_from: '2022-02-08',
      income: 'Donation',
      amount: 150
    },
    {
      date_from: '2022-02-08',
      income: 'Gift',
      amount: 321
    }
  ]

  return (
    <DashboardLayout metaHead="Income Records">
      <main>
        <div className="py-4 md:py-8 border-b">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <h1 className="text-lg md:text-2xl font-semibold">Income Records</h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col mt-4">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b border-gray-200 space-y-2">
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={classNames(
                            'flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-black',
                            'bg-gray-50 hover:bg-indigo-100 focus:outline-none',
                            'transition ease-in-out duration-150',
                            'focus-visible:ring focus-visible:ring-gray-50 focus-visible:ring-opacity-75'
                          )}>
                          <span
                            className={classNames(
                              'font-semibold',
                              open ? 'text-indigo-700' : 'text-black'
                            )}>
                            February 9, 2022
                          </span>
                          <ChevronUpIcon
                            className={`${
                              open
                                ? 'transform -rotate-180 transition ease-in-out duration-150'
                                : ''
                            } w-5 h-5 text-black transition ease-in-out duration-150`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">
                                  Income From
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">
                                  Amount
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">
                                  Edit
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">
                                  Delete
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {income.map(({ income, amount }, i) => (
                                <tr key={i}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs">{income}</span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {amount}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                      Edit
                                    </a>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                      Delete
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="mt-6">
                            <h2 className="ml-2 font-medium">Total Amount: P3471</h2>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  )
}

export default Income
