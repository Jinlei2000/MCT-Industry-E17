'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function ChooseScreen() {
  return (
    <main className="">
      <Image
        className="object-cover"
        src="/images/hong-kong-traffic-view.png"
        alt="Hong Kong Traffic View Background Image"
        fill
        priority
        
      />

      <div className="absolute z-10 h-screen w-screen bg-e17-primary-200/95">
        <div className="flex h-screen flex-col items-center justify-center">
          <p className="mb-6 text-center text-2xl font-bold text-white md:mb-8 md:text-3xl lg:text-4xl xl:text-6xl">
            Kies een scherm
          </p>
          <div className="flex gap-6">
            <Link
              href="/home"
              className="flex h-20 w-44 items-center justify-center bg-e17-secondary-700 text-2xl font-bold text-white xl:h-24 xl:w-60 xl:text-3xl"
            >
              display
            </Link>
            <Link
              href="/controls"
              className="flex h-20 w-44 items-center justify-center bg-e17-secondary-700 text-center text-2xl font-bold text-white xl:h-24 xl:w-60 xl:text-3xl"
            >
              controls
            </Link>
          </div>
        </div>
        <div className="flex "></div>
      </div>
    </main>
  )
}
