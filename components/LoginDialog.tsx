import { motion } from 'framer-motion'
import { fadeInUp, stagger } from 'mock/animation'
import { IconType } from 'react-icons'
import { classNames } from 'utils'
import Dialogs from './Dialog'
import { FaGithub, FaGoogle, FaFacebook } from 'react-icons/fa'

interface LoginDialogProps {
  open: boolean
  setOpen: Function | any
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, setOpen }) => {
  return (
    <Dialogs open={open} setOpen={setOpen}>
      <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">Sign in with</h3>
          <div className="mt-2">
            <motion.div variants={stagger} className="flex flex-col space-y-1 w-full">
              <LoginButton Icon={FaFacebook} title="Facebook" className="bg-[#4267B2]" />
              <LoginButton Icon={FaGoogle} title="Google" className="bg-[#db3236]" />
              <LoginButton Icon={FaGithub} title="GitHub" className="bg-[#24292e]" />
            </motion.div>
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
    <motion.button
      variants={fadeInUp}
      className={classNames(
        'group flex items-center justify-center space-x-2 py-3 px-4 rounded',
        'hover:bg-opacity-80 transition ease-in-out duration-200',
        'focus:outline-none border border-transparent',
        'active:bg-transparent active:border-black dark:active:border-white',
        className
      )}>
      <Icon className="w-5 h-5 text-white group-active:text-black dark:group-active:text-white" />
      <span className="font-medium text-white group-active:text-black dark:group-active:text-white">
        Continue with {title}
      </span>
    </motion.button>
  )
}

export default LoginDialog
