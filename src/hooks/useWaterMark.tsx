export default () => {
  // make a post get blob
  const AddWaterMarkToImage = async (url: String) => {
    return fetch('https://quickchart.io/watermark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mainImageUrl: url,
        markImageUrl:
          'https://firebasestorage.googleapis.com/v0/b/jaar-e17-ai.appspot.com/o/logo%2F50_jaar_E17_-_Logo_CMYK.jpg?alt=media',
        markRatio: 0.15,
        margin: 0,
      }),
    })
      .then(response => response.blob())
      .then(blob => {
        // console.log(blob)
        return blob
      })
  }

  return {
    AddWaterMarkToImage,
  }
}
