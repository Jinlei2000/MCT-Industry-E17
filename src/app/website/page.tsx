'use client'
import Button from '@/components/Button'
import Title from '@/components/Title'
import Video from '@/components/Video'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useRouter } from 'next/navigation'

export default () => {
  const { setPhotoType } = useLocalStorage()
  const router = useRouter()

  return (
    <main className="relative h-screen w-screen">
      {/* video with skeleton */}
      <Video />

      {/* controls */}
      <aside className="fixed bottom-0 right-0 h-96 w-4/12 bg-e17-primary-200">
        {/* buttons */}
        <div className="grid h-full place-content-center">
          {/* show type buttons */}

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
        </div>
      </aside>
    </main>
  )
}
