'use client'

import { Profile } from '@/types/profile'
import { trackButtonClick, trackWhatsAppClick } from '@/lib/analytics'
import { 
  FaTwitter, 
  FaGithub, 
  FaLinkedin, 
  FaDribbble,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaWhatsapp,
  FaMailBulk,
  FaInternetExplorer,
  FaBroadcastTower,
  FaGalacticRepublic,
  FaChrome
} from 'react-icons/fa'
import Image from 'next/image'

interface VCardProps {
  profile: Profile
}

export default function VCard({ profile }: VCardProps) {
  const handleConnect = async () => {
    trackButtonClick('contact', profile.id, profile.name)
    
    // Generate vCard content
    const vCardContent = generateVCard(profile)
    
    // Detect if user is on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    if (isMobile) {
      // Try multiple approaches for mobile devices
      try {
        // Method 1: Try Web Share API first (most modern approach)
        if (navigator.share) {
          const blob = new Blob([vCardContent], { type: 'text/vcard' })
          const file = new File([blob], `${profile.name.replace(/\s+/g, '_')}.vcf`, { type: 'text/vcard' })
          
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: `Contact: ${profile.name}`,
              text: `Add ${profile.name} to your contacts`,
              files: [file]
            })
            return
          }
        }
        
        // Method 2: Try data URL approach
        const dataUrl = `data:text/vcard;charset=utf-8,${encodeURIComponent(vCardContent)}`
        window.open(dataUrl, '_blank')
        
        // Method 3: Fallback to blob URL if data URL doesn't trigger contacts app
        setTimeout(() => {
          const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' })
          const url = window.URL.createObjectURL(blob)
          const tempLink = document.createElement('a')
          tempLink.href = url
          tempLink.target = '_blank'
          tempLink.click()
          
          // Clean up
          setTimeout(() => {
            window.URL.revokeObjectURL(url)
          }, 1000)
        }, 500)
        
      } catch (error) {
        console.log('Mobile contact methods failed, falling back to download:', error)
        downloadVCard(vCardContent, profile.name)
      }
    } else {
      // Desktop: download the vCard file
      downloadVCard(vCardContent, profile.name)
    }
  }

  const downloadVCard = (vCardContent: string, name: string) => {
    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${name.replace(/\s+/g, '_')}.vcf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const generateVCard = (profile: Profile): string => {
    // Clean phone numbers for vCard format
    const cleanPhone = profile.contact.phone.replace(/\D/g, '')
    const cleanWhatsApp = profile.contact.whatsapp?.replace(/\D/g, '') || ''
    
    // Build vCard content following vCard 3.0 specification
    let vCard = 'BEGIN:VCARD\n'
    vCard += 'VERSION:3.0\n'
    vCard += `FN:${profile.name}\n`
    vCard += `ORG:${profile.company}\n`
    vCard += `TITLE:${profile.title}\n`
    vCard += `EMAIL:${profile.contact.email}\n`
    vCard += `TEL;TYPE=VOICE:${profile.contact.phone}\n`
    
    if (profile.contact.whatsapp) {
      vCard += `TEL;TYPE=CELL:${profile.contact.whatsapp}\n`
    }
    
    if (profile.website) {
      vCard += `URL:${profile.website}\n`
    }
    
    vCard += `NOTE:${profile.bio}\n`
    vCard += `ADR;TYPE=WORK:;;${profile.location};;;;\n`
    
    // Add social media as URLs
    // if (profile.social.linkedin) {
    //   vCard += `URL;TYPE=LinkedIn:${profile.social.linkedin}\n`
    // }
    // if (profile.social.github) {
    //   vCard += `URL;TYPE=GitHub:${profile.social.github}\n`
    // }
    // if (profile.social.twitter) {
    //   vCard += `URL;TYPE=Twitter:${profile.social.twitter}\n`
    // }
    // if (profile.social.dribbble) {
    //   vCard += `URL;TYPE=Dribbble:${profile.social.dribbble}\n`
    // }
    
    // Add photo URL if available
    if (profile.avatar) {
      vCard += `PHOTO;VALUE=URI:${profile.avatar}\n`
    }
    
    vCard += 'END:VCARD'
    
    return vCard
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

  const handleWhatsApp = () => {
    if (profile.contact.whatsapp) {
      // Track WhatsApp interaction
      trackWhatsAppClick(profile.id, profile.name, profile.contact.whatsapp)
      
      // Remove all non-digit characters from WhatsApp number
      const cleanNumber = profile.contact.whatsapp.replace(/\D/g, '')
      // Create WhatsApp URL with pre-filled message
      const message = encodeURIComponent(`Hello ${profile.name}! 👋`)
      const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`
      window.open(whatsappUrl, '_blank')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header with image background */}
      <div 
        className="h-32 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://www.cendanaventures.com/assets/img/cover.jpg)',
        }}
      >
        {/* Optional overlay for better text contrast */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        {/* Profile picture overlapping header and content */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 z-10">
          {profile.avatar.startsWith('/') ? (
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
              priority
            />
          ) : (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="pt-16 pb-8 px-8 text-center">
        {/* Name and title */}
        <h1 className="text-5xl font-bold text-gray-900 mb-2">
          {profile.name}
        </h1>
        <p className="text-lg text-blue-600 font-medium mb-1">
          {profile.title}
        </p>
        
        <p className='text-sm text-blue-600 font-italic mb-4'>{profile.company}</p>

        {/* Bio */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          {profile.bio}
        </p>

        {/* Contact info */}
        {/* <div className="space-y-3 mb-6">
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
        </div> */}

        {/* Action buttons */}
        <div className="space-y-3">                    
        {profile.contact.whatsapp && (
            <button
              onClick={handleWhatsApp}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <FaWhatsapp size={20} />
              Send me a WhatsApp
            </button>
          )}

          <button
            onClick={handleConnect}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <FaPhone size={20} />
            Add as Contact
          </button>

          <button
            onClick={handleSendEmail}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <FaMailBulk size={20} />
            Send me an Email
          </button>

          <button
            onClick={handleVisitWebsite}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <FaChrome size={20} />
            Visit my Website
          </button>
          
        </div>
      </div>
    </div>
  )
}
