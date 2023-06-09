import IConfig from '@/interfaces/IConfig'
import IPhoto from '@/interfaces/IPhoto'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  onSnapshot,
  updateDoc,
  getDoc,
} from 'firebase/firestore'
import { getStorage, ref, listAll } from 'firebase/storage'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default () => {
  // firestore config key
  const configId = 'XvCzxNlFVxfuVfVG1FwO'
  const router = useRouter()
  // FIREBASE CONFIG
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    authDomain: process.env.NEXT_PUBLIC_authDomain,
    projectId: process.env.NEXT_PUBLIC_projectId,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId,
  }

  // auto go back timer time in ms (2min)
  const GoBackTime = 120000
  const [timer, setTimer] = useState<NodeJS.Timeout>(setTimeout(() => {}, 0))

  // FIREBASE INIT
  const app = initializeApp(firebaseConfig)
  // FIRESTORE INIT
  const db = getFirestore(app)

  // CONFIG COLLECTION
  // get the config from the database
  const getConfig = async (): Promise<IConfig> => {
    // console.log('get config')
    let config: IConfig = {}
    const querySnapshot = await getDocs(collection(db, 'config'))
    querySnapshot.forEach(doc => {
      config = doc.data()
    })
    return config
  }

  // update config
  const updateConfig = async (config: IConfig) => {
    let newConfig: IConfig = {}

    // get the current config
    await getConfig().then(oldConfig => {
      newConfig = { ...oldConfig, ...config }
    })

    updateDoc(doc(db, 'config', configId), newConfig as any)
  }

  // PHOTOS COLLECTION
  // set random photo id by type & add description
  const setRandomPhotoIdByType = async (picsType: string) => {
    const querySnapshot = await getDocs(collection(db, picsType))
    const photosId: string[] = []
    querySnapshot.forEach(doc => {
      photosId.push(doc.id)
    })

    const randomIndex = Math.floor(Math.random() * photosId.length)

    const description = await getRandomDescription()

    await updateConfig({
      photoId: photosId[randomIndex],
      currentPage: '/original',
      photoType: picsType,
      selectedTag: '',
      description: description,
    })
  }

  // get photo by id
  const getPhotoById = async (): Promise<IPhoto> => {
    const config = await getConfig()
    // console.log(config)
    let photo: IPhoto = {}

    if (config.photoType && config.photoId) {
      const docRef = doc(db, config.photoType, config.photoId)
      // get groundPics or skyPics document
      const docSnap = await getDoc(docRef)
      photo = { ...(docSnap.data() as IPhoto) }
      // get generatedPics subcollection
      const docSnap2 = await getDocs(collection(docRef, 'generatedPics'))
      docSnap2.forEach(doc => {
        photo.generatedPics = { ...doc.data() }
      })
    }

    // console.log(photo)
    return photo
  }

  // DESCRIPTIONS COLLECTION
  // get random description
  const getRandomDescription = async (): Promise<string> => {
    const querySnapshot = await getDocs(collection(db, 'descriptions'))
    const descriptions: string[] = []
    querySnapshot.forEach(doc => {
      descriptions.push(doc.data().text)
    })

    const randomIndex = Math.floor(Math.random() * descriptions.length)

    return descriptions[randomIndex]
  }

  // LISTENERS
  // listen to change config & call handler & change page
  const listenToChangeConfig = (
    handler: Function,
    isChangePage: boolean = true,
  ) => {
    onSnapshot(doc(db, 'config', configId), doc => {
      // config from database
      const newConfig = doc.data()

      const pathname = window.location.pathname

      // go to the page if isChangePage is true
      if (isChangePage && newConfig?.currentPage != pathname) {
        router.push(`${newConfig?.currentPage}`)
      }

      // call handler if not undefined
      handler && handler(newConfig)
    })
  }

  // auto go back timer
  const autoGoBackTimer = async (config: IConfig, pagePath: string) => {
    if (config && config.currentPage == pagePath) {
      setTimer(
        setTimeout(() => {
          updateConfig({
            currentPage: '/',
            photoId: '',
            photoType: '',
            selectedTag: '',
            description: '',
          })
        }, GoBackTime),
      )
    } else {
      clearTimeout(timer)
    }
  }

  return {
    getConfig,
    setRandomPhotoIdByType,
    updateConfig,
    getPhotoById,
    listenToChangeConfig,
    autoGoBackTimer,
  }
}
