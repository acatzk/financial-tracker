import React from 'react'
import Dialogs from './Dialog'
import { classNames, MinusIcon, PlusIcon, Spinner } from 'utils'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { hasuraAdminClient } from 'lib/hasura-admin-client'
import { CREATE_EXPENSES_MUTATION, UPDATE_TOTAL_INCOME_MUTATION } from 'graphql/mutations'
import { useSession } from 'next-auth/react'

interface ExpenseProps {
  open: boolean
  setOpen: any
  expenses: any
  setExpenses: any
  mutate: any
  handleAddExpenseFields: any
  handleRemoveExpenseFields: Function
  handleChangeInput: Function
  totalExpense: number
  newBalance: number
  balance: number
}

type FormValues = {
  date: string
}

const ExpenseDialog: React.FC<ExpenseProps> = ({
  open,
  setOpen,
  expenses,
  mutate,
  handleAddExpenseFields,
  handleRemoveExpenseFields,
  handleChangeInput,
  totalExpense,
  newBalance,
  balance
}) => {
  const { data: session } = useSession()

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      date: new Date().toISOString().slice(0, 10)
    }
  })

  // Handle submission in expenses inputted
  const onSubmit: SubmitHandler<FormValues> = async ({ date }, e) => {
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

      await mutate()
      e?.target.reset()
      setOpen(false)
      toast.success(`Added total expense of ₱${totalExpense}!`)
    } catch (err) {
      toast.error(`${err}`)
    }
  }

  return (
    <Dialogs open={open} setOpen={setOpen}>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white pt-6">
          <h2 className="text-center font-semibold text-xl text-gray-700">Add Today's Expenses</h2>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid gap-y-4">
                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Current Balance:
                      </label>
                      <input
                        type="text"
                        value={`₱${balance}`}
                        autoComplete="email"
                        disabled
                        className={classNames(
                          'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full',
                          'shadow-sm sm:text-sm border-gray-300 rounded-md',
                          isSubmitting ? 'disabled:opacity-50 disabled:cursor-not-allowed' : ''
                        )}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">Date:</label>
                      <input
                        type="date"
                        disabled={isSubmitting}
                        className={classNames(
                          'mt-1 block w-full',
                          'shadow-sm sm:text-sm rounded-md',
                          'disabled:opacity-50 disabled:cursor-not-allowed',
                          errors.date?.type === 'required'
                            ? 'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'ring-indigo-200 focus:ring-indigo-500 border-gray-300'
                        )}
                        {...register('date', { required: true })}
                      />
                      {errors.date?.type === 'required' && (
                        <span className="text-xs text-red-500 ml-2">Date is required</span>
                      )}
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">Expenses:</label>
                      <ExpenseForm
                        expenses={expenses}
                        handleChangeInput={handleChangeInput}
                        handleRemoveExpenseFields={handleRemoveExpenseFields}
                        handleAddExpenseFields={handleAddExpenseFields}
                        isSubmitting={isSubmitting}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Total Expenses:
                      </label>
                      <input
                        type="text"
                        disabled
                        value={`₱${totalExpense}`}
                        className={classNames(
                          'mt-1 focus:ring-indigo-500 focus:border-indigo-500',
                          'block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                          isSubmitting ? 'disabled:opacity-50 disabled:cursor-not-allowed' : ''
                        )}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">
                        New Balance:
                      </label>
                      <input
                        type="text"
                        disabled
                        value={`₱${newBalance}`}
                        className={classNames(
                          'mt-1 focus:ring-indigo-500 focus:border-indigo-500',
                          'block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                          isSubmitting ? 'disabled:opacity-50 disabled:cursor-not-allowed' : ''
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className={classNames(
                      'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm',
                      'font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700',
                      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                      'disabled:opacity-50 disabled:cursor-not-allowed'
                    )}>
                    {isSubmitting ? <Spinner className="w-5 h-5 text-white" /> : 'Save'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Dialogs>
  )
}

const ExpenseForm = ({
  expenses,
  handleChangeInput,
  handleRemoveExpenseFields,
  handleAddExpenseFields,
  isSubmitting
}) => {
  return expenses.map((expense) => (
    <div
      key={expense.id}
      className={classNames(
        `flex items-center space-x-3 space-y-2 ${
          isSubmitting ? 'disabled:opacity-50 disabled:cursor-not-allowed' : ''
        }`
      )}>
      <input
        type="text"
        name="name"
        required
        placeholder="Name"
        value={expense.name}
        onChange={(event) => handleChangeInput(expense.id, event)}
        className={classNames(
          'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block',
          'w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
        )}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={expense.price}
        onChange={(event) => handleChangeInput(expense.id, event)}
        className={classNames(
          'mt-1 focus:ring-indigo-500 focus:border-indigo-500',
          'block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
        )}
      />
      <div className="mt-1 flex items-center space-x-2">
        <button
          type="button"
          onClick={() => handleRemoveExpenseFields(expense.id)}
          disabled={expenses.length === 1}
          className={classNames(
            'p-2 bg-white rounded border hover:bg-gray-50 active:bg-white transition ease-in-out duration-150',
            'disabled:bg-gray-200 disabled:cursor-not-allowed'
          )}>
          <MinusIcon className="w-5 h-5 text-gray-600" />
        </button>
        <button
          type="button"
          onClick={handleAddExpenseFields}
          className={classNames(
            'p-2 bg-white rounded border hover:bg-gray-50',
            'active:bg-white transition ease-in-out duration-150'
          )}>
          <PlusIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  ))
}

export default ExpenseDialog
