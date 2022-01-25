import { IconType } from 'react-icons'
import { classNames } from 'utils'
import Dialogs from './Dialog'
import { FaGithub, FaGoogle, FaFacebook } from 'react-icons/fa'
import { signIn } from 'next-auth/react'

interface LoginDialogProps {
  open: boolean
  setOpen: Function | any
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, setOpen }) => {
  return (
    <Dialogs open={open} setOpen={setOpen}>
      <div
        className={classNames(
          'inline-block align-bottom bg-white rounded-lg overflow-hidden',
          'shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full'
        )}>
        <div className="bg-white px-4 pt-4 pb-4">
          <h3 className="text-lg leading-6 font-semibold text-gray-800 text-center">
            Sign in with
          </h3>
          <div className="mt-2">
            <div className="flex flex-col space-y-1 w-full">
              <LoginButton Icon={FaFacebook} title="facebook" className="bg-[#4267B2]" />
              <LoginButton Icon={FaGoogle} title="google" className="bg-[#db3236]" />
              <LoginButton Icon={FaGithub} title="github" className="bg-[#24292e]" />
            </div>
          </div>
        </div>
      </div>
    </Dialogs>
  )
}

const LoginButton: React.FC<{
  Icon: IconType
  title: string
  className?: string
}> = ({ Icon, title, className }) => {
  return (
    <button
      type="button"
      onClick={() => signIn(title)}
      className={classNames(
        'group flex items-center justify-center space-x-2 py-3 px-4 rounded',
        'hover:bg-opacity-80 transition ease-in-out duration-200',
        'focus:outline-none border border-transparent',
        'active:bg-transparent active:border-black dark:active:border-white',
        className
      )}>
      <Icon className="w-5 h-5 text-white group-active:text-black dark:group-active:text-white" />
      <span className="font-medium text-white group-active:text-black dark:group-active:text-white capitalize">
        Continue with {title}
      </span>
    </button>
  )
}

export default LoginDialog
