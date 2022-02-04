import DefaultLayout from 'layouts/DefaultLayout'
import React, { useEffect, useState } from 'react'
import Header from 'components/Header'
import { navigation, user, userNavigation } from 'mock/list'
import { classNames, PlusIcon } from 'utils'
import { dashboardLink } from 'mock/list'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ExpenseDialog from 'components/ExpenseDialog'
import { v4 as uuidv4 } from 'uuid'
import { useSession } from 'next-auth/react'
import IncomeDialog from 'components/IncomeDialog'
import { toast } from 'react-toastify'
import { hasuraAdminClient } from 'lib/hasura-admin-client'
import { GET_ALL_INCOME_BY_USER_ID_QUERY } from 'graphql/queries'
import useSWR from 'swr'
import {
  CREATE_EXPENSES_MUTATION,
  ADD_TOTAL_INCOME_MUTATION,
  UPDATE_TOTAL_INCOME_MUTATION,
  CREATE_INCOME_MUTATION
} from 'graphql/mutations'
import { GET_AGGREGATE_TOTAL_INCOME_SUM_QUERY } from 'graphql/queries'

interface DashboardLayoutProps {
  children: React.ReactNode
  metaHead?: string
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, metaHead }) => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  const [openIncome, setOpenIncome] = useState(false)
  const [openExpense, setOpenExpense] = useState(false)
  const [expenses, setExpenses] = useState([
    {
      id: uuidv4(),
      name: '',
      price: 0.0
    }
  ])
  const [totalExpense, setTotalExpense] = useState(0.0)
  const [newBalance, setNewBalance] = useState(0.0)
  const [balance, setBalance] = useState(0.0)
  const user_id = session?.id

  // Check if user is authenticated
  useEffect(() => {
    if (!session) router.push('/')
  }, [session])

  const { data, mutate } = useSWR(
    [GET_AGGREGATE_TOTAL_INCOME_SUM_QUERY, user_id],
    (query, user_id) => hasuraAdminClient.request(query, { user_id }),
    { revalidateOnMount: true }
  )

  // Auto update the new balance and expenses
  useEffect(() => {
    let sumExpense = 0.0
    let newBalance = 0.0

    // Set the balance to the aggregated total income
    setBalance(data?.total_income_aggregate?.aggregate?.sum?.sum)

    expenses.map(({ price }) => {
      return (sumExpense += parseFloat(price.toString()))
    })

    newBalance = balance - sumExpense

    setTotalExpense(sumExpense)
    setNewBalance(newBalance)
  })

  // Check if the expenses insufficient or invalid
  useEffect(() => {
    if (newBalance < 0) {
      toast.error('Insufficient Income to cover the expense', {
        position: toast.POSITION.TOP_CENTER
      })
    }

    expenses.map(({ price }) => {
      if (parseFloat(price.toString()) < 0) {
        toast.error('Invalid expense cost!', {
          position: toast.POSITION.TOP_CENTER
        })
      }
    })
  }, [newBalance])

  // Add dynamic expenses field
  const handleAddExpenseFields = () => {
    setExpenses([...expenses, { id: uuidv4(), name: '', price: 0.0 }])
  }

  // Remove the dynamic expenses field
  const handleRemoveExpenseFields = (id) => {
    const values = [...expenses]
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    )
    setExpenses(values)
  }

  // Input handling input changes from states
  const handleChangeInput = (id, event) => {
    const newInputFields = expenses.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i
    })

    setExpenses(newInputFields)
  }

  // Handle submission in expenses inputted
  const handleExpenseSubmit = async ({ date }, e) => {
    try {
      // Check if the new balance less than 0
      if (newBalance < 0) {
        return toast.error('Insufficient Income to cover the expense', {
          position: toast.POSITION.TOP_CENTER
        })
      }

      // Insert all the expenses inputted
      await expenses.map(async ({ name, price }) => {
        return await hasuraAdminClient.request(CREATE_EXPENSES_MUTATION, {
          user_id: session?.id,
          date: date,
          prev_balance: balance,
          name: name,
          cost: price
        })
      })

      // Update total income minus the total expenses
      await hasuraAdminClient.request(UPDATE_TOTAL_INCOME_MUTATION, {
        user_id: session?.id,
        income: newBalance
      })

      mutate()
      toast.success(`Added total expense of ₱${totalExpense}!`)
      e.target.reset()
      setOpenExpense(false)
    } catch (err) {
      toast.error(`${err}`)
    }
  }

  // Submit the inputed income
  const handleIncomeSubmit = async ({ income, amount, date_earned }, e) => {
    try {
      if (amount < 0) {
        return toast.error('Invalid amount!', {
          position: toast.POSITION.TOP_CENTER
        })
      }

      // Check total income from current user_id
      const { total_income_aggregate } = await hasuraAdminClient.request(
        GET_AGGREGATE_TOTAL_INCOME_SUM_QUERY,
        {
          user_id: session?.id
        }
      )

      // Extract the aggregated sum
      const {
        aggregate: {
          sum: { sum }
        }
      } = total_income_aggregate

      // Check if the user already inserted the income
      if (!sum) {
        // Insert total income
        await hasuraAdminClient.request(ADD_TOTAL_INCOME_MUTATION, {
          user_id: session?.id,
          sum: parseFloat(amount.toString())
        })
      } else {
        // Update total income
        await hasuraAdminClient.request(UPDATE_TOTAL_INCOME_MUTATION, {
          user_id: session?.id,
          income: parseFloat(sum.toString()) + parseFloat(amount.toString())
        })
      }

      await hasuraAdminClient.request(CREATE_INCOME_MUTATION, {
        user_id: session?.id,
        income_from: income,
        amount: parseFloat(amount.toString()),
        date_earned: date_earned
      })

      mutate()
      toast.success(`Added ₱${amount} ${income.trim().replace(/^\w/, (c) => c.toUpperCase())}!`)
      e.target.reset()
      setOpenIncome(false)
    } catch (err) {
      toast.error(`${err}`)
    }
  }

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  return (
    <DefaultLayout metaHead={metaHead}>
      <Header
        user={user}
        navigation={navigation}
        userNavigation={userNavigation}
        total_income={balance ? balance : 0}
      />

      <header className="bg-white shadow">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-2 px-2 md:px-4 md:py-4 lg:px-8">
          <DashboardSubLinks dashboardLink={dashboardLink} />
          <div className="flex items-center space-x-2">
            <div>
              <IncomeDialog
                open={openIncome}
                setOpen={setOpenIncome}
                onSubmit={handleIncomeSubmit}
              />
              <button
                onClick={() => setOpenIncome(true)}
                className={classNames(
                  'flex items-center space-x-1 bg-green-500 py-2 px-2',
                  'rounded text-white font-semibold text-sm',
                  'hover:bg-green-600 active:bg-green-500',
                  'transition ease-in-out duration-200'
                )}>
                <PlusIcon className="w-5 h-5" />
                <span className="hidden md:block">Income</span>
              </button>
            </div>
            <div>
              <ExpenseDialog
                open={openExpense}
                setOpen={setOpenExpense}
                expenses={expenses}
                setExpenses={setExpenses}
                handleAddExpenseFields={handleAddExpenseFields}
                handleRemoveExpenseFields={handleRemoveExpenseFields}
                handleChangeInput={handleChangeInput}
                onSubmit={handleExpenseSubmit}
                totalExpense={totalExpense}
                newBalance={newBalance}
                balance={balance ? balance : 0}
              />
              <button
                onClick={() => setOpenExpense(true)}
                className={classNames(
                  'flex items-center space-x-1 bg-red-500 py-2 px-2 rounded text-white font-semibold text-sm',
                  'hover:bg-red-600 active:bg-red-500',
                  'transition ease-in-out duration-200'
                )}>
                <PlusIcon className="w-5 h-5" />
                <span className="hidden md:block">Expense</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      {children}
    </DefaultLayout>
  )
}

function DashboardSubLinks({ dashboardLink }) {
  const router = useRouter()
  return (
    <nav>
      <ul className="flex items-center space-x-4 md:space-x-6">
        {dashboardLink.map(({ name, href }, i) => (
          <li key={i}>
            <Link href={`/dashboard/${href}`}>
              <a
                className={classNames(
                  'font-medium pb-4 md:pb-6',
                  'hover:text-gray-800 border-b-2',
                  'transition ease-in-out duration-150',
                  'text-sm md:text-base',
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
  )
}

export default DashboardLayout
