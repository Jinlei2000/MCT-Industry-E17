'use client'
import useFireStore from '@/hooks/useFireStore'
import IConfig from '@/interfaces/IConfig'
import IPhoto from '@/interfaces/IPhoto'
import { useEffect, useState } from 'react'

export default () => {
  const { getPhotoById, listenToChangeConfig } = useFireStore()
  const [photo, setPhoto] = useState<IPhoto>({})
  const [config, setConfig] = useState<IConfig>({})
  const [generatedPics, setGeneratedPics] = useState<string[]>([])

  // set 4 pics randomly of a tag from generatedPics
  const randomPics = () => {
    if (config.selectedTag !== '') {
      let randomPics: string[] = []
      const tag = config.selectedTag

      const images =
        tag && photo.generatedPics && photo.generatedPics[tag]
          ? photo.generatedPics[tag]
          : []

      if (images.length > 4) {
        randomPics = images.sort(() => 0.5 - Math.random()).slice(0, 4)
      } else {
        randomPics = images
      }
      setGeneratedPics(randomPics)
    }
  }

  useEffect(() => {
    listenToChangeConfig((config: IConfig) => {
      setConfig(config)
    }, '/')
  }, [])

  useEffect(() => {
    getPhotoById().then(photo => {
      setPhoto(photo)

      // set 4 pics randomly of a tag from generatedPics when more than 4 pics
      randomPics()
    })
  }, [config])

  return (
    <main className="flex h-screen flex-col items-center justify-center p-10">
      {config?.selectedTag === '' ? (
        // show original photo
        <img className="object-cover" src={photo.url} alt={'Original photo'} />
      ) : (
        // show 4 pics randomly of a tag from generatedPics
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <img
            className="object-cover"
            src={generatedPics[0]}
            alt={`AI generated photo of ${config.selectedTag}`}
          />
          <img
            className="object-cover"
            src={generatedPics[1]}
            alt={`AI generated photo of ${config.selectedTag}`}
          />
          <img
            className="object-cover"
            src={generatedPics[2]}
            alt={`AI generated photo of ${config.selectedTag}`}
          />
          <img
            className="object-cover"
            src={generatedPics[3]}
            alt={`AI generated photo of ${config.selectedTag}`}
          />
        </div>
      )}
    </main>
  )
}
