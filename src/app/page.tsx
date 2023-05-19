'use client'
import useFireStore from '@/hooks/useFireStore'

export default function Home() {
  const { listenToChangePage } = useFireStore()

  listenToChangePage('/detail')
 

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-9xl font-bold">Home Page</h1>
    </main>
  )
}
