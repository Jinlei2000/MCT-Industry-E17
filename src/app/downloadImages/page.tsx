'use client'
import useFireStore from '@/hooks/useFireStore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { saveAs } from 'file-saver'
import { useEffect, useState } from 'react'
import IPhoto from '@/interfaces/IPhoto'
import IConfig from '@/interfaces/IConfig'

export default () => {
  const { getPhotoById, getConfig } = useFireStore()

  const [downloadUrls, setDownloadUrls] = useState<string[]>([])
  const [photo, setPhoto] = useState<IPhoto>({})
  const [imageTag, setImageTag] = useState<string>('')

  useEffect(() => {
    getPhotoById().then(photo => {
      setPhoto(photo)
    })

    getConfig().then(config => {
      if (config && config.selectedTag && config.selectedTag != '') {
        setImageTag(config.selectedTag)
      }
    })
  }, [])

  useEffect(() => {
    const urls: string[] = []

    const images = photo.generatedPics && photo.generatedPics[imageTag]

    console.log(images)
  }, [photo, imageTag])

  return (
    <main className="flex h-screen flex-col items-center justify-center p-10">
      <h1 className="mb-8 text-4xl font-bold">Download</h1>

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
            const storageRef = ref(
              storage,
              'https://firebasestorage.googleapis.com/v0/b/firestore-fa445.appspot.com/o/1%2F1-1_DIS.jpg?alt=media&token=9d74e8b7-9020-4241-8f16-69322a8797e4',
            )
            getDownloadURL(storageRef).then(url => {
              console.log(url)

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
    </main>
  )
}
