'use client'

import LoginButtons from '@/components/LoginButtons'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='text-center w-full mx-auto max-w-[1240px] mt-16'>
      <h1 className='text-4xl font-bold mb-3'>Home Page</h1>

      <div className='flex items-center justify-center'>
        <LoginButtons />
      </div>

      <Link href="/register">Register Page</Link>
      <Link href="/login">Login Page</Link>
      
    </main>
  )
}
