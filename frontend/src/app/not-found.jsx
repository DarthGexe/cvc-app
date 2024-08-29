import Link from 'next/link'
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
        <h1>Error 404 | <Link href="/">Back to Home</Link></h1>
    </main>
  );
}
