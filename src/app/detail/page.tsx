'use client'
import SideBar from '@/components/SideBar'
import useFireStore from '@/hooks/useFireStore'
import IConfig from '@/interfaces/IConfig'
import IPhoto from '@/interfaces/IPhoto'
import { useEffect, useState } from 'react'

export default () => {
  // const { getPhotoById, listenToChangeConfig } = useFireStore()
  // const [photo, setPhoto] = useState<IPhoto>({})
  // const [config, setConfig] = useState<IConfig>({})
  // const [generatedPics, setGeneratedPics] = useState<string[]>([])

  // // set 4 pics randomly of a tag from generatedPics
  // const randomPics = (generatedPics: any) => {
  //   let randomPics: string[] = []
  //   const tag = config.selectedTag
  //   if (tag && tag !== '') {
  //     const images = generatedPics[tag] ? generatedPics[tag] : []

  //     if (images.length > 4) {
  //       randomPics = images.sort(() => 0.5 - Math.random()).slice(0, 4)
  //     } else {
  //       randomPics = images
  //     }

  //     setGeneratedPics(randomPics)
  //   }
  // }

  // useEffect(() => {
  //   listenToChangeConfig((config: IConfig) => {
  //     setConfig(config)
  //   }, '/')
  // }, [])

  // useEffect(() => {
  //   getPhotoById().then(photo => {
  //     setPhoto(photo)

  //     // set 4 pics randomly of a tag from generatedPics when more than 4 pics
  //     randomPics(photo.generatedPics)
  //   })
  // }, [config])

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <SideBar title="Originele foto" />
      {true ? (
        <div className="fixed bottom-0 left-0 m-12 max-w-md border-2 border-white/100 bg-black/40 p-2 ">
          <div className="font text-3xl text-white opacity-100">
            De Europese weg 17 is ongeveer 696 kilometer lang.
          </div>
        </div>
      ) : (
        <div></div>
      )}
      
      {true ? (
        // show original photo

        <img
          className="h-screen w-screen"
          src="https://firebasestorage.googleapis.com/v0/b/firestore-fa445.appspot.com/o/1%2F1.jpg?alt=media&token=e864deff-cde2-4c32-a42d-cbbfa6850b64"
          alt={'Original photo'}
        />
      ) : (
        // show 4 pics randomly of a tag from generatedPics
          <div className="grid grid-cols-2 w-5/6 h-screen overflow-hidden self-stretch">
            <img
              className="object-cover"
              src="https://firebasestorage.googleapis.com/v0/b/firestore-fa445.appspot.com/o/1%2F1.jpg?alt=media&token=e864deff-cde2-4c32-a42d-cbbfa6850b64"
              alt={`AI generated photo of `}
            />
            <img
              className="object-cover"
              src="https://firebasestorage.googleapis.com/v0/b/firestore-fa445.appspot.com/o/1%2F1-2_UT.jpg?alt=media&token=c991ef61-9b1b-4fac-8534-c19e170c9333"
              alt={`AI generated photo of `}
            />
            <img
              className="object-cover"
              src="https://firebasestorage.googleapis.com/v0/b/firestore-fa445.appspot.com/o/1%2F1-3_UT.jpg?alt=media&token=987987fd-43f0-4d68-a7a8-7ae35f909215"
              alt={`AI generated photo of `}
            />
            <img
              className="object-cover"
              src="https://firebasestorage.googleapis.com/v0/b/firestore-fa445.appspot.com/o/1%2F1-4_UT.jpg?alt=media&token=59d86c04-e35f-4624-8ed0-b4044de32e41"
              alt={`AI generated photo of `}
            />
            
          </div>

      )}
    </main>
  )
}
