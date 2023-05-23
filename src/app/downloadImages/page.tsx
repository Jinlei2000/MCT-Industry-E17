'use client'
import useFireStore from '@/hooks/useFireStore'
import IPhoto from '@/interfaces/IPhoto'
import { useEffect, useState } from 'react'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { saveAs } from 'file-saver'

export default () => {
  const { getPhotoById } = useFireStore()

  const [photo, setPhoto] = useState<IPhoto>({})
  const [url, setUrl] = useState<string>('')

  useEffect(() => {
    getPhotoById().then(photo => {
      setPhoto(photo)
    })
  }, [])

  return (
    <main className="flex h-screen flex-col items-center justify-center p-10">
      <h1 className="mb-8 text-4xl font-bold">Download</h1>

      <button
        className="rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
        onClick={() => {
          console.log('download')
          // const url =
          //   'https://firebasestorage.googleapis.com/v0/b/firestore-fa445.appspot.com/o/1%2F1-1_DIS.jpg?alt=media&token=9d74e8b7-9020-4241-8f16-69322a8797e4'

          const url =
            'https://images.pexels.com/photos/593172/pexels-photo-593172.jpeg'
          saveAs(url)
        }}
      >
        sdqfqsdfqsdfsqdf
      </button>
    </main>
  )
}
