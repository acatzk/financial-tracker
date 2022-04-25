import { NextPage } from 'next'
import DefaultLayout from 'layouts/DefaultLayout'
import { classNames } from 'utils'
import LoginWithButtons from 'components/LoginWithButtons'
import { useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

const Index: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm()

  let [isLoginPage, setIsLoginPage] = useState(true)
  const image_banner =
    'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80'

  const handleAuthSwitchForm = () => setIsLoginPage((isLoginPage = !isLoginPage))

  const onSubmitForm = () => {
    alert('Hello')
  }

  return (
    <DefaultLayout metaHead="Sign in">
      <div className="relative bg-white overflow-hidden">
        <div className="flex min-h-screen">
          <div className="relative w-0 md:w-1/2">
            <Image
              src={image_banner}
              layout="fill"
              objectFit="cover"
              blurDataURL={image_banner}
              placeholder="blur"
              alt=""
            />
          </div>
          <div className="flex items-center justify-center w-full md:w-1/2">
            <div className="relative sm:max-w-sm w-full">
              <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
              <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
              <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                <label className="block mt-3 text-sm text-gray-700 text-center font-semibold">
                  {isLoginPage ? 'Login' : 'Sign Up'}
                </label>
                <form className="mt-10" onSubmit={handleSubmit(onSubmitForm)}>
                  {!isLoginPage && (
                    <div>
                      <input
                        type="text"
                        disabled={isSubmitting}
                        placeholder="Enter Name"
                        className={classNames(
                          'mt-1 block w-full border-none h-11 rounded-xl shadow-lg',
                          'focus:ring-0 transition ease-in-out duration-150',
                          'disabled:cursor-not-allowed disabled:opacity-50',
                          errors?.display_name
                            ? 'bg-red-100'
                            : 'bg-gray-100 hover:bg-blue-100 focus:bg-blue-100'
                        )}
                        {...register('display_name', {
                          required: true,
                          maxLength: 20,
                          minLength: 4
                        })}
                      />
                      <div className="space-y-0.5 ml-1.5">
                        {errors.display_name?.type === 'required' && (
                          <span className="text-xs text-red-500 font-medium">Name is required</span>
                        )}
                        {errors.display_name?.type === 'maxLength' && (
                          <span className="text-xs text-red-500 font-medium">
                            Should have max length of 20
                          </span>
                        )}
                        {errors.display_name?.type === 'minLength' && (
                          <span className="text-xs text-red-500 font-medium">
                            Name should not less then 4 length
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <input
                      type="email"
                      disabled={isSubmitting}
                      placeholder="Enter Email"
                      className={classNames(
                        'mt-1 block w-full border-none h-11 rounded-xl shadow-lg',
                        'focus:ring-0 transition ease-in-out duration-150',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        errors?.email
                          ? 'bg-red-100'
                          : 'bg-gray-100 hover:bg-blue-100 focus:bg-blue-100'
                      )}
                      {...register('email', {
                        required: true,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                    />
                    <div className="space-y-0.5 ml-1.5">
                      {errors.email?.type === 'required' && (
                        <span className="text-xs text-red-500 font-medium">Email is required</span>
                      )}
                      {errors.email?.message && (
                        <span className="text-xs text-red-500 font-medium">
                          {errors.email?.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <input
                      type="password"
                      disabled={isSubmitting}
                      placeholder="Enter Password"
                      className={classNames(
                        'mt-1 block w-full border-none h-11 rounded-xl shadow-lg',
                        'focus:ring-0 transition ease-in-out duration-150',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        errors?.password
                          ? 'bg-red-100'
                          : 'bg-gray-100 hover:bg-blue-100 focus:bg-blue-100'
                      )}
                      {...register('password', {
                        required: true,
                        minLength: 4
                      })}
                    />
                    <div className="space-y-0.5 ml-1.5">
                      {errors.password?.type === 'required' && (
                        <span className="text-xs text-red-500 font-medium">
                          Password is required
                        </span>
                      )}
                      {errors.password?.type === 'minLength' && (
                        <span className="text-xs text-red-500 font-medium">
                          Minimum password length of 4
                        </span>
                      )}
                    </div>
                  </div>

                  {isLoginPage && (
                    <div className="mt-7 flex">
                      <label className="inline-flex items-center w-full cursor-pointer">
                        <input
                          type="checkbox"
                          disabled={isSubmitting}
                          className={classNames(
                            'rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring',
                            'focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50'
                          )}
                          name="remember"
                        />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                      </label>

                      <div className="w-full text-right">
                        <a className="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                          Forgot password?
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="mt-7">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={classNames(
                        'bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner',
                        'focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105',
                        'disabled:cursor-not-allowed disabled:opacity-50'
                      )}>
                      {isLoginPage ? 'Login' : 'Sign Up'}
                    </button>
                  </div>

                  <div className="flex mt-7 items-center text-center">
                    <hr className="border-gray-300 border-1 w-full rounded-md" />
                    <label className="block font-medium text-sm text-gray-600 w-full">
                      or login with
                    </label>
                    <hr className="border-gray-300 border-1 w-full rounded-md" />
                  </div>

                  <LoginWithButtons isSubmitting={isSubmitting} />

                  <div className="mt-7">
                    <div className="flex justify-center items-center">
                      <label className="mr-2 text-sm">
                        {!isLoginPage ? 'Do you have an account?' : "You don't have an account?"}
                      </label>
                      <button
                        type="button"
                        onClick={handleAuthSwitchForm}
                        className={classNames(
                          'text-sm text-blue-500 transition duration-500 ease-in-out',
                          'transform hover:-translate-x hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50'
                        )}>
                        {!isLoginPage ? 'Login' : 'Sign Up'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Index
