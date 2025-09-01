'use client'

import { Profile } from '@/types/profile'
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
    // In a real app, this could open a contact form or initiate a connection
    window.open(`mailto:${profile.contact.email}`, '_blank')
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {profile.name}
        </h1>
        <p className="text-lg text-purple-600 font-medium mb-4">
          {profile.title}
        </p>

        {/* Bio */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {profile.bio}
        </p>

        {/* Contact info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-center text-gray-600">
            <FaEnvelope className="mr-2 text-purple-500" />
            <span className="text-sm">{profile.contact.email}</span>
          </div>
          <div className="flex items-center justify-center text-gray-600">
            <FaPhone className="mr-2 text-purple-500" />
            <span className="text-sm">{profile.contact.phone}</span>
          </div>
          <div className="flex items-center justify-center text-gray-600">
            <FaMapMarkerAlt className="mr-2 text-purple-500" />
            <span className="text-sm">{profile.location}</span>
          </div>
          <div className="flex items-center justify-center text-gray-600">
            <FaBuilding className="mr-2 text-purple-500" />
            <span className="text-sm">{profile.company}</span>
          </div>
        </div>

        {/* Social links */}
        <div className="flex justify-center space-x-4 mb-6">
          {profile.social.twitter && (
            <a
              href={profile.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-400 transition-colors"
            >
              <FaTwitter size={20} />
            </a>
          )}
          {profile.social.github && (
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaGithub size={20} />
            </a>
          )}
          {profile.social.linkedin && (
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
          )}
          {profile.social.dribbble && (
            <a
              href={profile.social.dribbble}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-500 transition-colors"
            >
              <FaDribbble size={20} />
            </a>
          )}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {profile.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Connect button */}
        <button
          onClick={handleConnect}
          className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Connect
        </button>
      </div>
    </div>
  )
}
