import React from 'react'
import { auth, currentUser } from '@clerk/nextjs/server'

const Dashboard = async () => {
  const { userId } = await auth()

  // Protect the route by checking if the user is signed in
  if (!userId) {
    console.log("userid is : " + userId)
    return <div>Sign in to view this page</div>
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser()

  return (
    <div className='mt-10'>
      Dashboard
      <div>
        Welcome, {user?.firstName}
      </div>
    </div>
  )
}

export default Dashboard