'use client'
import useFireStore from '@/hooks/useFireStore'
import IConfig from '@/interfaces/IConfig'
import IPhoto from '@/interfaces/IPhoto'
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
    showType: true,
    showTags: false,
    showBack: false,
    showSelectedTag: false,
  })

  useEffect(() => {
    listenToChangeControls((config: IConfig) => {
      // change controls based on config
      setControls({
        showType: config?.currentPage === '/',
        showTags:
          config?.currentPage === '/detail' && config?.selectedTag === '',
        showBack: config?.currentPage === '/detail',
        showSelectedTag: config?.selectedTag != '',
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
      {controls.showBack && (
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

        {/* show type buttons */}
        {controls.showType && (
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
        {controls.showTags && (
          <div>
            {photo.tags?.map(tag => (
              <button
                key={tag}
                className="m-2 rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
                onClick={() => {
                  updateConfig({
                    selectedTag: tag,
                  })
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* show random & orignal */}
        {controls.showSelectedTag && (
          <div>
            <button className="rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600">
              Random
            </button>
            <button className="rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600">
              Origineel
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
