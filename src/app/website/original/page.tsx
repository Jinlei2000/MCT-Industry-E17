'use client'
import Button from '@/components/Button'
import ImageSkeleton from '@/components/ImageSkeleton'
import Title from '@/components/Title'
import useFireStore from '@/hooks/useFireStore'
import useLocalStorage from '@/hooks/useLocalStorage'
import IConfig from '@/interfaces/IConfig'
import IPhoto from '@/interfaces/IPhoto'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default () => {
  const { getConfig, setConfig, clearAll, setPhoto, getPhoto } =
    useLocalStorage()
  const { getRandomPhotoIdByType } = useFireStore()
  const [photo, setPhotoNow] = useState<IPhoto>()
  const router = useRouter()
  const [isLoadedImg, setIsLoadedImg] = useState(true)
  const [config, setConfigNow] = useState<IConfig>()

  useEffect(() => {
    getConfig().then(config => {
      if (config.photoType !== '' || config.photoType !== null) {
        getPhoto().then(photo => {
          if (photo) {
            setPhotoNow(photo)
            getConfig().then(config => {
              console.log(config)
              setConfigNow(config)
            })
          } else {
            getRandomPhotoIdByType(config.photoType).then(data => {
              setConfigNow({ ...config, description: data.description })
              setConfig({ ...config, description: data.description })
              setPhoto(data.photo)
              setPhotoNow(data.photo)
            })
          }
        })
      } else {
        clearAll()
        router.push('/website')
      }
    })
  }, [])

  return (
    <main>
      {/* skeleton loader */}
      {isLoadedImg && (
        <ImageSkeleton
          border={false}
          className="absolute z-[2] h-full w-full"
        />
      )}

      {/* show original photo */}
      {photo && photo.url && (
        <Image
          className="object-cover "
          src={photo.url}
          alt={'Original photo'}
          fill
          priority
          onLoadingComplete={() => setIsLoadedImg(false)}
        />
      )}

      {/* show description */}
      {!isLoadedImg && config && config.description && (
        <div className="fixed bottom-24 left-20 max-w-5xl">
          <div className="text-shadow font-extrabold text-white xl:text-5xl">
            {config.description}
          </div>
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
            <ArrowLeft className="h-8 w-8 stroke-[2.5px] text-white xl:h-14 xl:w-14 xl:stroke-[3px] " />
          </button>
        </div>

        {/* buttons */}
        <div className="">
          {/* show tags buttons */}
          <Title>Welke toekomst kies jij?</Title>
          <div className="grid grid-cols-2 gap-4 xl:gap-6">
            {photo && photo.tags && (
              <>
                {photo.tags?.map(tag => (
                  <Button
                    key={tag}
                    handleClick={() => {
                      setConfig({
                        selectedTag: tag,
                      })
                      router.push('/website/detail')
                    }}
                  >
                    {tag}
                  </Button>
                ))}
              </>
            )}
          </div>
        </div>
      </aside>
    </main>
  )
}
