import 'styles/tailwind.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ToastContainer />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
