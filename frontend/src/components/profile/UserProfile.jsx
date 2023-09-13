import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

function UserProfile({userData}) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    
  return (
    <div>
        <h1>jjf</h1>
    </div>
  )
}

export default UserProfile