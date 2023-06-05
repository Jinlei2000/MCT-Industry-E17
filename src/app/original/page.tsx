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
  const [photo, setPhoto] = useState<IPhoto>({})
  const [config, setConfig] = useState<IConfig>({})
  const [isLoadedImg, setIsLoadedImg] = useState(true)

  useEffect(() => {
    listenToChangeConfig((config: IConfig) => {
      setConfig(config)
    })
  }, [])

  useEffect(() => {
    getPhotoById().then((photo: IPhoto) => {
      setPhoto(photo)
    })

    // auto go back to home page after time
    autoGoBackTimer(config, '/original')
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

  return (
    <main className="relative h-screen">
      {/* original photo or ai generated photos */}
      {config.selectedTag === '' && (
        <>
          <SideBar title={customTitle} />

          {/* skeleton loader */}
          {isLoadedImg && (
            <ImageSkeleton className="absolute z-[2] h-full w-5/6" />
          )}

          {/* show original photo */}
          {photo.url && (
            <Image
              className="object-cover"
              src={photo.url}
              alt={'Original photo'}
              fill
              quality={100}
              onLoadingComplete={() => setIsLoadedImg(false)}
            />
          )}

          {/* show description */}
          {!isLoadedImg && (
            <div className="fixed bottom-0 left-0 m-12 max-w-md border-2 border-white/100 bg-black/40 p-2 ">
              <div className="font text-3xl text-white opacity-100">
                De Europese weg 17 is ongeveer 696 kilometer lang.
              </div>
            </div>
          )}
        </>
      )}
    </main>
  )
}
