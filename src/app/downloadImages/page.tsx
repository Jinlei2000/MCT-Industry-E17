'use client'
import useFireStore from '@/hooks/useFireStore'
<<<<<<< HEAD
import IPhoto from '@/interfaces/IPhoto'
import { useEffect, useState } from 'react'
=======
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
>>>>>>> 1.6.2
import { saveAs } from 'file-saver'

export default () => {
  const {} = useFireStore()

  return (
    <main className="flex h-screen flex-col items-center justify-center p-10">
      <h1 className="mb-8 text-4xl font-bold">Download</h1>

<<<<<<< HEAD
      <button
        className="rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
        onClick={() => {
          console.log('download')
          const url =
            'https://firebasestorage.googleapis.com/v0/b/firestore-fa445.appspot.com/o/1%2F1-1_DIS.jpg?alt=media&token=9d74e8b7-9020-4241-8f16-69322a8797e4'

          saveAs(url)
        }}
      >
        sdqfqsdfqsdfsqdf
      </button>
=======
      <div className="flex flex-col gap-2">
        <button
          className="rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
          onClick={() => {
            console.log('download')
            const url =
              'https://firebasestorage.googleapis.com/v0/b/firestore-fa445.appspot.com/o/1%2F1-1_DIS.jpg?alt=media&token=9d74e8b7-9020-4241-8f16-69322a8797e4'
            saveAs(url)
          }}
        >
          Download with url (npm install file-saver)
        </button>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
          onClick={() => {
            console.log('download')
            const storage = getStorage()
            const storageRef = ref(storage, '1/1-1_DIS.jpg')
            getDownloadURL(storageRef).then(url => {
              console.log(url)
              // saveAs(url)

              
              // download with url
              const xhr = new XMLHttpRequest()
              xhr.responseType = 'blob'
              xhr.onload = event => {
                const blob = xhr.response
                saveAs(blob)
              }
              xhr.open('GET', url)
              xhr.send()
            })
          }}
        >
          Download with firebase storage
        </button>
      </div>
>>>>>>> 1.6.2
    </main>
  )
}
