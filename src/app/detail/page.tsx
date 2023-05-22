'use client'
import useFireStore from '@/hooks/useFireStore'
import IConfig from '@/interfaces/IConfig'
import IPhoto from '@/interfaces/IPhoto'
import { useEffect, useState } from 'react'

export default () => {
  const { getPhotoById, listenToChangeConfig } = useFireStore()
  const [photo, setPhoto] = useState<IPhoto>({})
  const [config, setConfig] = useState<IConfig>({})

  useEffect(() => {
    listenToChangeConfig((config: IConfig) => {
      setConfig(config)
    }, '/')
  }, [])

  useEffect(() => {
    getPhotoById().then(photo => {
      setPhoto(photo)
    })
  }, [config])

  // get generated pic
  const getGeneratedPic = (key: number) => {
    const tag = config.selectedTag

    return tag && photo.generatedPics && photo.generatedPics[tag][key]
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center p-10">
      <h1 className="flex  p-4 pt-2 text-9xl">DETAIL</h1>

      {config?.selectedTag === '' ? (
        <img className="object-cover" src={photo.url} alt={'Photo of'} />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <img
            className="object-cover"
            src={getGeneratedPic(0)}
            alt={'Photo of'}
          />
          <img
            className="object-cover"
            src={getGeneratedPic(1)}
            alt={'Photo of'}
          />
          <img
            className="object-cover"
            src={getGeneratedPic(2)}
            alt={'Photo of'}
          />
          <img
            className="object-cover"
            src={getGeneratedPic(3)}
            alt={'Photo of'}
          />
        </div>
      )}
    </main>
  )
}
