'use client'

import { useEffect } from 'react'
import { Profile } from '@/types/profile'
import { trackProfileView } from '@/lib/analytics'

interface ProfileTrackerProps {
  profile: Profile
}

export default function ProfileTracker({ profile }: ProfileTrackerProps) {
  useEffect(() => {
    // Track profile view when component mounts
    trackProfileView(profile.id, profile.name)
  }, [profile.id, profile.name])

  // This component doesn't render anything visible
  return null
}
