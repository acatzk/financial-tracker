import React from 'react'
import { AiFillGithub, AiFillGoogleCircle } from 'react-icons/ai'
import { RiFacebookCircleFill } from 'react-icons/ri'
import { classNames } from 'utils'

const LoginWithButtons: React.FC = () => {
  return (
    <div className="flex mt-7 justify-between w-full">
      <button
        className={classNames(
          'flex items-center space-x-2 bg-[#3c3c3c] border-none px-3 py-1.5 rounded-xl cursor-pointer',
          'text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105'
        )}>
        <AiFillGithub className="w-5 h-5" />
        <span className="text-sm">GitHub</span>
      </button>

      <button
        className={classNames(
          'flex items-center space-x-2 bg-blue-500 border-none px-3 py-1.5 rounded-xl cursor-pointer text-white',
          'shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105'
        )}>
        <RiFacebookCircleFill className="w-5 h-5" />
        <span className="text-sm">Facebook</span>
      </button>

      <button
        className={classNames(
          'flex items-center space-x-2 bg-red-500 border-none px-3 py-1.5 rounded-xl cursor-pointer text-white shadow-xl',
          'hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105'
        )}>
        <AiFillGoogleCircle className="w-5 h-5" />
        <span className="text-sm">Google</span>
      </button>
    </div>
  )
}

export default LoginWithButtons
