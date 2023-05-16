'use client'
import useFireStore from '@/hooks/useFireStore'
import { doc, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { db } = useFireStore()
  const router = useRouter()

  onSnapshot(doc(db, 'config', 'YnfWtqVDB8vyURRmpFTC'), doc => {
    // change url thats being displayed
    const config = doc.data()
    console.log(config)

    if (config?.currentPage === 'detail') {
      router.push(`/detail`)
    }
  })

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-9xl font-bold">Home Page</h1>
    </main>
  )
}
