export default () => {
  // make a post get blob
  const getWaterMark = async () => {
    return fetch('https://quickchart.io/watermark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mainImageUrl:
          'https://firebasestorage.googleapis.com/v0/b/jaar-e17-ai.appspot.com/o/1%2F1-1_DIS.jpg?alt=media',
        markImageUrl:
          'https://www.leiedal.be/sites/default/files/styles/medium/public/contact/logo%20LEIEDAL%20dark%20-%2025x25mm.jpg',
        markRatio: 0.25,
      }),
    })
      .then(response => response.blob())
      .then(blob => {
        // console.log(blob)
        return blob
      })
  }

  return {
    getWaterMark,
  }
}
