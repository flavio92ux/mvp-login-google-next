'use client'

import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function ButtonLogout() {
	const { data } = useSession()

  console.log('session ->', data)

	const router = useRouter()

	async function logout() {
		await signOut({
			redirect: false
		})

		router.replace('/')
	}

 return <button onClick={logout} className="p-2 w-40 border border-gray-300 rounded-md">Sair</button>
}