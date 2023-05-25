'use client'
import Button from '@/components/Button'
import useFireStore from '@/hooks/useFireStore'
import IConfig from '@/interfaces/IConfig'
import IPhoto from '@/interfaces/IPhoto'
import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'

export default () => {
  const {
    updateConfig,
    setRandomPhotoIdByType,
    getConfig,
    getPhotoById,
    listenToChangeConfig,
  } = useFireStore()

  const [photo, setPhoto] = useState<IPhoto>({})
  const [QRCodeUrl, setQRCodeUrl] = useState<string>('')
  const [config, setConfig] = useState<IConfig>({})
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
          config?.currentPage === '/detail' && config?.selectedTag === '',
        showBack: config?.currentPage === '/detail',
        showSelectedTag: config?.selectedTag != '',
      })
    })

    if (window.location.host === 'localhost:3000') {
      console.log('localhost:3000/downloadImages')
      setQRCodeUrl(`${window.location.host}/downloadImages`)
    } else {
      console.log(`https://${window.location.host}/downloadImages`)
      setQRCodeUrl(`https://${window.location.host}/downloadImages`)
    }
  }, [])

  useEffect(() => {
    getPhotoById().then(photo => {
      // console.log(photo)
      setPhoto(photo)
    })

    getConfig().then(config => {
      // console.log(config)
      setConfig(config)
    })
  }, [controls])

  return (
    <main className="">
      {/* go back button */}
      {controls.showBack && (
        <Button title="Ga terug" handleClick={() => {
          updateConfig({
            currentPage: '/',
            photoId: '',
            photoType: '',
            selectedTag: '',
          })
        }} />
        
      )}
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-8 text-4xl font-bold">Controls</h1>

        {/* show type buttons */}
        {controls.showType && (
          <div>
            {/* <button
              className="rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
              onClick={() => {
                setRandomPhotoIdByType('skyPics')
              }}
            >
              Lucht
            </button> */}
            <Button title="Lucht" handleClick={() => {
              setRandomPhotoIdByType('skyPics')
            }} />
            <button
              className="rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
              onClick={() => {
                setRandomPhotoIdByType('groundPics')
              }}
            >
              Grond
            </button>
          </div>
        )}

        {/* show tags buttons */}
        {controls.showTags && (
          <div>
            {photo.tags?.map(tag => (
              <button
                key={tag}
                className="m-2 rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
                onClick={() => {
                  updateConfig({
                    selectedTag: tag,
                  })
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* show random & orignal */}
        {controls.showSelectedTag && (
          <div>
            <button
              className="rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
              onClick={() => {
                config.photoType && setRandomPhotoIdByType(config.photoType)
              }}
            >
              Random
            </button>
            <button
              className="rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
              onClick={() => {
                updateConfig({
                  selectedTag: '',
                })
              }}
            >
              Origineel
            </button>

            <div className="absolute bottom-4 right-4">
              <QRCodeSVG
                id="qrCode"
                // value={`https://${window.location.host}/downloadImages`}
                value={QRCodeUrl}
                bgColor={'transparent'}
                level={'L'}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
