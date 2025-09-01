// Google Analytics configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    })
  }
}

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track profile views
export const trackProfileView = (profileId: string, profileName: string) => {
  trackEvent('profile_view', 'engagement', `${profileName} (${profileId})`)
}

// Track button interactions
export const trackButtonClick = (buttonType: string, profileId: string, profileName: string) => {
  trackEvent(`${buttonType}_click`, 'engagement', `${profileName} (${profileId})`)
}

// Track WhatsApp interactions specifically
export const trackWhatsAppClick = (profileId: string, profileName: string, phoneNumber: string) => {
  trackEvent('whatsapp_click', 'engagement', `${profileName} (${profileId})`, undefined)
  // Additional WhatsApp-specific tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'whatsapp_chat_started', {
      event_category: 'communication',
      event_label: profileName,
      profile_id: profileId,
      phone_number: phoneNumber.replace(/\D/g, ''), // Clean number for analytics
    })
  }
}
