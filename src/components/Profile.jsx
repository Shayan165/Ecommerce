import React from 'react'
import { useAuth } from '../context/usercontext'

function Profile() {
  let user = useAuth();
  return (
    <>
    <div className="container">
      Welcome User : {user.userData && user.userData.useremail}
    </div>
    </>
  )
}

export default Profile