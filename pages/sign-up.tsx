import { NextPage } from 'next'
import DefaultLayout from 'layouts/DefaultLayout'
import Image from 'next/image'
import Link from 'next/link'
import { classNames } from 'utils'
import LoginWithButtons from 'components/LoginWithButtons'

const SignUp: NextPage = () => {
  return (
    <DefaultLayout metaHead="Sign in">
      <div className="relative bg-white overflow-hidden">
        <div className="flex min-h-screen">
          <div className="relative bg-green-200 w-0 md:w-1/2">
            <Image
              src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80"
              layout="fill"
              objectFit="cover"
              alt=""
            />
          </div>
          <div className="flex items-center justify-center w-full md:w-1/2">
            <div className="relative sm:max-w-sm w-full">
              <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
              <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
              <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                <label className="block mt-3 text-sm text-gray-700 text-center font-semibold">
                  Sign up
                </label>
                <form method="#" action="#" className="mt-10">
                  <div>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      className={classNames(
                        'mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg',
                        'hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 transition ease-in-out duration-150'
                      )}
                    />
                  </div>

                  <div className="mt-4">
                    <input
                      type="email"
                      placeholder="Enter Email"
                      className={classNames(
                        'mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg',
                        'hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 transition ease-in-out duration-150'
                      )}
                    />
                  </div>

                  <div className="mt-4">
                    <input
                      type="password"
                      placeholder="Enter Password"
                      className={classNames(
                        'mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100',
                        'focus:bg-blue-100 focus:ring-0 transition ease-in-out duration-150'
                      )}
                    />
                  </div>

                  <div className="mt-7">
                    <button
                      className={classNames(
                        'bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner',
                        'focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105'
                      )}>
                      Sign Up
                    </button>
                  </div>

                  <div className="flex mt-7 items-center text-center">
                    <hr className="border-gray-300 border-1 w-full rounded-md" />
                    <label className="block font-medium text-sm text-gray-600 w-full">
                      or login with
                    </label>
                    <hr className="border-gray-300 border-1 w-full rounded-md" />
                  </div>

                  <LoginWithButtons />

                  <div className="mt-7">
                    <div className="flex justify-center items-center">
                      <label className="mr-2 text-sm">Do you have an account?</label>
                      <Link href="/">
                        <a className="text-sm text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                          Login
                        </a>
                      </Link>
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

export default SignUp
