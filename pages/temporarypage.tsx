import React from 'react'
import { useSignOut, useAuthenticated } from '@nhost/nextjs'
import { useRouter } from 'next/router'

const temporarypage: React.FC = () => {
  const router = useRouter()
  const signOut = useSignOut()
  const isAuthenticated = useAuthenticated()

  const handleSignOut = () => signOut.signOut()

  if (!isAuthenticated) router.push('/')

  return (
    <div>
      WElcome authenticated User{' '}
      <button
        onClick={handleSignOut}
        type="button"
        className="bg-blue-500 py-1 px-1 rounded text-white">
        Logout
      </button>
    </div>
  )
}

export default temporarypage
