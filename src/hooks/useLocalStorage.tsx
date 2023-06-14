import IConfig from '@/interfaces/IConfig'
import IPhoto from '@/interfaces/IPhoto'

export default () => {
  const _set = async (key: string, value: string) => {
    localStorage.setItem(key, value)
  }
  const _get = async (key: string) => {
    return localStorage.getItem(key)
  }

  const clearAll = () => {
    localStorage.clear()
  }

  const setPhoto = async (value: IPhoto | null) => {
    _set('photo', JSON.stringify(value))
  }

  const setConfig = async (value: IConfig) => {
    const config = await getConfig()
    _set('config', JSON.stringify({ ...config, ...value }))
  }

  const getPhoto = async () => {
    const photo = await _get('photo')
    if (photo === null) {
      return null
    } else {
      return JSON.parse(photo)
    }
  }

  const getConfig = async () => {
    const config = await _get('config')
    if (config === null) {
      return null
    } else {
      return JSON.parse(config)
    }
  }

  return {
    clearAll,
    setPhoto,
    setConfig,
    getPhoto,
    getConfig,
  }
}
