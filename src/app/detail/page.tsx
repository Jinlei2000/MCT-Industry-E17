'use client'
import useFireStore from '@/hooks/useFireStore'
import { onSnapshot, doc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

export default () => {
  const { db } = useFireStore()
  const router = useRouter()

  onSnapshot(doc(db, 'config', 'YnfWtqVDB8vyURRmpFTC'), doc => {
    // change url thats being displayed
    const config = doc.data()
    console.log(config)

    if (config?.currentPage === 'home') {
      router.push(`/`)
    }
  })
  return (
    <main className="p-10">
      <h1 className="flex  p-4 pt-2 text-9xl">DETAIL</h1>
    </main>
  )
}
