export interface Profile {
  id: string
  name: string
  title: string
  bio: string
  avatar: string
  website?: string
  social: {
    twitter?: string
    github?: string
    linkedin?: string
    dribbble?: string
  }
  skills: string[]
  contact: {
    email: string
    phone: string
    whatsapp?: string
  }
  location: string
  company: string
}
