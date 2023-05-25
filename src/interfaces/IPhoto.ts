export default interface IPhoto {
  tags?: string[]
  url?: string
  generatedPics?: { [key: string]: string[] }
}
