'use client'
import useFireStore from '@/hooks/useFireStore'
import IConfig from '@/interfaces/IConfig'
import IPhoto from '@/interfaces/IPhoto'
import { onSnapshot, doc } from 'firebase/firestore'
import router from 'next/router'
import { useEffect, useState } from 'react'

export default () => {
  const {
    updateConfig,
    setRandomPhotoIdByType,
    getPhotoById,
    listenToChangeControls,
  } = useFireStore()

  const [photo, setPhoto] = useState<IPhoto>({})
  const [controls, setControls] = useState<any>({
    back: false,
    type: true,
    tags: false,
  })

  useEffect(() => {
    listenToChangeControls((config: IConfig) => {
      // change controls based on config
      setControls({
        type: config?.currentPage === '/',
        tags: config?.currentPage === '/detail' && config?.selectedTag === '',
        back: config?.currentPage === '/detail',
      })
    })
  }, [])

  useEffect(() => {
    getPhotoById().then(photo => {
      console.log(photo)
      setPhoto(photo)
    })
  }, [controls])

  return (
    <main className="">
      {controls.back && (
        <button
          className="absolute left-0 top-0 rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
          onClick={() => {
            updateConfig({
              currentPage: '/',
              photoId: '',
              photoType: '',
              selectedTag: '',
            })
          }}
        >
          Ga terug
        </button>
      )}
      {/* center in middle of screen */}
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-8 text-4xl font-bold">Controls</h1>
        {controls.type && (
          <div>
            <button
              className="rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
              onClick={() => {
                setRandomPhotoIdByType('skyPics')
              }}
            >
              Lucht
            </button>
            <button
              className="rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
              onClick={() => {
                setRandomPhotoIdByType('groundPics')
              }}
            >
              Grond
            </button>
          </div>
        )}

        {/* show tags buttons */}
        {photo.tags && (
          <div>
            {photo.tags?.map(tag => (
              <button
                key={tag}
                className="m-2 rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
