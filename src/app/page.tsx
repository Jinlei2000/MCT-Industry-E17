'use client'
import SideBar from '@/components/SideBar'
import useFireStore from '@/hooks/useFireStore'
import { useEffect } from 'react'

export default function Home() {
  const { listenToChangeConfig } = useFireStore()

  useEffect(() => {
    listenToChangeConfig(() => {}, '/detail')
  }, [])

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-9xl font-bold">hey</h1>
      <SideBar title='EXPO 50 JAAR E3/E17'/>
    </main>
  )
}
