'use client'
import Button from '@/components/Button'
import useFireStore from '@/hooks/useFireStore'
import IConfig from '@/interfaces/IConfig'
import IPhoto from '@/interfaces/IPhoto'
import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import useHostUrl from '@/hooks/useHostUrl'
import ImageSkeleton from '@/components/ImageSkeleton'

export default () => {
  const {
    updateConfig,
    setRandomPhotoIdByType,
    getPhotoById,
    listenToChangeConfig,
  } = useFireStore()
  const { getURL } = useHostUrl()

  const [photo, setPhoto] = useState<IPhoto>({})
  const [config, setConfig] = useState<IConfig>({})
  const [isLoaded, setIsLoaded] = useState(true)
  const [controls, setControls] = useState<any>({
    showType: true,
    showTags: false,
    showBack: false,
    showSelectedTag: false,
  })

  useEffect(() => {
    listenToChangeConfig((config: IConfig) => {
      setControls({
        showType: config?.currentPage === '/',
        showTags:
          config?.currentPage === '/original' && config?.selectedTag === '',
        showBack: config?.currentPage !== '/',
        showSelectedTag:
          config?.selectedTag != '' && config?.currentPage === '/detail',
      })

      setConfig(config)
    }, false)
  }, [])

  useEffect(() => {
    getPhotoById().then(photo => {
      // console.log(photo)
      setPhoto(photo)
    })
  }, [config])

  return (
    <main>
      {/* loading bg image */}
      {isLoaded && (
        <div className="absolute left-0 top-0 z-10 h-screen w-screen bg-gray-400">
          <ImageSkeleton className="h-full w-6/12" border={false} />
        </div>
      )}

      {/* background image */}
      <Image
        className="h-screen w-screen object-cover"
        src="/hong-kong-traffic-view.png"
        alt="Hong Kong Traffic View"
        fill={true}
        quality={100}
        onLoadingComplete={() => setIsLoaded(false)}
      />

      {/* controls */}
      <aside className="fixed right-0 z-20 w-7/12">
        {/* action buttons */}
        <div className="absolute right-0 flex h-screen w-10/12 flex-col justify-between bg-e17-primary-200 px-10 pb-8 opacity-95 xl:px-16 xl:pb-12">
          <header className="flex w-full items-start justify-between">
            <div className="flex items-center gap-4 pt-8 xl:gap-6 xl:pt-12">
              {/* go back button */}
              {controls.showBack && (
                <button
                  className="bg-transparent"
                  onClick={() => {
                    updateConfig({
                      currentPage: '/',
                      photoId: '',
                      photoType: '',
                      selectedTag: '',
                    })
                  }}
                >
                  <ArrowLeft className="h-8 w-8 stroke-[2.5px] text-white xl:h-14 xl:w-14 xl:stroke-[3px] " />
                </button>
              )}
              {/* logo leiedal */}
              <svg
                className="h-16 w-16 fill-e17-secondary-700 xl:h-32 xl:w-32"
                viewBox="0 0 70.6 70.6"
              >
                <path d="M66.49,4.11V66.49H4.11V4.11H66.49M70.6,0H0V70.6H70.6Z" />
                <path d="M24.84,30.32v3.45h-11V18.39h3.69V30.32Z" />
                <path d="M38,30.32v3.45H26.65V18.39H37.83v3.45H30.34v2.53H36.2v3.22H30.34v2.73Z" />
                <path d="M39.83,33.77V18.39h3.69V33.77Z" />
                <path d="M56.72,30.32v3.45H45.41V18.39H56.59v3.45H49.1v2.53H55v3.22H49.1v2.73Z" />
                <path d="M20.6,36.84a7.64,7.64,0,0,1,7.94,7.34c0,.14,0,.28,0,.41,0,4.62-3.56,7.62-7.95,7.62H13.88V36.84Zm0,11.93a4,4,0,0,0,4.11-3.86c0-.1,0-.21,0-.32a4.09,4.09,0,0,0-3.88-4.3H17.57v8.48Z" />
                <path d="M39.27,49.8H33.19l-.88,2.41h-4l6.15-15.37H38l6.15,15.37h-4Zm-1.18-3.23-1.1-3c-.33-.87-.73-2.26-.75-2.26h0s-.42,1.39-.75,2.26l-1.1,3Z" />
                <path d="M56.36,48.77v3.45h-11V36.84H49.1V48.77Z" />
              </svg>
              {/* logo mct */}
              <svg
                className="h-16 w-16 fill-e17-secondary-700 xl:h-32 xl:w-32"
                viewBox="0 0 345.41 309.52"
              >
                <path d="m193.18,124.8l-25.41,14.03-25.41-14.03v29.31l15.23,8.79c6.3,3.64,14.07,3.64,20.37,0l15.23-8.79v-29.31Z" />
                <path d="m232.03,33.95L177.95,2.73c-6.3-3.64-14.07-3.64-20.37,0l-54.08,31.22c-6.3,3.64-10.19,10.36-10.19,17.64v62.45c0,7.28,3.88,14,10.19,17.64l9.41,5.44V55.04c0-3.38,3.66-5.49,6.59-3.8l48.3,27.21,48.23-27.21c2.93-1.69,6.59.42,6.59,3.8v82.08l9.41-5.44c6.3-3.64,10.19-10.36,10.19-17.64v-62.45c0-7.28-3.88-14-10.19-17.64Z" />
                <path d="m.26,174.5c0-5.1,3.19-8.51,7.66-8.51s7.66,3.4,7.66,8.51v20.84h.21c3.19-3.93,9.14-5.32,13.93-5.32,12.01,0,20.95,7.66,20.95,20.63v29.35c0,5.1-3.19,8.51-7.66,8.51s-7.66-3.4-7.66-8.51v-26.69c0-7.12-4.47-10.53-9.99-10.53-6.27,0-9.78,4.57-9.78,10.53v26.69c0,5.1-3.19,8.51-7.66,8.51s-7.66-3.4-7.66-8.51v-65.5Z" />
                <path d="m114.14,219.69c0,15.95-10.95,29.45-27.43,29.45s-27.43-13.5-27.43-29.45,11.27-29.66,27.43-29.66,27.43,14.14,27.43,29.66Zm-39.55,0c0,7.34,3.83,15.42,12.12,15.42s12.12-8.08,12.12-15.42-3.72-15.63-12.12-15.63-12.12,8.29-12.12,15.63Z" />
                <path d="m119.03,204.06c-1.06-3.08-1.59-5-1.59-7.23,0-3.4,3.19-6.17,7.66-6.17,3.72,0,6.38,2.45,7.23,6.06l8.82,29.24h.21l8.93-28.6c1.17-4.15,3.3-6.7,7.76-6.7s6.59,2.55,7.76,6.7l8.93,28.6h.21l8.82-29.24c.85-3.62,3.51-6.06,7.23-6.06,4.47,0,7.66,2.76,7.66,7.44,0,1.7-.74,3.4-1.49,5.74l-13.08,36.89c-1.59,4.47-4.25,7.76-9.25,7.76-4.68,0-7.44-2.66-8.83-7.12l-7.87-24.67h-.21l-7.87,24.67c-1.38,4.47-4.15,7.12-8.83,7.12-5,0-7.66-3.3-9.25-7.76l-12.97-36.68Z" />
                <path d="m218.24,224.69c1.06,7.55,7.34,11.06,14.46,11.06,7.87,0,13.29-6.17,17.33-6.17,3.3,0,6.27,3.3,6.27,6.59,0,6.59-13.61,12.97-24.99,12.97-17.22,0-28.71-12.55-28.71-29.45,0-15.52,11.27-29.66,27.43-29.66s27.54,15.1,27.54,27.86c0,4.57-2.02,6.8-6.7,6.8h-32.64Zm24.03-10.21c-.85-6.7-5.1-11.7-12.23-11.7s-11.38,5.21-12.12,11.7h24.35Z" />
                <path d="m297.35,207.89c-2.87,0-8.72-4.47-13.72-4.47-2.76,0-5.21,1.28-5.21,4.25,0,7.12,26.58,6.06,26.58,23.5,0,10.21-8.61,17.97-21.8,17.97-8.61,0-21.37-4.89-21.37-11.8,0-2.34,2.34-6.8,6.59-6.8,5.95,0,8.61,5.21,15.84,5.21,4.68,0,6.06-1.49,6.06-4.36,0-7.02-26.58-5.95-26.58-23.5,0-10.63,8.61-17.86,20.73-17.86,7.55,0,19.14,3.51,19.14,11.06,0,3.51-2.66,6.8-6.27,6.8Z" />
                <path d="m318.41,204.7h-3.4c-4.15,0-6.7-2.55-6.7-6.7,0-3.83,2.87-6.7,6.7-6.7h3.4v-9.14c0-5.1,3.19-8.51,7.66-8.51s7.66,3.4,7.66,8.51v9.14h4.36c3.93,0,7.34,1.81,7.34,6.7s-3.4,6.7-7.34,6.7h-4.36v35.3c0,5.1-3.19,8.51-7.66,8.51s-7.66-3.4-7.66-8.51v-35.3Z" />
                <path d="m10.32,287.43c2.19,0,6.45.72,6.45,3.36,0,1.08-.75,2.01-1.86,2.01-1.23,0-2.07-1.05-4.59-1.05-3.72,0-5.64,3.15-5.64,6.81s1.95,6.63,5.64,6.63c2.52,0,3.54-1.26,4.77-1.26,1.35,0,1.98,1.35,1.98,2.04,0,2.88-4.53,3.54-6.75,3.54-6.09,0-10.32-4.83-10.32-11.04s4.2-11.04,10.32-11.04Z" />
                <path d="m19.78,290.13c0-1.44.81-2.34,2.31-2.34h5.28c4.62,0,7.47,2.07,7.47,6.78,0,3.3-2.49,5.19-5.55,5.67l5.1,5.46c.42.45.6.9.6,1.32,0,1.17-.93,2.31-2.25,2.31-.54,0-1.26-.21-1.74-.78l-6.66-8.07h-.06v6.51c0,1.5-.96,2.34-2.25,2.34s-2.25-.84-2.25-2.34v-16.87Zm4.5,7.11h3.09c1.65,0,2.79-.99,2.79-2.67s-1.14-2.64-2.79-2.64h-3.09v5.31Z" />
                <path d="m37.28,290.4c0-1.5.75-2.61,2.34-2.61h7.44c1.44,0,2.13,1.02,2.13,2.07s-.72,2.07-2.13,2.07h-5.28v4.38h4.92c1.47,0,2.19,1.02,2.19,2.07s-.75,2.07-2.19,2.07h-4.92v4.56h5.55c1.44,0,2.13,1.02,2.13,2.07s-.72,2.07-2.13,2.07h-7.74c-1.32,0-2.31-.9-2.31-2.25v-16.51Z" />
                <path d="m56.73,289.92c.51-1.38,1.68-2.49,3.21-2.49s2.7,1.05,3.21,2.49l5.88,16.33c.18.48.24.9.24,1.11,0,1.17-.96,1.98-2.07,1.98-1.26,0-1.89-.66-2.19-1.56l-.9-2.82h-8.34l-.9,2.79c-.3.93-.93,1.59-2.16,1.59s-2.22-.9-2.22-2.1c0-.48.15-.84.21-.99l6.03-16.33Zm.33,10.89h5.7l-2.79-8.7h-.06l-2.85,8.7Z" />
                <path d="m72.12,291.93h-3.27c-1.44,0-2.04-1.05-2.04-2.07s.75-2.07,2.04-2.07h11.04c1.29,0,2.04,1.02,2.04,2.07s-.6,2.07-2.04,2.07h-3.27v15.06c0,1.5-.96,2.34-2.25,2.34s-2.25-.84-2.25-2.34v-15.06Z" />
                <path d="m83.53,289.95c0-1.5.96-2.34,2.25-2.34s2.25.84,2.25,2.34v17.05c0,1.5-.96,2.34-2.25,2.34s-2.25-.84-2.25-2.34v-17.05Z" />
                <path d="m90.42,290.88c-.15-.39-.21-.69-.21-1.11,0-1.26,1.11-2.16,2.31-2.16,1.02,0,1.65.66,2.04,1.47l4.65,12.48,4.65-12.48c.39-.81,1.02-1.47,2.04-1.47,1.2,0,2.31.9,2.31,2.16,0,.42-.06.72-.21,1.11l-6.57,16.72c-.39.96-.9,1.74-2.22,1.74s-1.83-.78-2.22-1.74l-6.57-16.72Z" />
                <path d="m109.51,290.4c0-1.5.75-2.61,2.34-2.61h7.44c1.44,0,2.13,1.02,2.13,2.07s-.72,2.07-2.13,2.07h-5.28v4.38h4.92c1.47,0,2.19,1.02,2.19,2.07s-.75,2.07-2.19,2.07h-4.92v4.56h5.55c1.44,0,2.13,1.02,2.13,2.07s-.72,2.07-2.13,2.07h-7.74c-1.32,0-2.31-.9-2.31-2.25v-16.51Z" />
                <path d="m137.22,291.93h-3.27c-1.44,0-2.04-1.05-2.04-2.07s.75-2.07,2.04-2.07h11.04c1.29,0,2.04,1.02,2.04,2.07s-.6,2.07-2.04,2.07h-3.27v15.06c0,1.5-.96,2.34-2.25,2.34s-2.25-.84-2.25-2.34v-15.06Z" />
                <path d="m148.3,290.4c0-1.5.75-2.61,2.34-2.61h7.44c1.44,0,2.13,1.02,2.13,2.07s-.72,2.07-2.13,2.07h-5.28v4.38h4.92c1.47,0,2.19,1.02,2.19,2.07s-.75,2.07-2.19,2.07h-4.92v4.56h5.55c1.44,0,2.13,1.02,2.13,2.07s-.72,2.07-2.13,2.07h-7.74c-1.32,0-2.31-.9-2.31-2.25v-16.51Z" />
                <path d="m171.83,287.43c2.19,0,6.45.72,6.45,3.36,0,1.08-.75,2.01-1.86,2.01-1.23,0-2.07-1.05-4.59-1.05-3.72,0-5.64,3.15-5.64,6.81s1.95,6.63,5.64,6.63c2.52,0,3.54-1.26,4.77-1.26,1.35,0,1.98,1.35,1.98,2.04,0,2.88-4.53,3.54-6.75,3.54-6.09,0-10.32-4.83-10.32-11.04s4.2-11.04,10.32-11.04Z" />
                <path d="m180.88,289.95c0-1.5.96-2.34,2.25-2.34s2.25.84,2.25,2.34v6.36h9.42v-6.36c0-1.5.96-2.34,2.25-2.34s2.25.84,2.25,2.34v17.05c0,1.5-.96,2.34-2.25,2.34s-2.25-.84-2.25-2.34v-6.54h-9.42v6.54c0,1.5-.96,2.34-2.25,2.34s-2.25-.84-2.25-2.34v-17.05Z" />
                <path d="m202.43,289.95c0-1.5.96-2.34,2.25-2.34.57,0,1.5.45,1.89.99l9.51,12.69h.06v-11.34c0-1.5.96-2.34,2.25-2.34s2.25.84,2.25,2.34v17.05c0,1.5-.96,2.34-2.25,2.34-.57,0-1.47-.45-1.89-.99l-9.51-12.54h-.06v11.19c0,1.5-.96,2.34-2.25,2.34s-2.25-.84-2.25-2.34v-17.05Z" />
                <path d="m222.93,298.47c0-6.24,4.2-11.04,10.32-11.04s10.32,4.95,10.32,11.04-4.17,11.04-10.32,11.04-10.32-4.83-10.32-11.04Zm15.97,0c0-3.63-1.89-6.9-5.64-6.9s-5.64,3.27-5.64,6.9,1.83,6.9,5.64,6.9,5.64-3.24,5.64-6.9Z" />
                <path d="m246.04,289.95c0-1.5.96-2.34,2.25-2.34s2.25.84,2.25,2.34v15.07h5.34c1.53,0,2.19,1.14,2.16,2.16-.06.99-.84,1.98-2.16,1.98h-7.5c-1.47,0-2.34-.96-2.34-2.46v-16.75Z" />
                <path d="m256.62,298.47c0-6.24,4.2-11.04,10.32-11.04s10.32,4.95,10.32,11.04-4.17,11.04-10.32,11.04-10.32-4.83-10.32-11.04Zm15.97,0c0-3.63-1.89-6.9-5.64-6.9s-5.64,3.27-5.64,6.9,1.83,6.9,5.64,6.9,5.64-3.24,5.64-6.9Z" />
                <path d="m296.45,296.49c1.89,0,2.64.96,2.64,2.88,0,5.79-3.78,10.14-9.78,10.14s-10.32-4.83-10.32-11.04,4.2-11.04,10.32-11.04c4.53,0,8.25,2.13,8.25,4.23,0,1.29-.81,2.1-1.86,2.1-2.04,0-2.46-2.19-6.39-2.19s-5.64,3.27-5.64,6.9,1.83,6.9,5.64,6.9c2.37,0,5.1-1.32,5.1-4.74h-3.06c-1.23,0-2.1-.87-2.1-2.1s.96-2.04,2.1-2.04h5.1Z" />
                <path d="m301.13,289.95c0-1.5.96-2.34,2.25-2.34s2.25.84,2.25,2.34v17.05c0,1.5-.96,2.34-2.25,2.34s-2.25-.84-2.25-2.34v-17.05Z" />
                <path d="m308.94,290.4c0-1.5.75-2.61,2.34-2.61h7.44c1.44,0,2.13,1.02,2.13,2.07s-.72,2.07-2.13,2.07h-5.28v4.38h4.92c1.47,0,2.19,1.02,2.19,2.07s-.75,2.07-2.19,2.07h-4.92v4.56h5.55c1.44,0,2.13,1.02,2.13,2.07s-.72,2.07-2.13,2.07h-7.74c-1.32,0-2.31-.9-2.31-2.25v-16.51Z" />
                <path d="m336.07,290.43c0,1.17-.78,2.22-2.01,2.22s-2.19-.9-3.99-.9c-1.29,0-2.46.69-2.46,1.95,0,3.09,10.02,1.11,10.02,8.85,0,4.29-3.54,6.96-7.68,6.96-2.31,0-7.29-.54-7.29-3.36,0-1.17.78-2.13,2.01-2.13,1.41,0,3.09,1.17,5.04,1.17s3.06-1.11,3.06-2.58c0-3.54-10.02-1.41-10.02-8.37,0-4.2,3.45-6.81,7.44-6.81,1.68,0,5.88.63,5.88,3Z" />
                <g>
                  <path d="m74.87,261.92c.18-1.08,1.35-2.31,2.94-2.31,1.5,0,2.67,1.08,3,2.16l3.54,11.89h.06l3.54-11.89c.33-1.08,1.5-2.16,3-2.16,1.59,0,2.76,1.23,2.94,2.31l2.79,16.75c.03.18.03.36.03.51,0,1.32-.96,2.16-2.16,2.16-1.53,0-2.13-.69-2.34-2.1l-1.77-12.22h-.06l-3.6,12.58c-.21.72-.78,1.74-2.4,1.74s-2.19-1.02-2.4-1.74l-3.6-12.58h-.06l-1.77,12.22c-.21,1.41-.81,2.1-2.34,2.1-1.2,0-2.16-.84-2.16-2.16,0-.15,0-.33.03-.51l2.79-16.75Z" />
                  <path d="m98.44,261.95c0-1.5.96-2.34,2.25-2.34s2.25.84,2.25,2.34v10.48c0,2.76,1.77,4.95,4.62,4.95s4.59-2.31,4.59-4.95v-10.48c0-1.5.96-2.34,2.25-2.34s2.25.84,2.25,2.34v10.72c0,5.04-4.14,8.85-9.1,8.85s-9.12-3.75-9.12-8.85v-10.72Z" />
                  <path d="m119.48,261.95c0-1.5.96-2.34,2.25-2.34s2.25.84,2.25,2.34v15.07h5.34c1.53,0,2.19,1.14,2.16,2.16-.06.99-.84,1.98-2.16,1.98h-7.5c-1.47,0-2.34-.96-2.34-2.46v-16.75Z" />
                  <path d="m132.84,263.93h-3.27c-1.44,0-2.04-1.05-2.04-2.07s.75-2.07,2.04-2.07h11.05c1.29,0,2.04,1.02,2.04,2.07s-.6,2.07-2.04,2.07h-3.27v15.07c0,1.5-.96,2.34-2.25,2.34s-2.25-.84-2.25-2.34v-15.07Z" />
                  <path d="m143.95,261.95c0-1.5.96-2.34,2.25-2.34s2.25.84,2.25,2.34v17.05c0,1.5-.96,2.34-2.25,2.34s-2.25-.84-2.25-2.34v-17.05Z" />
                  <path d="m153.64,261.92c.18-1.08,1.35-2.31,2.94-2.31,1.5,0,2.67,1.08,3,2.16l3.54,11.89h.06l3.54-11.89c.33-1.08,1.5-2.16,3-2.16,1.59,0,2.76,1.23,2.94,2.31l2.79,16.75c.03.18.03.36.03.51,0,1.32-.96,2.16-2.16,2.16-1.53,0-2.13-.69-2.34-2.1l-1.77-12.22h-.06l-3.6,12.58c-.21.72-.78,1.74-2.4,1.74s-2.19-1.02-2.4-1.74l-3.6-12.58h-.06l-1.77,12.22c-.21,1.41-.81,2.1-2.34,2.1-1.2,0-2.16-.84-2.16-2.16,0-.15,0-.33.03-.51l2.79-16.75Z" />
                  <path d="m177.87,262.4c0-1.5.75-2.61,2.34-2.61h7.44c1.44,0,2.13,1.02,2.13,2.07s-.72,2.07-2.13,2.07h-5.28v4.38h4.92c1.47,0,2.19,1.02,2.19,2.07s-.75,2.07-2.19,2.07h-4.92v4.56h5.55c1.44,0,2.13,1.02,2.13,2.07s-.72,2.07-2.13,2.07h-7.74c-1.32,0-2.31-.9-2.31-2.25v-16.51Z" />
                  <path d="m192.07,262.1c0-1.38.96-2.31,2.31-2.31h4.98c6.72,0,10.56,4.32,10.56,10.99,0,6.3-4.08,10.38-10.27,10.38h-5.22c-.99,0-2.37-.54-2.37-2.25v-16.81Zm4.5,14.92h3.03c3.87,0,5.64-2.85,5.64-6.45,0-3.84-1.8-6.63-5.94-6.63h-2.73v13.09Z" />
                  <path d="m212.39,261.95c0-1.5.96-2.34,2.25-2.34s2.25.84,2.25,2.34v17.05c0,1.5-.96,2.34-2.25,2.34s-2.25-.84-2.25-2.34v-17.05Z" />
                  <path d="m224.85,261.92c.51-1.38,1.68-2.49,3.21-2.49s2.7,1.05,3.21,2.49l5.88,16.33c.18.48.24.9.24,1.11,0,1.17-.96,1.98-2.07,1.98-1.26,0-1.89-.66-2.19-1.56l-.9-2.82h-8.34l-.9,2.79c-.3.93-.93,1.59-2.16,1.59s-2.22-.9-2.22-2.1c0-.48.15-.84.21-.99l6.03-16.33Zm.33,10.89h5.7l-2.79-8.7h-.06l-2.85,8.7Z" />
                </g>
                <path d="m260.18,272.97l1.17-1.35c.78-.9,1.32-1.38,2.28-1.38.87,0,1.65.75,1.65,1.89,0,.81-.69,1.77-1.65,2.85l-.75.81,2.04,2.31c.42.48.66.81.66,1.5,0,1.02-.96,2.01-2.1,2.01-.69,0-1.14-.21-1.59-.69l-2.07-2.16c-1.95,1.71-3.93,2.85-6.6,2.85-4.02,0-7.35-2.28-7.35-6.48,0-2.97,2.07-5.16,4.53-6.51-1.17-1.17-1.98-2.37-1.98-4.05,0-3.42,3.21-5.04,6.3-5.04,2.7,0,6.12,1.53,6.12,4.71,0,2.4-1.89,4.26-3.81,5.25l3.15,3.48Zm-7.41-1.89c-1.35.87-2.58,1.92-2.58,3.63,0,1.89,1.29,2.94,3.12,2.94,1.62,0,2.67-.66,3.81-1.74l-4.35-4.83Zm1.95-8.13c-.78,0-1.8.6-1.8,1.5s.42,1.44,1.59,2.58c.9-.45,2.19-1.26,2.19-2.34,0-1.35-1.2-1.74-1.98-1.74Z" />
              </svg>
            </div>
            {/* 50 jaar E3/E17 Logo */}
            <svg
              className="-mt-4 w-28 xl:-mt-8 xl:w-48"
              viewBox="0 0 153.925 239.241"
            >
              <g transform="translate(-22.233 -38.836)" opacity="0.95">
                <path
                  d="M21.151,218.969V23.28c0-12.271,12.08-22.233,26.959-22.233H149.226c14.265,0,25.85,9.554,25.85,21.319v196.6c0,11.764-11.585,21.319-25.85,21.319H47c-14.265,0-25.85-9.554-25.85-21.319Z"
                  transform="translate(1.083 37.789)"
                  fill="#fff"
                />
                <path
                  d="M43.542,268.07V225.077H75.062v9.347H54.625v7.156H74.607v9.413H54.625v7.737H75.062v9.347H43.542Z"
                  fill="#204296"
                />
                <path
                  d="M97.084,268.07V239.256l-7.222,7.288L83.545,239.9l15.018-14.826h9.6V268.07H97.077Z"
                  fill="#204296"
                />
                <path
                  d="M125.357,268.07l14.569-33.329H118.974V225.07h33.712v7.671l-15.15,35.323H125.35Z"
                  fill="#204296"
                />
                <path
                  d="M129.35,187.338c-14.582,0-24.457-7.175-30.154-17.3l1.862,46.624h52.2l-18.43-29.685a40.864,40.864,0,0,1-5.466.363Z"
                  fill="#204296"
                />
                <path
                  d="M93.737,153.4a40.715,40.715,0,0,1-13.565,4.218L43.614,216.653H95.42l2.271-49.575A49.189,49.189,0,0,1,93.744,153.4Z"
                  fill="#204296"
                />
                <path
                  d="M156.9,180.169h-2.218V193.2a12.116,12.116,0,0,1-6.416,10.687l-.271.145.172.251,1.116,1.611.139.2.218-.119a14.638,14.638,0,0,0,7.539-12.78V180.169h-.271Z"
                  fill="#2ab573"
                />
                <path
                  d="M48.565,203.61a12.113,12.113,0,0,1-5.9-10.4V153.164h-2.5v40.043a14.624,14.624,0,0,0,6.984,12.463l.218.132.145-.211,1.129-1.6.172-.238-.251-.152ZM47.3,205.439a14.514,14.514,0,0,1-1.941-1.426,13.959,13.959,0,0,0,1.941,1.426l1.129-1.6Z"
                  fill="#2ab573"
                />
                <path
                  d="M153.761,113.068c-6.251-6.238-14.694-9.539-24.411-9.539-10.991,0-19.308,4.066-25.183,10.39a26.118,26.118,0,0,0-22.5-12.054,30.487,30.487,0,0,0-16.325,4.891V97.886h37.521V75.554H55.1A14.937,14.937,0,0,0,40.182,90.473v34.649l.211.046,17.678,4.066.145.033.106-.1.383-.363c3.736-3.518,7.981-5.083,13.77-5.083s9.129,2.066,9.129,5.822c0,2.984-2.581,6.179-9.836,6.179s-14.674-2.574-19.493-6.555l-.772-.64-.218-.178-.172.218-13.579,17.2-.158.2.191.172.68.621c8.232,7.466,19.9,11.42,33.765,11.42,8.6,0,15.948-1.677,21.738-4.773,2.548,17.935,13.836,33.936,35.613,33.936,9.255,0,17.09-2.865,23.289-8.509,8.192-7.466,12.892-19.658,12.892-33.448s-4.179-24.728-11.77-32.306Zm-9.506-6.225a32.275,32.275,0,0,0-3.446-1.32A32.277,32.277,0,0,1,144.255,106.843Zm-7.684-.409a38.069,38.069,0,0,0-7.228-.667A33.9,33.9,0,0,0,116,108.322a33.924,33.924,0,0,1,13.341-2.555A38.069,38.069,0,0,1,136.572,106.434Zm-42.855,44.5Zm-.271.158a31.99,31.99,0,0,1-5.222,2.363A31.99,31.99,0,0,0,93.446,151.091Zm-.013-5.723c0-9.215,2.2-18.463,6.832-25.9-4.634,7.426-6.832,16.681-6.832,25.9,0,1.756.086,3.512.244,5.261h0C93.519,148.886,93.433,147.123,93.433,145.367Zm2.4,4.192a23.79,23.79,0,0,0,9.955-16.892A23.79,23.79,0,0,1,95.836,149.559Zm-.026-.323q-.139-1.931-.139-3.875c0-9.77,2.594-19.579,8.073-26.959a25.431,25.431,0,0,1,2.027,10.186c0,8.945-3.525,15.988-9.961,20.642ZM81.657,104.091a25.469,25.469,0,0,1,6.911.97,25.214,25.214,0,0,0-6.911-.97,26.933,26.933,0,0,0-3.34.211A26.851,26.851,0,0,1,81.657,104.091ZM67.24,108.2a30.514,30.514,0,0,0-2.574,1.71C65.5,109.293,66.369,108.725,67.24,108.2Zm33.375-30.425h0V95.635h0Zm-54.143.845a14.583,14.583,0,0,1,8.615-2.805h0a14.572,14.572,0,0,0-9.776,3.749C45.68,79.237,46.07,78.921,46.472,78.624Zm11.644,50.34L40.439,124.9l17.678,4.066.191-.178Zm14.338-5.519a22.086,22.086,0,0,0-7.756,1.241,22.086,22.086,0,0,1,7.756-1.241,19.672,19.672,0,0,1,2.977.211,19.715,19.715,0,0,0-2.977-.2Zm-.706,14.509a15.724,15.724,0,0,0,8.106-1.855,15.724,15.724,0,0,1-8.106,1.855,35.068,35.068,0,0,1-5.974-.528A34.468,34.468,0,0,0,71.748,137.955Zm-14.08-5.129a26.07,26.07,0,0,1-5.591-3.459A26.168,26.168,0,0,0,57.668,132.826Zm-19.942,13.1h0l.475.436Zm3.063-.271,10.872-13.777a34.717,34.717,0,0,0,20.081,6.337c9.116,0,12.344-4.68,12.344-8.687,0-2.508-1.135-8.337-11.638-8.337-6.146,0-10.912,1.69-14.991,5.314L42.671,123.1V90.453a12.418,12.418,0,0,1,12.4-12.4h45.258V95.357H62.811v16.252l.436-.323,1.564-1.155a28.3,28.3,0,0,1,16.833-5.769,24.235,24.235,0,0,1,20.807,11.526c-6.317,7.935-9.308,18.721-9.308,29.474,0,1.809.092,3.617.257,5.413-5.525,3.175-12.76,4.878-21.434,4.878-12.707,0-23.487-3.452-31.2-9.994Zm53.2,7.585h0c1.2,8.581,4.41,16.727,9.829,22.873C98.4,169.97,95.189,161.824,93.987,153.243Zm6.238,13.909c.442.878.9,1.743,1.406,2.581C101.13,168.894,100.668,168.036,100.225,167.152ZM96.08,152c7.816-5.1,12.2-13.169,12.2-23.414a27.718,27.718,0,0,0-2.8-12.311c5.486-6.218,13.361-10.245,23.857-10.245,9.169,0,16.78,2.964,22.635,8.806,7.116,7.1,11.031,17.942,11.031,30.53s-4.4,24.6-12.074,31.593c-5.717,5.215-12.984,7.855-21.6,7.855-20.629,0-31.138-15.585-33.257-32.808Zm44.769,31.25c.812-.277,1.6-.594,2.376-.937a29.041,29.041,0,0,0,3.36-1.762,28.517,28.517,0,0,1-3.36,1.762C142.453,182.658,141.661,182.968,140.849,183.252Zm10.265-6.1c6.76-6.165,11-15.81,11.955-26.939C162.112,161.343,157.874,170.987,151.114,177.152Z"
                  fill="#2ab573"
                />
                <path
                  d="M142.566,75.561h-35.8v2.5h35.8a12.137,12.137,0,0,1,12.12,12.12v19.546h2.5V90.176a14.628,14.628,0,0,0-14.615-14.608Z"
                  fill="#2ab573"
                />
                <path
                  d="M132.888,167.521h-6.4a8.883,8.883,0,0,1-8.872-8.872V132.218a8.883,8.883,0,0,1,8.872-8.872h6.4a8.883,8.883,0,0,1,8.872,8.872v26.431A8.883,8.883,0,0,1,132.888,167.521Zm-6.4-41.257a5.96,5.96,0,0,0-5.954,5.954v26.431a5.964,5.964,0,0,0,5.954,5.954h6.4a5.96,5.96,0,0,0,5.954-5.954V132.218a5.964,5.964,0,0,0-5.954-5.954Z"
                  fill="#2ab573"
                />
                <path
                  d="M107.811,92.618a2.228,2.228,0,0,0,1.571.713,1.465,1.465,0,0,0,1.538-1.584V85.152h2.1V91.78A3.147,3.147,0,0,1,109.54,95.2a3.627,3.627,0,0,1-2.647-.964l.918-1.611Z"
                  fill="#2ab573"
                />
                <path
                  d="M123.284,95.014l-.621-1.7h-4.41l-.62,1.7h-2.31l3.815-9.869h2.634l3.8,9.869Zm-2.825-8.047L118.815,91.5h3.268l-1.63-4.528Z"
                  fill="#2ab573"
                />
                <path
                  d="M135.3,95.014l-.621-1.7h-4.41l-.621,1.7h-2.31l3.815-9.869h2.634l3.8,9.869Zm-2.825-8.047L130.829,91.5H134.1l-1.63-4.528Z"
                  fill="#2ab573"
                />
                <path
                  d="M145.985,95.014l-1.941-3.538h-1.538v3.538h-2.1V85.145h4.614a3.075,3.075,0,0,1,3.314,3.182,2.764,2.764,0,0,1-2.159,2.931l2.218,3.756Zm-1.274-8.06h-2.2v2.72h2.2a1.365,1.365,0,1,0,0-2.72Z"
                  fill="#2ab573"
                />
              </g>
            </svg>
          </header>

          {/* buttons */}
          <div className="">
            {/* show type buttons */}
            {controls.showType && (
              <>
                <div className="col-span-2 place-self-center text-5xl text-white">
                  Kies een fotostijl
                </div>
                <Button
                  title="Lucht"
                  handleClick={() => {
                    setRandomPhotoIdByType('skyPics')
                  }}
                />
                <Button
                  title="Grond"
                  handleClick={() => {
                    setRandomPhotoIdByType('groundPics')
                  }}
                />
              </>
            )}

            {/* show tags buttons */}
            {controls.showTags && (
              <>
                <div className="col-span-2 place-self-center text-5xl text-white">
                  Welke toekomst kies jij?
                </div>
                {photo.tags?.map(tag => (
                  <Button
                    key={tag}
                    title={tag}
                    handleClick={() => {
                      updateConfig({
                        selectedTag: tag,
                        currentPage: '/detail',
                      })
                    }}
                  />
                ))}
              </>
            )}

            {/* show random & orignal */}
            {controls.showSelectedTag && (
              <>
                <div className="col-span-2 place-self-center text-5xl text-white"></div>
                <Button
                  title="Nieuwe foto"
                  handleClick={() => {
                    config.photoType && setRandomPhotoIdByType(config.photoType)
                  }}
                />
                <Button
                  title="Andere toekomst"
                  handleClick={() => {
                    updateConfig({
                      selectedTag: '',
                      currentPage: '/original',
                    })
                  }}
                />
              </>
            )}
          </div>

          <footer className="flex items-end justify-between">
            <p className="text-5xl font-black text-white xl:text-7xl">
              <span className="text-stroke">EXPO </span> <br />
              50 JAAR
              <br />
              E3/E17
            </p>
            {/* qr code */}
            {controls.showSelectedTag && (
              <QRCodeSVG
                id="qrCode"
                value={getURL('/downloadImages')}
                bgColor={'white'}
                level={'L'}
                className="h-24 w-24 bg-white p-2 xl:h-40 xl:w-40 xl:p-4"
              />
            )}
          </footer>
        </div>

        {/* green background */}
        <div className="h-screen w-2/12 rounded-tl-[100px] bg-e17-primary-200 opacity-60" />
      </aside>

      {/* blue background */}
      <div className="fixed left-0 z-20 w-1/3">
        <div className="h-screen w-2/12 rounded-br-[100px] bg-e17-secondary-700" />
      </div>
    </main>
  )
}
