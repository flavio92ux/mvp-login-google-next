/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Register() {
  const router = useRouter()
  const [data, setData] = useState({
    name: 'string',
    email: 'string',
    password: 'string',
  })

  const registerUser = async (e: any) => {
    e.preventDefault()

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const userInfo = await response.json()
    // router.push('/')
  }

  return (
    <form onSubmit={registerUser}>
      <label htmlFor='name'>Nome:</label>
      <input type='text' id='name' onChange={(e) => setData({...data, name: e.target.value})} />

      <label htmlFor='email'>Email:</label>
      <input type='email' id='email' onChange={(e) => setData({...data, email: e.target.value})} />

      <label htmlFor='password'>Password:</label>
      <input type='password' id='password' onChange={(e) => setData({...data, password: e.target.value})} />

      <button type='submit'>Submeter</button>
    </form>
  )
}
