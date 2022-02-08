import React from 'react'
import Dialogs from './Dialog'
import { classNames, Spinner } from 'utils'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { hasuraAdminClient } from 'lib/hasura-admin-client'
import { GET_AGGREGATE_TOTAL_INCOME_SUM_QUERY } from 'graphql/queries'
import { useSession } from 'next-auth/react'
import {
  ADD_TOTAL_INCOME_MUTATION,
  CREATE_INCOME_MUTATION,
  UPDATE_TOTAL_INCOME_MUTATION
} from 'graphql/mutations'

interface ExpenseProps {
  open: boolean
  setOpen: any
  mutate: any
}

type FormValues = {
  date_earned: string
  income: string
  amount: number
}

const IncomeDialog: React.FC<ExpenseProps> = ({ open, setOpen, mutate }) => {
  const { data: session } = useSession()

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      date_earned: new Date().toISOString().slice(0, 10),
      income: '',
      amount: 0.0
    }
  })

  // Submit the inputed income
  const onSubmit: SubmitHandler<FormValues> = async ({ income, amount, date_earned }, e) => {
    try {
      if (amount <= 0) {
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
      if (sum === null) {
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

      await mutate()
      e?.target.reset()
      setOpen(false)
      toast.success(`Added ₱${amount} ${income.trim().replace(/^\w/, (c) => c.toUpperCase())}!`)
    } catch (err) {
      toast.error(`${err}`)
    }
  }

  return (
    <Dialogs open={open} setOpen={setOpen}>
      <div
        className={classNames(
          'inline-block align-bottom bg-white rounded-lg text-left',
          'overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
        )}>
        <div className="bg-white pt-6">
          <h2 className="text-center font-semibold text-xl text-gray-700">Add Income</h2>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid gap-y-4">
                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Date Earned:
                      </label>
                      <input
                        type="date"
                        disabled={isSubmitting}
                        className={classNames(
                          'mt-1 block py-2 w-full shadow-sm sm:text-md rounded-md',
                          'disabled:opacity-50 disabled:cursor-not-allowed',
                          'transition ease-in-out duration-150',
                          errors.date_earned?.type === 'required'
                            ? 'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'ring-indigo-200 focus:ring-indigo-500 border-gray-300'
                        )}
                        {...register('date_earned', { required: true })}
                      />
                      {errors.date_earned?.type === 'required' && (
                        <span className="text-xs text-red-500 ml-2">Date Earned is required</span>
                      )}
                    </div>
                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Income from:
                      </label>
                      <input
                        type="text"
                        disabled={isSubmitting}
                        placeholder="Example: Work/Job, wages, tip, gift, donation etc."
                        className={classNames(
                          'mt-1 block py-2 w-full shadow-sm sm:text-md rounded-md',
                          'disabled:opacity-50 disabled:cursor-not-allowed',
                          'transition ease-in-out duration-150',
                          errors.income?.type === 'required'
                            ? 'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'ring-indigo-200 focus:ring-indigo-500 border-gray-300'
                        )}
                        {...register('income', { required: true })}
                      />
                      {errors.income?.type === 'required' && (
                        <span className="text-xs text-red-500 ml-2">Income type is required</span>
                      )}
                    </div>
                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">Amount:</label>
                      <input
                        type="number"
                        disabled={isSubmitting}
                        placeholder="Philippine Peso"
                        className={classNames(
                          'mt-1 block w-full shadow-sm sm:text-md rounded-md',
                          'disabled:opacity-50 disabled:cursor-not-allowed',
                          'transition ease-in-out duration-150',
                          errors.amount?.type === 'required' || errors.amount?.type === 'min'
                            ? 'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'ring-indigo-200 focus:ring-indigo-500 border-gray-300'
                        )}
                        {...register('amount', { required: true, min: 1 })}
                      />
                      {errors.amount?.type === 'required' && (
                        <span className="text-xs text-red-500 ml-2">Amount is required</span>
                      )}
                      {errors.amount?.type === 'min' && (
                        <span className="text-xs text-red-500 ml-2">
                          Minimum amount should be greater than zero
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={classNames(
                      'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm',
                      'font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700',
                      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      'transition ease-in-out duration-150'
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

export default IncomeDialog
