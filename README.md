# VCard - Digital Business Cards

A modern Next.js application for creating and sharing digital business cards with dynamic routing.

## Features

- **Dynamic Routing**: Each profile has its own URL (e.g., `/john-doe`)
- **Modern Design**: Beautiful, responsive vCard design with Tailwind CSS
- **Static Generation**: Profiles are pre-rendered at build time for optimal performance
- **SEO Optimized**: Meta tags and Open Graph support for each profile
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Next.js 15**: Latest version with App Router
- **React 19**: Latest React features
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Beautiful icon library

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── [profile]/         # Dynamic route for individual profiles
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── not-found.tsx      # 404 page
├── components/            # React components
│   └── VCard.tsx         # Main vCard component
├── data/                  # Static data
│   └── profiles.json     # Profile data
├── lib/                   # Utility functions
│   └── profiles.ts       # Profile data management
├── types/                 # TypeScript types
│   └── profile.ts        # Profile interface
└── public/               # Static assets
```

## Adding New Profiles

To add a new profile, edit the `data/profiles.json` file and add a new profile object:

```json
{
  "id": "unique-profile-id",
  "name": "Full Name",
  "title": "Job Title",
  "bio": "Professional bio...",
  "avatar": "https://example.com/avatar.jpg",
  "social": {
    "twitter": "https://twitter.com/username",
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username",
    "dribbble": "https://dribbble.com/username"
  },
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "contact": {
    "email": "email@example.com",
    "phone": "+1 (555) 123-4567"
  },
  "location": "City, State",
  "company": "Company Name"
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This project can be deployed to Vercel, Netlify, or any other platform that supports Next.js.

## License

MIT