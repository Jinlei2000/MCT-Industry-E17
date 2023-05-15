import Link from 'next/link'

export default () => {
  return (
    <main className="p-10">
      <h1 className="flex  p-4 pt-2 text-9xl">CONTROLS</h1>
      <Link href="/" className="rounded-md bg-blue-500 p-4 text-white">
        HOME
      </Link>
    </main>
  )
}
