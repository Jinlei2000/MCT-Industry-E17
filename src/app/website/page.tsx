'use client'
import Button from '@/components/Button'
import Title from '@/components/Title'
import Video from '@/components/Video'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useRouter } from 'next/navigation'

export default () => {
  const { setConfig } = useLocalStorage()
  const router = useRouter()

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {/* video with skeleton */}
      <Video />

      {/* controls */}
      <aside className="fixed bottom-0 right-0 h-96 w-4/12 bg-e17-primary-200">
        {/* buttons */}
        <div className="grid h-full place-content-center">
          {/* show type buttons */}
          <h1 className="text-3xl font-extrabold text-white">
            Kies een perspectief
          </h1>
          <div className="grid grid-cols-2 gap-4 xl:gap-6">
            <Button
              handleClick={() => {
                setConfig({ photoType: 'skyPics' })
                router.push('/website/original')
              }}
            >
              vanuit
              <br />
              de lucht
            </Button>
            <Button
              handleClick={() => {
                setConfig({ photoType: 'groundPics' })
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
