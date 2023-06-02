export default () => {
  const getURL = (pagePath: string) => {
    const host = window.location.host

    const url = host.includes('localhost')
      ? `http://${host}${pagePath}`
      : `https://${host}${pagePath}`

    return url
  }

  return {
    getURL,
  }
}
