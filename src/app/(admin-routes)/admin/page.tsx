import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ButtonLogout from '@/components/ButtonLogout'
import { getServerSession } from 'next-auth'
import { connectDB } from '@/utils/database'

interface ISession {
  user: {
    name: string
    email: string
    image: string
  }
}

export default async function Admin() {
  const db = connectDB()

  const session: ISession | null = await getServerSession(authOptions)

  return (
    <>
      <div>
        <h1 className='text-2xl mb-8'>
          Olá, {session?.user.name}. Bem vindo(a)!
        </h1>
        <ButtonLogout />
      </div>
    </>
  )
}
