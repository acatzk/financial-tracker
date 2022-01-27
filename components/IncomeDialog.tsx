import React from 'react'
import Dialogs from './Dialog'
import { classNames, MinusIcon, PlusIcon } from 'utils'
import { useForm } from 'react-hook-form'

interface ExpenseProps {
  open: boolean
  setOpen: any
  onSubmit: any
}

const IncomeDialog: React.FC<ExpenseProps> = ({ open, setOpen, onSubmit }) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm()

  return (
    <Dialogs open={open} setOpen={setOpen}>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white pt-6">
          <h2 className="text-center font-semibold text-xl text-gray-700">Add Income</h2>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid gap-y-4">
                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Income from:
                      </label>
                      <input
                        type="text"
                        placeholder="Example: Job, wages, tip, gift, donation etc."
                        className={classNames(
                          'mt-1 block w-full',
                          'shadow-sm sm:text-sm rounded-md',
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
                        placeholder="Philippine Peso"
                        className={classNames(
                          'mt-1 block w-full',
                          'shadow-sm sm:text-sm rounded-md',
                          errors.amount?.type === 'required'
                            ? 'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'ring-indigo-200 focus:ring-indigo-500 border-gray-300'
                        )}
                        {...register('amount', { required: true })}
                      />
                      {errors.amount?.type === 'required' && (
                        <span className="text-xs text-red-500 ml-2">Amount is required</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Save
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
