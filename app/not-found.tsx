import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Profile Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The profile you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
