'use client'
import Button from '@/components/Button'
import Title from '@/components/Title'
import useFireStore from '@/hooks/useFireStore'
import useLocalStorage from '@/hooks/useLocalStorage'
import IPhoto from '@/interfaces/IPhoto'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default () => {
  const { getConfig, setConfig, clearAll, setPhoto, getPhoto } =
    useLocalStorage()
  const { getRandomPhotoIdByType } = useFireStore()
  const [photo, setPhotoNow] = useState<IPhoto>()
  const [description, setDescription] = useState<string>()
  const router = useRouter()

  useEffect(() => {
    getConfig().then(config => {
      if (config.photoType !== '' || config.photoType !== null) {
        getPhoto().then(photo => {
          console.log(photo)
          if (photo) {
            setPhotoNow(photo)
          } else {
            getRandomPhotoIdByType(config.photoType).then(data => {
              setDescription(data.description)
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
                        description: description,
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
