'use client'
import useFireStore from '@/hooks/useFireStore'

export default () => {
  const { updateConfig, setRandomPhotoIdByType } = useFireStore()

  return (
    <main className="">
      <button
        className="absolute left-0 top-0 rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
        onClick={() => {
          updateConfig({ currentPage: '/', photoId: '', photoType: '' })
        }}
      >
        Ga terug
      </button>
      {/* center in middle of screen */}
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-8 text-4xl font-bold">Controls</h1>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
          onClick={() => {
            setRandomPhotoIdByType('skyPics')
          }}
        >
          Lucht
        </button>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
          onClick={() => {
            setRandomPhotoIdByType('groundPics')
          }}
        >
          Grond
        </button>
      </div>
    </main>
  )
}
