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

interface DashboardLayoutProps {
  children: React.ReactNode
  metaHead?: string
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, metaHead }) => {
  const router = useRouter()

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

  // UPDATE PARTIAL EXPENSES CALCULATION
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

  // ADD DYNAMIC EXPENSE FIELDS
  const handleAddExpenseFields = () => {
    setExpenses([...expenses, { id: uuidv4(), name: '', price: 0.0 }])
  }

  // REMOVE DYNAMIC EXPENSE FIELDS
  const handleRemoveExpenseFields = (id) => {
    const values = [...expenses]
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    )
    setExpenses(values)
  }

  // INPUT FIELDS
  const handleChangeInput = (id, event) => {
    const newInputFields = expenses.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i
    })
    setExpenses(newInputFields)
  }

  // SUBMIT THE EXPENSES
  const handleExpenseSubmit = async (expenses, e) => {
    try {
      console.log(expenses)
    } catch (err) {
      console.error(err)
    }
  }

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
                        'hover:text-gray-800 border-b-2',
                        'transition ease-in-out duration-150',
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
                'flex items-center space-x-1 bg-green-500 py-2 px-2',
                'rounded text-white font-semibold text-sm',
                'hover:bg-green-600 active:bg-green-500',
                'transition ease-in-out duration-200'
              )}>
              <PlusIcon className="w-5 h-5" />
              <span>Income</span>
            </button>
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
                setTotalExpense={setTotalExpense}
                newBalance={newBalance}
                setNewBalance={setNewBalance}
              />
              <button
                onClick={() => setOpenExpense(true)}
                className={classNames(
                  'flex items-center space-x-1 bg-red-500 py-2 px-2 rounded text-white font-semibold text-sm',
                  'hover:bg-red-600 active:bg-red-500',
                  'transition ease-in-out duration-200'
                )}>
                <PlusIcon className="w-5 h-5" />
                <span>Expense</span>
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
