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
import { CREATE_INCOME_MUTATION } from 'graphql/mutations'
import { hasuraAdminClient } from 'lib/hasura-admin-client'

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

  // This will auto update the new balance and expenses
  useEffect(() => {
    let sumExpense = 0.0
    let balance = 3846
    let newBalance = 0.0

    expenses.map(({ price }) => {
      return (sumExpense += parseFloat(price.toString()))
    })

    newBalance = balance - sumExpense

    setTotalExpense(sumExpense)
    setNewBalance(newBalance)
  })

  // This will check if the expenses insufficient or invalid
  useEffect(() => {
    if (newBalance < 0) {
      toast.error('Insufficient Income to cover the expense', {
        position: toast.POSITION.TOP_CENTER
      }) // alert('Insufficient Income to cover the expense')
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

  // This will handle submission in expenses inputted
  const handleExpenseSubmit = async (expenses, e) => {
    try {
      alert(expenses)
    } catch (err) {
      alert(err)
    }
  }

  // This will submit the inputed income
  const handleIncomeSubmit = async ({ income, amount }, e) => {
    try {
      if (amount < 0) {
        toast.error('Invalid amount!', {
          position: toast.POSITION.TOP_CENTER
        })
      } else {
        await hasuraAdminClient.request(CREATE_INCOME_MUTATION, {
          user_id: session?.id,
          income_from: income,
          amount: parseFloat(amount.toString())
        })

        toast.success('Successfully Add Income!')
        e.target.reset()
        setOpenIncome(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // This will check if user is authenticated
  useEffect(() => {
    if (!session) router.push('/')
  }, [session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  return (
    <DefaultLayout metaHead={metaHead}>
      <Header user={user} navigation={navigation} userNavigation={userNavigation} />

      <header className="bg-white shadow">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-2 px-2 md:px-4 md:py-4 lg:px-8">
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

export default DashboardLayout
