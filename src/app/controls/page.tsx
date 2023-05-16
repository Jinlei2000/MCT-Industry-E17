'use client'

export default () => {
  const goToHome = () => {
    console.log('go to home')
  }
  const goToDetail = () => {
    console.log('go to detail')
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-4xl font-bold">Controls</h1>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
        onClick={() => goToHome()}
      >
        Ga terug
      </button>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
        onClick={() => goToDetail()}
      >
        Lucht
      </button>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
        onClick={() => goToDetail()}
      >
        Grond
      </button>
    </main>
  )
}
