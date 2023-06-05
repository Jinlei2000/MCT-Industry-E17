'use client'
import ImageSkeleton from '@/components/ImageSkeleton'
import SideBar from '@/components/SideBar'
import useFireStore from '@/hooks/useFireStore'
import IConfig from '@/interfaces/IConfig'
import IPhoto from '@/interfaces/IPhoto'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default () => {
  const { getPhotoById, listenToChangeConfig, autoGoBackTimer } = useFireStore()
  const [config, setConfig] = useState<IConfig>({})
  const [generatedPics, setGeneratedPics] = useState<string[]>([])
  const [isLoadedAiImgs, setIsLoadedAiImgs] = useState([true, true, true, true])

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
    })
  }, [])

  useEffect(() => {
    getPhotoById().then((photo: IPhoto) => {
      // set 4 pics randomly of a tag from generatedPics when more than 4 pics
      randomPics(photo.generatedPics)
    })

    // auto go back to home page after time
    autoGoBackTimer(config, '/detail')
  }, [config])

  const customTitle = () => {
    return (
      <>
        <div className="rotate-90 text-center text-5xl font-black text-white">
          <span className="text-stroke">AI </span>Gegenereerd
        </div>
      </>
    )
  }

  return (
    <>
      <SideBar title={customTitle} />

      {/* skeleton loader */}
      <div className="absolute z-[2] h-screen w-5/6">
        <div className="grid h-full grid-cols-2 grid-rows-2">
          {isLoadedAiImgs.map((isLoadedAiImg, index) => (
            <div key={index}>
              {isLoadedAiImg && <ImageSkeleton className="h-full w-full" />}
            </div>
          ))}
        </div>
      </div>

      {/* show 4 pics randomly of a tag from generated ai pics */}
      {generatedPics.length > 0 && (
        <div className="grid h-screen w-5/6 grid-cols-2 grid-rows-2">
          {generatedPics.map((picUrl, index) => (
            <div key={index} className="relative">
              <Image
                key={`${index}-image`}
                className="object-cover"
                src={`${picUrl}`}
                alt={`AI generated photo of ${config.selectedTag}`}
                fill={true}
                quality={100}
                onLoadingComplete={() => {
                  setIsLoadedAiImgs(prev => {
                    const newIsLoadedAiImgs = [...prev]
                    newIsLoadedAiImgs[index] = false
                    return newIsLoadedAiImgs
                  })
                }}
              />
            </div>
          ))}
        </div>
      )}
    </>
  )
}
