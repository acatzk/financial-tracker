import { NextPage } from 'next'
import DefaultLayout from 'layouts/DefaultLayout'
import Image from 'next/image'

const Index: NextPage = () => {
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
                  Financial Tracker
                </label>
                <form method="#" action="#" className="mt-10">
                  <div>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    />
                  </div>

                  <div className="mt-7">
                    <input
                      type="password"
                      placeholder="Enter Password"
                      className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    />
                  </div>

                  <div className="mt-7 flex">
                    <label className="inline-flex items-center w-full cursor-pointer">
                      <input
                        id="remember_me"
                        type="checkbox"
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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

                  <div className="mt-7">
                    <button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                      Login
                    </button>
                  </div>

                  <div className="flex mt-7 items-center text-center">
                    <hr className="border-gray-300 border-1 w-full rounded-md" />
                    <label className="block font-medium text-sm text-gray-600 w-full">
                      Login on
                    </label>
                    <hr className="border-gray-300 border-1 w-full rounded-md" />
                  </div>

                  <div className="flex mt-7 justify-between w-full">
                    <button className="bg-[#3c3c3c] border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                      GitHub
                    </button>

                    <button className="bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                      Facebook
                    </button>

                    <button className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                      Google
                    </button>
                  </div>

                  <div className="mt-7">
                    <div className="flex justify-center items-center">
                      <label className="mr-2">Do you have an account?</label>
                      <a
                        href="#"
                        className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                        Sign up
                      </a>
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
