'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  return (
    <form>
      <label htmlFor='email'>Email:</label>
      <input type='email' id='email' onChange={(e) => setData({...data, email: e.target.value})} />

      <label htmlFor='password'>Password:</label>
      <input type='password' id='password' onChange={(e) => setData({...data, password: e.target.value})} />

      <button type='submit'>Submeter</button>
    </form>
  )
}