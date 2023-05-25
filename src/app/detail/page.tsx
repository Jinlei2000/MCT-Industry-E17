'use client'
import SideBar from '@/components/SideBar'
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
  const randomPics = (generatedPics: any) => {
    let randomPics: string[] = []
    const tag = config.selectedTag
    if (tag && tag !== '') {
      const images = generatedPics[tag] ? generatedPics[tag] : []

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
      randomPics(photo.generatedPics)
    })
  }, [config])

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <SideBar title="Originele foto" />

      {config.selectedTag === '' ? (
        // show original photo
        <>
          <img
            className="h-screen w-screen"
            src={photo.url}
            alt={'Original photo'}
          />
          <div className="fixed bottom-0 left-0 m-12 max-w-md border-2 border-white/100 bg-black/40 p-2 ">
            <div className="font text-3xl text-white opacity-100">
              De Europese weg 17 is ongeveer 696 kilometer lang.
            </div>
          </div>
        </>
      ) : (
        // show 4 pics randomly of a tag from generatedPics
        <div className="grid h-screen w-5/6 grid-cols-2 self-stretch overflow-hidden">
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
