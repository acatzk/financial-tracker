import React from 'react'
import Dialogs from './Dialog'
import { classNames, MinusIcon, PlusIcon } from 'utils'

interface ExpenseProps {
  open: boolean
  setOpen: any
  expenses: any
  setExpenses: any
  handleAddExpenseFields: any
  handleRemoveExpenseFields: Function
  handleChangeInput: Function
}

const ExpenseDialog: React.FC<ExpenseProps> = ({
  open,
  setOpen,
  expenses,
  handleAddExpenseFields,
  handleRemoveExpenseFields,
  handleChangeInput
}) => {
  return (
    <Dialogs open={open} setOpen={setOpen}>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white pt-6">
          <h2 className="text-center font-semibold text-xl text-gray-700">Add Today's Expenses</h2>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-rows-2 gap-y-4">
                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">Balance:</label>
                      <input
                        type="text"
                        disabled
                        value="₱3,846"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">Date:</label>
                      <input
                        type="date"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">Expenses:</label>
                      <ExpenseForm
                        expenses={expenses}
                        handleChangeInput={handleChangeInput}
                        handleRemoveExpenseFields={handleRemoveExpenseFields}
                        handleAddExpenseFields={handleAddExpenseFields}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Total Expenses:
                      </label>
                      <input
                        type="text"
                        disabled
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">
                        New Balance:
                      </label>
                      <input
                        type="text"
                        disabled
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
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

const ExpenseForm = ({
  expenses,
  handleChangeInput,
  handleRemoveExpenseFields,
  handleAddExpenseFields
}) => {
  return expenses.map((expense) => (
    <div key={expense.id} className="flex items-center space-x-3 space-y-2">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={expense.name}
        onChange={(event) => handleChangeInput(expense.id, event)}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={expense.price}
        onChange={(event) => handleChangeInput(expense.id, event)}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
      <div className="mt-1 flex items-center space-x-2">
        <button
          onClick={() => handleRemoveExpenseFields(expense.id)}
          disabled={expenses.length === 1}
          className={classNames(
            'p-2 bg-white rounded border hover:bg-gray-50 active:bg-white transition ease-in-out duration-150',
            'disabled:bg-gray-200 disabled:cursor-not-allowed'
          )}>
          <MinusIcon className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={handleAddExpenseFields}
          className="p-2 bg-white rounded border hover:bg-gray-50 active:bg-white transition ease-in-out duration-150">
          <PlusIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  ))
}

export default ExpenseDialog
