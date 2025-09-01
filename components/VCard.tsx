'use client'

import { Profile } from '@/types/profile'
import { trackButtonClick } from '@/lib/analytics'
import { 
  FaTwitter, 
  FaGithub, 
  FaLinkedin, 
  FaDribbble,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding
} from 'react-icons/fa'

interface VCardProps {
  profile: Profile
}

export default function VCard({ profile }: VCardProps) {
  const handleConnect = () => {
    trackButtonClick('contact', profile.id, profile.name)
    // In a real app, this could open a contact form or initiate a connection
    window.open(`mailto:${profile.contact.email}`, '_blank')
  }

  const handleVisitWebsite = () => {
    trackButtonClick('website', profile.id, profile.name)
    if (profile.website) {
      window.open(profile.website, '_blank')
    }
  }

  const handleSendEmail = () => {
    trackButtonClick('email', profile.id, profile.name)
    window.open(`mailto:${profile.contact.email}?subject=Hello ${profile.name}`, '_blank')
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header with gradient background */}
      <div className="gradient-bg h-32 relative">
        {/* Profile picture overlapping header and content */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="pt-16 pb-8 px-8 text-center">
        {/* Name and title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {profile.name}
        </h1>
        <p className="text-lg text-blue-600 font-medium mb-4">
          {profile.title}
        </p>

        {/* Bio */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          {profile.bio}
        </p>

        {/* Contact info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-center text-gray-600">
            <FaEnvelope className="mr-2 text-blue-500" />
            <span className="text-sm">{profile.contact.email}</span>
          </div>
          <div className="flex items-center justify-center text-gray-600">
            <FaPhone className="mr-2 text-blue-500" />
            <span className="text-sm">{profile.contact.phone}</span>
          </div>
          <div className="flex items-center justify-center text-gray-600">
            <FaMapMarkerAlt className="mr-2 text-blue-500" />
            <span className="text-sm">{profile.location}</span>
          </div>
          <div className="flex items-center justify-center text-gray-600">
            <FaBuilding className="mr-2 text-blue-500" />
            <span className="text-sm">{profile.company}</span>
          </div>
        </div>



        {/* Action buttons */}
        <div className="space-y-3">
          <button
            onClick={handleConnect}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Add as Contact
          </button>
          <button
            onClick={handleSendEmail}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Send me an Email
          </button>
          
          <button
            onClick={handleVisitWebsite}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Visit my Website
          </button>
          
        </div>
      </div>
    </div>
  )
}
