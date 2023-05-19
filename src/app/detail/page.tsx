'use client'
import useFireStore from '@/hooks/useFireStore'

export default () => {
  const { listenToChangePage } = useFireStore()

  listenToChangePage('/')

  return (
    <main className="p-10">
      <h1 className="flex  p-4 pt-2 text-9xl">DETAIL</h1>
    </main>
  )
}
