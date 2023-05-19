import IConfig from '@/interfaces/IConfig'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'
import { useRouter } from 'next/navigation'

export default () => {
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
   
    updateDoc(doc(db, 'config', 'YnfWtqVDB8vyURRmpFTC'), newConfig as any)
  }

  // PHOTOS COLLECTION
  // get all photos
  const setRandomPhotoIdByType = async (picsType: string) => {
    const querySnapshot = await getDocs(collection(db, picsType))
    const photosId: string[] = []
    querySnapshot.forEach(doc => {
      photosId.push(doc.id)
    })

    const randomIndex = Math.floor(Math.random() * photosId.length)

    await updateConfig({ photoId: photosId[randomIndex], currentPage: '/detail', photoType: picsType })
  }

  // get photo by id
  const getPhotoById = async () => {}

  // LISTENERS
  // listen to the config
  const listenToChangePage = (path: string) => {
    onSnapshot(doc(db, 'config', 'YnfWtqVDB8vyURRmpFTC'), doc => {
      // change url thats being displayed
      const config = doc.data()
      // console.log(config)

      if (config?.currentPage === path) {
        router.push(`${path}`)
      }
    })
  }

  return {
    getConfig,
    // updateCurrentPage,
    // updatePhotoId,
    setRandomPhotoIdByType,
    listenToChangePage,
    updateConfig,
  }
}
