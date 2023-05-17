import IConfig from '@/interfaces/IConfig'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  onSnapshot,
} from 'firebase/firestore'
import { useRouter } from 'next/navigation'

export default () => {
  const router = useRouter()
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    authDomain: process.env.NEXT_PUBLIC_authDomain,
    projectId: process.env.NEXT_PUBLIC_projectId,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId,
  }

  const app = initializeApp(firebaseConfig)
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

  // update the current page in the config
  const updateCurrentPage = async (page: string) => {
    const config: IConfig = await getConfig()
    config.currentPage = page
    await setDoc(doc(db, 'config', 'YnfWtqVDB8vyURRmpFTC'), config)
  }

  // update the current page in the config
  const updatePhotoId = async (photoId: string) => {
    const config: IConfig = await getConfig()
    config.photoId = photoId
    await setDoc(doc(db, 'config', 'YnfWtqVDB8vyURRmpFTC'), config)
  }

  // PHOTOS COLLECTION
  // get all photos from the database
  const setRandomPhotoIdByType = async (picsType: string) => {
    const querySnapshot = await getDocs(collection(db, picsType))
    const photosId: string[] = []
    querySnapshot.forEach(doc => {
      photosId.push(doc.id)
    })

    const randomIndex = Math.floor(Math.random() * photosId.length)

    await updatePhotoId(photosId[randomIndex])
    updateCurrentPage('/detail')
  }

  // LISTENERS
  // listen to the config
  const listenToChangePage = (path: string) => {
    onSnapshot(doc(db, 'config', 'YnfWtqVDB8vyURRmpFTC'), doc => {
      // change url thats being displayed
      const config = doc.data()
      console.log(config)

      if (config?.currentPage === path) {
        router.push(`${path}`)
      }
    })
  }

  return {
    getConfig,
    updateCurrentPage,
    updatePhotoId,
    setRandomPhotoIdByType,
    listenToChangePage,
  }
}
