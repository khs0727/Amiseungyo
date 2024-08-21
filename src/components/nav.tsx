import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="flex justify-between">
      <h1 className="text-4xl">AmISeungyo</h1>
      <div className="flex items-center gap-4 text-orange-dark text-lg">
        <Link href="/">Home</Link>
        <Link href="/add">Add Record</Link>
        <Link href="/statistics">Statistics</Link>
        <Link href="/profile">Profile</Link>
      </div>
    </nav>
  )
}
