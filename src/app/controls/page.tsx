'use client'
import Button from '@/components/Button'
import useFireStore from '@/hooks/useFireStore'
import IConfig from '@/interfaces/IConfig'
import IPhoto from '@/interfaces/IPhoto'
import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

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
      <img
        className="h-sceen fixed z-0 w-screen"
        src="/hong-kong-traffic-view.png"
        alt="foto"
      />
      <aside className="relative z-20">
        <div className="fixed inset-y-0 left-0 h-screen w-20 rounded-br-3xl bg-e17-secondary-700">
          <div className="fixed  inset-y-0 right-0 h-screen w-1/2 bg-e17-primary-200 opacity-95">
            {/* <div className='absolute flex items-center justify-center w-1/2'> */}
            <div className=" h-full flex-col place-items-center items-start justify-center">
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -top-4 right-8 w-1/6"
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
              </div>
              <div className="flex place-items-center ">
                {/* go back button */}
                {controls.showBack && (
                  <button
                    className="m-8 bg-transparent"
                    onClick={() => {
                      updateConfig({
                        currentPage: '/',
                        photoId: '',
                        photoType: '',
                        selectedTag: '',
                      })
                    }}
                  >
                    <ArrowLeft
                      strokeWidth={2.5}
                      size={48}
                      color="white"
                    ></ArrowLeft>
                  </button>
                )}
                <div className="m-4">
                  <Image
                    src="/logo-blauw.png"
                    alt="logo leiedal"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="m-4">
                  <Image
                    src="/logo-howest.png"
                    alt="logo leiedal"
                    width={80}
                    height={80}
                  />
                </div>
              </div>
              <div className="relative top-20 h-1/2">
                <div className="absolute top-0 z-10 grid  w-full grid-cols-2 grid-rows-3 flex-col justify-center">
                  <>
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
                            title={tag}
                            handleClick={() => {
                              updateConfig({
                                selectedTag: tag,
                              })
                            }}
                          />
                        ))}
                      </>
                    )}

                    {/* show random & orignal */}
                    {controls.showSelectedTag && (
                      <>
                        <div className="col-span-2 place-self-center text-5xl text-white">
                          
                        </div>
                        <Button
                          title="Random"
                          handleClick={() => {
                            config.photoType &&
                              setRandomPhotoIdByType(config.photoType)
                          }}
                        />
                        <Button
                          title="Origineel"
                          handleClick={() => {
                            updateConfig({
                              selectedTag: '',
                            })
                          }}
                        />
                      </>
                    )}
                  </>
                </div>
              </div>
              {controls.showSelectedTag && (
                <div className="absolute bottom-4 right-4 rounded border-8 border-white">
                  <QRCodeSVG
                    id="qrCode"
                    // value={`https://${window.location.host}/downloadImages`}
                    value={QRCodeUrl}
                    bgColor={'white'}
                    level={'L'}
                  />
                </div>
              )}
              <div className="mx-8 w-80 p-4 text-7xl text-white ">
                <div className="text-stroke text-transparent">EXPO</div> 50 JAAR
                E3/E17
              </div>
            </div>
          </div>
          <div className="fixed inset-y-0 right-1/2 z-10 h-screen w-1/6 rounded-tl-3xl bg-e17-primary-200 opacity-60"></div>
        </div>
      </aside>
    </main>
  )
}
