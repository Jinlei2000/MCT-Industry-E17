'use client'
import Button from '@/components/Button'
import useLocalStorage from '@/hooks/useLocalStorage'
import IConfig from '@/interfaces/IConfig'
import IPhoto from '@/interfaces/IPhoto'
import { ArrowLeft, Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default () => {
  const { getPhoto, clearAll, setConfig, setPhoto, getConfig } =
    useLocalStorage()
  const router = useRouter()
  const [photoData, setPhotoData] = useState<IPhoto>()
  const [configData, setConfigData] = useState<IConfig>()

  useEffect(() => {
    getPhoto().then(photo => {
      if (photo) {
        setPhotoData(photo)
      } else {
        clearAll()
        router.push('/website')
      }
    })

    getConfig().then(config => {
      setConfigData(config)
    })
  }, [])

  return (
    <main>
      {/* controls */}
      <aside className="fixed bottom-0 right-0 h-96 w-4/12 bg-e17-primary-200">
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
