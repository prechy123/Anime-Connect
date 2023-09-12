import React from 'react'
// import { useDispatch } from 'react-redux'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

function PrivateRoutes() {
    // const dispatch = useDispatch()
    const token = localStorage.getItem("profile")
    const userData = JSON.parse(token).user
    console.log(userData);
    const accessToken = JSON.parse(token)?.accessToken
  return (
    <div>
        <Navbar userData={userData} accessToken={accessToken}/>
        <Outlet />
    </div>
  )
}

export default PrivateRoutes