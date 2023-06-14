'use client'
import { useRouter } from 'next/navigation'
import Button from './Button'
import Title from './Title'
import { ArrowLeft } from 'lucide-react'
import useLocalStorage from '@/hooks/useLocalStorage'

export default ({
  showType = false,
  showTags = false,
  showSelectedTag = false,
  showBack = false,
  tags,
}: {
  showType?: boolean
  showTags?: boolean
  showSelectedTag?: boolean
  showBack?: boolean
  tags?: string[]
}) => {
  const router = useRouter()
  const { clearAll, setPhotoType, setSelectedTag } = useLocalStorage()

  return (
    <aside className="fixed bottom-0 right-0 h-96 w-4/12 bg-e17-primary-200">
      {/* action buttons */}
      <div className="absolute right-0 flex h-screen w-10/12 flex-col justify-between px-10 pb-4">
        <header className="flex w-full items-start justify-between">
          <div className="flex items-center gap-4 pt-8 xl:gap-6 xl:pt-12">
            {/* go back button */}
            {showBack && (
              <button
                className="bg-transparent"
                onClick={() => {
                  clearAll()
                  router.push('/website')
                }}
              >
                <ArrowLeft className="h-8 w-8 stroke-[2.5px] text-white xl:h-14 xl:w-14 xl:stroke-[3px] " />
              </button>
            )}
          </div>
        </header>
      </div>

      {/* buttons */}
      <div className="">
        {/* show type buttons */}
        {showType && (
          <>
            <Title>Kies een perspectief</Title>
            <div className="grid grid-cols-2 gap-4 xl:gap-6">
              <Button
                handleClick={() => {
                  setPhotoType('skyPics')
                  router.push('/website/original')
                }}
              >
                vanuit
                <br />
                de lucht
              </Button>
              <Button
                handleClick={() => {
                  setPhotoType('groundPics')
                  router.push('/website/original')
                }}
              >
                vanop
                <br />
                ooghoogte
              </Button>
            </div>
          </>
        )}

        {/* show tags buttons */}
        {showTags && (
          <>
            <Title>Welke toekomst kies jij?</Title>
            <div className="grid grid-cols-2 gap-4 xl:gap-6">
              {tags?.map(tag => (
                <Button
                  key={tag}
                  handleClick={() => {
                    setSelectedTag(tag)
                    router.push('/website/detail')
                  }}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </>
        )}

        {/* show random & orignal */}
        {showSelectedTag && (
          <>
            <div className="grid grid-cols-2 gap-4 xl:gap-6">
              <Button
                handleClick={() => {
                  //   config.photoType && setRandomPhotoIdByType(config.photoType)
                  setSelectedTag('')
                  router.push('/website/original')
                }}
              >
                nieuwe foto
              </Button>
              <Button
                handleClick={() => {
                  //   updateConfig({
                  //     selectedTag: '',
                  //     currentPage: '/original',
                  //   })

                  setSelectedTag('')
                  router.push('/website/original')
                }}
              >
                andere toekomst
              </Button>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
