import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:6782/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(response.status !==200) {
        navigate('/login')
      }
    } catch (err) {
      navigate('/login')
      console.error(err)
    }
  }
  
  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className='text-3xl text-blue-500'>
      Home   
    </div>
  )
}

export default Home
