# Analytics Setup Guide

## Google Analytics vs Google Tag Manager

### Recommendation: **Google Analytics 4 (GA4)**

For this vCard application, I recommend using **Google Analytics 4** over Google Tag Manager for the following reasons:

1. **Simplicity**: GA4 is easier to set up for basic event tracking
2. **Cost**: Free for most use cases
3. **Event Tracking**: Built-in event tracking that's perfect for vCard interactions
4. **Real-time Data**: See user interactions as they happen
5. **Privacy Focused**: Better privacy controls and data retention options

### Why GA4 over Google Tag Manager?

- **GTM** is better for complex websites with multiple tracking tools
- **GA4** is perfect for focused tracking like vCard interactions
- **GA4** has simpler setup and maintenance
- **GA4** provides better insights for engagement metrics

## Setup Instructions

### 1. Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new account or use existing one
3. Create a new property for your vCard app
4. Get your **Measurement ID** (starts with G-XXXXXXXXXX)

### 2. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Google Analytics Configuration
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### 3. Events Being Tracked

The application automatically tracks these events:

#### Profile Events
- **profile_view**: When someone views a vCard
  - Category: engagement
  - Label: Profile name and ID

#### Button Interactions
- **contact_click**: Add as Contact button
- **website_click**: Visit Website button  
- **email_click**: Send Email button
- **whatsapp_click**: WhatsApp messaging button
- **whatsapp_chat_started**: Specific WhatsApp interaction tracking

#### Social Media Clicks
- **social_click**: Twitter, LinkedIn, GitHub, Dribbble links

### 4. View Analytics Data

1. Go to your GA4 property
2. Navigate to **Reports** > **Engagement** > **Events**
3. See real-time data in **Reports** > **Realtime**

### 5. Custom Reports

Create custom reports to track:
- Most viewed profiles
- Button click rates
- Geographic distribution of viewers
- Device and browser usage

## Privacy Considerations

- GA4 is GDPR compliant
- Consider adding a cookie banner for EU users
- Data retention can be configured (2-14 months)
- IP anonymization is enabled by default

## Alternative Analytics Solutions

If you prefer other solutions:

1. **Plausible Analytics** - Privacy-focused, simple
2. **Fathom Analytics** - GDPR compliant, no cookies
3. **Vercel Analytics** - Integrated with Vercel hosting
4. **PostHog** - Open source, feature-rich

## Testing Analytics

1. Install the [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome extension
2. Open your vCard in browser
3. Check browser console for GA events
4. Verify events appear in GA4 real-time reports
