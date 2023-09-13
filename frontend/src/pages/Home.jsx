import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    // const handleLogout = () => {
        
    // }
  return (
    <div>
        {/*   <h1>Home</h1> */}
        {/* <button onClick={handleLogout}>Log-Out</button> */}
        <h2>HOme</h2>
        <Link to="/profile">Profile</Link>
    </div>
  )
}

export default Home