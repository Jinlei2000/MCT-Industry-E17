import Link from 'next/link'

export default function Page() {
  return (
    <main className='p-10'>
      <h1 className="flex  p-4 pt-2 text-9xl">HELLO WORLD</h1>
      <Link href="/detail" className="rounded-md p-4 text-white bg-blue-500">
        DETAIL
      </Link>
    </main>
  )
}
