import { notFound } from 'next/navigation'
import { getProfileById, getAllProfileIds } from '@/lib/profiles'
import { Metadata } from 'next'
import VCard from '@/components/VCard'

interface ProfilePageProps {
  params: Promise<{ profile: string }>
}

export async function generateStaticParams() {
  const profileIds = await getAllProfileIds()
  return profileIds.map((id) => ({
    profile: id,
  }))
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { profile } = await params
  const profileData = await getProfileById(profile)
  
  if (!profileData) {
    return {
      title: 'Profile Not Found',
    }
  }

  return {
    title: `${profileData.name} - ${profileData.title}`,
    description: profileData.bio,
    openGraph: {
      title: `${profileData.name} - ${profileData.title}`,
      description: profileData.bio,
      images: [profileData.avatar],
    },
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { profile } = await params
  const profileData = await getProfileById(profile)

  if (!profileData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <VCard profile={profileData} />
      </div>
    </div>
  )
}
