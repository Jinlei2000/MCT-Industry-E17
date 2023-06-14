'use client'
import Button from '@/components/Button'
import ImageSkeleton from '@/components/ImageSkeleton'
import useLocalStorage from '@/hooks/useLocalStorage'
import IConfig from '@/interfaces/IConfig'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default () => {
  const { getPhoto, clearAll, setConfig, setPhoto, getConfig } =
    useLocalStorage()
  const router = useRouter()
  const [configData, setConfigData] = useState<IConfig>()
  const [isLoadedAiImgs, setIsLoadedAiImgs] = useState([true, true, true, true])
  const [generatedPics, setGeneratedPics] = useState<string[]>([])

  // set 4 pics randomly of a tag from generatedPics
  const randomPics = (generatedPics: any, tag: string) => {
    let randomPics: string[] = []
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
    getConfig().then(config => {
      setConfigData(config)
      getPhoto().then(photo => {
        if (photo) {
          // set 4 pics randomly of a tag from generatedPics when more than 4 pics
          randomPics(photo.generatedPics, config.selectedTag)
        } else {
          clearAll()
          router.push('/website')
        }
      })
    })
  }, [])

  return (
    <main>
      {/* skeleton loader */}
      <div className="absolute z-[2] h-screen w-screen">
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
        <div className="grid h-screen w-screen grid-cols-2 grid-rows-2">
          {generatedPics.map((picUrl, index) => (
            <div key={index} className="relative">
              <Image
                key={`${index}-image`}
                className="object-cover"
                src={`${picUrl}`}
                alt={`AI generated photo of ${configData?.selectedTag}`}
                fill
                priority
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

      {/* controls */}
      <aside className="fixed bottom-0 right-0 z-50 h-96 w-4/12 bg-e17-primary-200">
        {/*back button */}
        <div className="flex items-center gap-4 pt-8 xl:gap-6 xl:pt-12">
          {/* go back button */}
          <button
            className="bg-transparent"
            onClick={() => {
              clearAll()
              router.push('/website')
            }}
          >
            <ArrowLeft className="h-8 w-8 stroke-[2.5px] text-white" />
          </button>
        </div>

        {/* buttons */}
        <div className="">
          {/* show random & orignal */}
          <div className="grid grid-cols-2 gap-4 xl:gap-6">
            <Button
              handleClick={() => {
                setPhoto(null)
                setConfig({
                  selectedTag: '',
                  description: '',
                })
                router.push('/website/original')
              }}
            >
              nieuwe foto
            </Button>
            <Button
              handleClick={() => {
                setConfig({
                  selectedTag: '',
                })
                router.push('/website/original')
              }}
            >
              andere toekomst
            </Button>
          </div>
        </div>
      </aside>
    </main>
  )
}
