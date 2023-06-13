export default () => {
  const clearAll = () => {
    localStorage.clear()
  }

  const setPhotoType = (value: string) => {
    localStorage.setItem('photoType', value)
  }

  const setSelectedTag = (value: string) => {
    localStorage.setItem('selectedTag', value)
  }

  

  return {
    clearAll,
    setPhotoType,
    setSelectedTag,
  }
}
