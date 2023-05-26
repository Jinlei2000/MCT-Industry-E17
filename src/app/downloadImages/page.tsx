'use client'
import useFireStore from '@/hooks/useFireStore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { useEffect, useState } from 'react'
import IPhoto from '@/interfaces/IPhoto'

export default () => {
  const { getPhotoById, getConfig } = useFireStore()

  const [downloadUrls, setDownloadUrls] = useState<string[] | undefined>()
  const [photo, setPhoto] = useState<IPhoto>({})
  const [imageTag, setImageTag] = useState<string>('')

  useEffect(() => {
    getPhotoById().then(photo => {
      setPhoto(photo)
    })

    getConfig().then(config => {
      if (config && config.selectedTag && config.selectedTag !== '') {
        setImageTag(config.selectedTag)
      }
    })
  }, [])

  useEffect(() => {
    const urls: string[] = []
    const images = photo.generatedPics && photo.generatedPics[imageTag]
    if (photo.url && images) {
      urls.push(photo.url)
      images.forEach(image => {
        urls.push(image)
      })
      downloadImages(urls)
      setDownloadUrls(urls)
    }
  }, [photo, imageTag])

  // get image name
  const getImageName = (url: string) => {
    const parts = url.split('%2F')
    const filenameWithToken = parts[parts.length - 1]
    const filename = filenameWithToken.split('?')[0]
    return filename
  }

  // download images
  const downloadImages = async (urls: string[]) => {
    const storage = getStorage()
    const zip = new JSZip()

    for (const url of urls) {
      const storageRef = ref(storage, url)
      const downloadUrl = await getDownloadURL(storageRef)

      // get image name
      const filename = `Leiedal-${getImageName(downloadUrl)}`

      // get image blob
      const response = await fetch(downloadUrl)
      const blob = await response.blob()

      // add file to zip
      zip.file(filename, blob)
    }

    // generate zip file
    const zipBlob = await zip.generateAsync({ type: 'blob' })

    // save zip file
    saveAs(zipBlob, 'Images.zip')
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center p-10">
      <h1 className="mb-8 text-4xl font-bold">Download</h1>

      <div className="flex flex-col gap-2">
        {downloadUrls && downloadUrls.length > 0 && (
          <button
            className="rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
            onClick={() => {
              downloadImages(downloadUrls)
            }}
          >
            Download as ZIP
          </button>
        )}
      </div>
    </main>
  )
}
