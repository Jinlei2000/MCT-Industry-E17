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
import { useState } from 'react'

export default () => {
  // const firebaseConfig = {
  //   apiKey: process.env.apiKey,
  //   authDomain: process.env.authDomain,
  //   projectId: process.env.projectId,
  //   storageBucket: process.env.storageBucket,
  //   messagingSenderId: process.env.messagingSenderId,
  //   appId: process.env.appId,
  // }



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
    updateCurrentPage('detail')
  }

  // LISTENERS
  // listen to the config
  

  return {
    getConfig,
    updateCurrentPage,
    updatePhotoId,
    setRandomPhotoIdByType,
    db,
  }
}
