import Link from 'next/link'

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="flex  p-4 pt-2 text-9xl">HELLO WORLD</h1>
      <div className='flex gap-3'>
        <Link href="/detail" className="rounded-md bg-blue-500 p-4 text-white">
          DETAIL
        </Link>
        <Link href="/controls" className="rounded-md bg-blue-500 p-4 text-white">
          CONTROLS
        </Link>
      </div>
    </main>
  )
}
