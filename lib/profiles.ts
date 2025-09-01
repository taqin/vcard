import { Profile } from '@/types/profile'
import profilesData from '@/data/profiles.json'

export async function getProfiles(): Promise<Profile[]> {
  // In a real application, this might fetch from an API
  // For now, we'll return the static JSON data
  return profilesData as Profile[]
}

export async function getProfileById(id: string): Promise<Profile | null> {
  const profiles = await getProfiles()
  return profiles.find(profile => profile.id === id) || null
}

export async function getAllProfileIds(): Promise<string[]> {
  const profiles = await getProfiles()
  return profiles.map(profile => profile.id)
}
