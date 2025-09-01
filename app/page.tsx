import Link from 'next/link'
import { getProfiles } from '@/lib/profiles'

export default async function HomePage() {
  const profiles = await getProfiles()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Digital Business Cards
          </h1>
          <p className="text-xl text-gray-600">
            Connect with professionals through beautiful digital vCards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <Link
              key={profile.id}
              href={`/${profile.id}`}
              className="group block"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="gradient-bg h-24"></div>
                <div className="relative px-6 pb-6">
                  <div className="flex justify-center">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-20 h-20 rounded-full border-4 border-white -mt-10 shadow-lg"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {profile.name}
                    </h3>
                    <p className="text-gray-600 mt-1">{profile.title}</p>
                    <p className="text-sm text-gray-500 mt-2">{profile.company}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Click on any card to view the full profile
          </p>
        </div>
      </div>
    </div>
  )
}
