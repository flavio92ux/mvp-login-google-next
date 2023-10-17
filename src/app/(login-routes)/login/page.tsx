'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const router = useRouter()

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const loginUser = async (e: any) => {
    e.preventDefault()

    signIn('credentials', {
      ...data,
      redirect: false,
    })

    router.push('/admin')
  }

  return (
    <form onSubmit={loginUser}>
      <label htmlFor='email'>Email:</label>
      <input type='email' id='email' onChange={(e) => setData({...data, email: e.target.value})} />

      <label htmlFor='password'>Password:</label>
      <input type='password' id='password' onChange={(e) => setData({...data, password: e.target.value})} />

      <button type='submit'>Submeter</button>
    </form>
  )
}