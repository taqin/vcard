export interface Profile {
  id: string
  name: string
  title: string
  bio: string
  avatar: string
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
  }
  location: string
  company: string
}
