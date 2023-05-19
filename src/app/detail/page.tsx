'use client'
import useFireStore from '@/hooks/useFireStore'
import IPhoto from '@/interfaces/IPhoto'
import { useEffect, useState } from 'react'

export default () => {
  const { listenToChangePage, getPhotoById } = useFireStore()
  const [photo, setPhoto] = useState<IPhoto>({})

  listenToChangePage('/')

  useEffect(() => {
    getPhotoById().then(photo => {
      setPhoto(photo)
    })
  }, [])

  return (
    <main className="flex h-screen flex-col items-center justify-center p-10">
      <h1 className="flex  p-4 pt-2 text-9xl">DETAIL</h1>
      <img
        className="h-96 w-96 object-cover"
        src={photo.url}
        alt={'Photo of'}
      />
    </main>
  )
}
