'use client'
import SideBar from '@/components/SideBar'
import useFireStore from '@/hooks/useFireStore'
import IConfig from '@/interfaces/IConfig'
import IPhoto from '@/interfaces/IPhoto'
import Image from 'next/image'
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

  const customTitle = () => {
    return (
      <>
        <div className="rotate-90 text-center text-5xl font-black text-white">
          Origineel <span className="text-stroke">foto</span>
        </div>
      </>
    )
  }

  const AiTitle = () => {
    return (
      <>
        <div className="rotate-90 text-center text-5xl font-black text-white">
          <span className="text-stroke">AI </span>Gegenereerd
        </div>
      </>
    )
  }

  const [isLoaded, setIsLoaded] = useState(true)

  return (
    <main className="relative h-screen">
      {config.selectedTag === '' ? (
        // show original photo
        <>
          <SideBar title={customTitle} />

          {isLoaded && (
            // skeleton loader
            <div className="absolute z-[2] h-full w-full animate-pulse">
              <div className="grid h-full w-5/6 place-items-center bg-gray-400">
                <svg className="h-20 w-20 fill-gray-200" viewBox="0 0 640 512">
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          )}

          {photo.url && (
            // show original photo
            <Image
              className="object-cover"
              src={photo.url}
              alt={'Original photo'}
              fill
              quality={100}
              onLoadingComplete={() => setIsLoaded(false)}
            />
          )}

          {!isLoaded && (
            // show text when image is loaded
            <div className="fixed bottom-0 left-0 m-12 max-w-md border-2 border-white/100 bg-black/40 p-2 ">
              <div className="font text-3xl text-white opacity-100">
                De Europese weg 17 is ongeveer 696 kilometer lang.
              </div>
            </div>
          )}
        </>
      ) : (
        // show 4 pics randomly of a tag from generatedPics
        <>
          <SideBar title={AiTitle} />
          {generatedPics.length > 0 && (
            <div className="h-screen w-5/6">
              <div className="grid h-full grid-cols-2 grid-rows-2">
                {generatedPics.map((picUrl, index) => (
                  <div key={index} className="relative">
                    <Image
                      key={index}
                      className="object-cover"
                      src={picUrl}
                      alt={`AI generated photo of ${config.selectedTag}`}
                      fill={true}
                      quality={100}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </main>
  )
}
