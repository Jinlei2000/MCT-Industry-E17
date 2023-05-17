'use client'
import useFireStore from '@/hooks/useFireStore'
import { useRouter } from 'next/navigation'

export default () => {
  const { listenToChangePage } = useFireStore()
  const router = useRouter()

  listenToChangePage('/')

  return (
    <main className="p-10">
      <h1 className="flex  p-4 pt-2 text-9xl">DETAIL</h1>
    </main>
  )
}
