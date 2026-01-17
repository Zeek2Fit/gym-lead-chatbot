# Gym Lead Chatbot - Configuration Guide

This guide explains how to customize the Gym Lead Chatbot for your fitness business. All basic customization can be done through configuration files - no coding required.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Brand Settings](#2-brand-settings)
3. [Theme Colors](#3-theme-colors)
4. [Customizing Conversation Flow](#4-customizing-conversation-flow)
5. [Business Information](#5-business-information)
6. [Feature Toggles](#6-feature-toggles)
7. [Email Notifications](#7-email-notifications)
8. [Advanced Customization](#8-advanced-customization)

---

## 1. Overview

The Gym Lead Chatbot is designed to be easily customizable without requiring any coding knowledge for basic changes. All customization is centralized in two main files:

| File | Purpose |
|------|---------|
| `shared/config.ts` | Brand settings, colors, conversation copy, and feature toggles |
| `.env` | Environment variables for email, database, and API keys |

### How It Works

1. Open the configuration file you want to modify
2. Change the values to match your brand
3. Save the file
4. Restart the application to see your changes

---

## 2. Brand Settings

All brand settings are located in `shared/config.ts`. Here's how to customize each setting:

### Brand Name

Your gym or fitness business name. This appears in the chat header.

```typescript
// shared/config.ts

/** The name of your gym or fitness brand */
export const brandName = "Gym Lead Bot";
```

**Example Changes:**

```typescript
// Before
export const brandName = "Gym Lead Bot";

// After - Your gym name
export const brandName = "Iron Fitness";

// Or
export const brandName = "Peak Performance Gym";

// Or
export const brandName = "CrossFit Downtown";
```

### Tagline

A short description that appears below your brand name.

```typescript
/** A short tagline displayed in the chat header */
export const tagline = "Your 24/7 Lead Qualification Assistant";
```

**Example Changes:**

```typescript
// Before
export const tagline = "Your 24/7 Lead Qualification Assistant";

// After
export const tagline = "Transform Your Body, Transform Your Life";

// Or
export const tagline = "Get Fit. Stay Strong. Live Better.";

// Or
export const tagline = "Personal Training That Works";
```

### Program Name

The name of your main fitness program or membership type.

```typescript
/** The name of your main fitness program or membership */
export const programName = "Fitness Program";
```

**Example Changes:**

```typescript
// Before
export const programName = "Fitness Program";

// After
export const programName = "12-Week Transformation";

// Or
export const programName = "Unlimited Membership";

// Or
export const programName = "Personal Training Package";
```

---

## 3. Theme Colors

Customize the visual appearance by modifying the theme colors in `shared/config.ts`.

### Color Settings

```typescript
export const themeColors = {
  /** Primary brand color (used for buttons, accents) */
  primaryColor: "#0d9488",
  
  /** Secondary/gradient color for visual interest */
  primaryGradient: "#06b6d4",
  
  /** Accent color for highlights and interactive elements */
  accentColor: "#14b8a6",
  
  /** Background color for the chat widget */
  backgroundColor: "#ffffff",
  
  /** Dark background for contrast sections */
  backgroundDark: "#0f172a",
} as const;
```

### Understanding Hex Colors

Hex colors are 6-character codes preceded by `#`. They represent Red, Green, and Blue values:

```
#RRGGBB

#0d9488 = Teal (low red, medium green, medium blue)
#ff0000 = Pure Red
#00ff00 = Pure Green
#0000ff = Pure Blue
#ffffff = White
#000000 = Black
```

### Example Color Schemes

**Bold Red & Black (CrossFit/Intense):**
```typescript
export const themeColors = {
  primaryColor: "#dc2626",      // Bold red
  primaryGradient: "#f97316",   // Orange gradient
  accentColor: "#ef4444",       // Lighter red
  backgroundColor: "#ffffff",
  backgroundDark: "#18181b",    // Near black
} as const;
```

**Navy & Gold (Premium/Luxury):**
```typescript
export const themeColors = {
  primaryColor: "#1e3a5f",      // Navy blue
  primaryGradient: "#d4af37",   // Gold
  accentColor: "#2563eb",       // Royal blue
  backgroundColor: "#ffffff",
  backgroundDark: "#0f172a",
} as const;
```

**Fresh Green (Health/Wellness):**
```typescript
export const themeColors = {
  primaryColor: "#16a34a",      // Green
  primaryGradient: "#22c55e",   // Lighter green
  accentColor: "#4ade80",       // Soft green
  backgroundColor: "#ffffff",
  backgroundDark: "#14532d",    // Dark forest
} as const;
```

**Purple Power (Modern/Youth):**
```typescript
export const themeColors = {
  primaryColor: "#7c3aed",      // Purple
  primaryGradient: "#a855f7",   // Light purple
  accentColor: "#8b5cf6",       // Medium purple
  backgroundColor: "#ffffff",
  backgroundDark: "#1e1b4b",    // Dark purple
} as const;
```

### Recommended Color Picker Tools

Use these free tools to find the perfect colors:

- **Coolors.co** - Generate color palettes: https://coolors.co
- **Adobe Color** - Professional color wheel: https://color.adobe.com
- **HTML Color Codes** - Simple picker: https://htmlcolorcodes.com
- **Tailwind CSS Colors** - Pre-built palettes: https://tailwindcss.com/docs/customizing-colors

### Tips for Choosing Colors

1. **Brand Consistency**: Use your existing brand colors
2. **Contrast**: Ensure text is readable against backgrounds
3. **Accessibility**: Test color combinations for colorblind users
4. **Psychology**: 
   - Red = Energy, urgency
   - Blue = Trust, calm
   - Green = Health, growth
   - Orange = Friendly, action
   - Purple = Premium, creative

---

## 4. Customizing Conversation Flow

The entire conversation flow can be customized through `conversationCopy` in `shared/config.ts`.

### Changing the Greeting Message

The first message users see when opening the chat.

```typescript
// Before
greeting: "Hey! Looking to get in shape and build real strength? You're in the right place. I'll help you find a plan that fits your life.\n\nWhat brings you here today?",

// After - More casual
greeting: "Hey there! 👋 Ready to crush your fitness goals? Let's find the perfect program for you.\n\nWhat's your main focus right now?",

// After - More professional
greeting: "Welcome to Iron Fitness. I'm here to help you find the right membership option.\n\nHow can I assist you today?",

// After - Urgent/Sales focused
greeting: "🔥 Limited spots available this month! Don't miss out on our transformation program.\n\nWhat's holding you back from starting?",
```

### Modifying Question Prompts

Each step of the conversation has its own prompt:

```typescript
export const conversationCopy = {
  // Fitness level question
  fitnessLevelPrompt: "Great choice! Our program is designed to meet you where you are.\n\nWhat's your current fitness level?",
  
  // Goals question
  goalPrompt: "What's your main goal? (Be specific - e.g., 'lose 20lbs', 'build muscle', 'improve endurance')",
  
  // Timeline question
  timelinePrompt: "Love it! That's a clear target. Sustainable results come from consistent habits.\n\nWhen are you looking to start?",
  
  // Budget question
  budgetPrompt: "What's your budget range for membership?",
  
  // Contact info request
  contactPrompt: "Got it! Let me get your contact info so we can send you the details and pricing options.",
  
  // Trial booking
  trialPrompt: "Awesome! One last thing - want to schedule a FREE trial session? It's the best way to experience what we're all about. No pressure, just pure value.",
  
  // Success message
  confirmationMessage: "You're all set! We'll send you the details and follow up within 24 hours. Get ready to start your fitness journey!",
};
```

**Example: Changing Goal Prompt**

```typescript
// Before
goalPrompt: "What's your main goal? (Be specific - e.g., 'lose 20lbs', 'build muscle', 'improve endurance')",

// After - More motivational
goalPrompt: "Let's get specific! What transformation are you working toward? The clearer your goal, the better we can help you achieve it.",

// After - Simpler
goalPrompt: "What would you like to achieve with your fitness journey?",
```

### Customizing Button Labels

Button options appear as clickable choices for users:

```typescript
// Greeting options (what brings you here)
greetingOptions: {
  weight_loss: "Sustainable fat loss",
  build_muscle: "Build muscle and strength",
  general_fitness: "General fitness and health",
  personal_training: "Personal training",
  browsing: "Just browsing",
},

// Fitness level options
fitnessLevelOptions: {
  beginner: "Beginner - just getting started",
  some_experience: "Some experience - getting back into it",
  advanced: "Advanced - looking to optimize",
},

// Timeline options
timelineOptions: {
  this_week: "This week - ready to go!",
  within_month: "Within the next month",
  just_exploring: "Just exploring my options",
},

// Budget options
budgetOptions: {
  "$50-100": "$50-100/month",
  "$100-200": "$100-200/month",
  "$200+": "$200+/month",
  "not_sure": "Not sure yet",
},

// Trial booking buttons
trialButtons: {
  yes: "Yes, Book Trial",
  no: "No Thanks",
},
```

**Example: Customizing Budget Options**

```typescript
// Before
budgetOptions: {
  "$50-100": "$50-100/month",
  "$100-200": "$100-200/month",
  "$200+": "$200+/month",
  "not_sure": "Not sure yet",
},

// After - Higher price points for premium gym
budgetOptions: {
  "$100-200": "$100-200/month",
  "$200-350": "$200-350/month",
  "$350+": "$350+/month (VIP)",
  "not_sure": "Let's discuss options",
},

// After - Lower price points for budget gym
budgetOptions: {
  "$20-40": "$20-40/month",
  "$40-80": "$40-80/month",
  "$80+": "$80+/month (Premium)",
  "not_sure": "Show me all options",
},
```

### Adjusting Response Messages

Customize the chatbot's responses based on user selections:

```typescript
// Responses based on fitness level
fitnessLevelResponses: {
  beginner: "No worries! Everyone starts somewhere. Beginners often see the fastest results when they stay consistent.",
  some_experience: "Welcome back! Muscle memory is real - you'll be surprised how quickly things click again.",
  advanced: "Solid! Ready to take it to the next level. Let's dial in your training for maximum results.",
},

// Responses based on timeline
timelineResponses: {
  this_week: "That's the spirit! Your future self is already thanking you for showing up.",
  within_month: "Perfect timing! Let's get you set up for success.",
  just_exploring: "Smart move! Knowledge first, then action. Let's see what works for your situation.",
},
```

**Example: Full Conversation Customization**

```typescript
// Before/After comparison for a boot camp gym

// BEFORE (default)
export const conversationCopy = {
  greeting: "Hey! Looking to get in shape and build real strength?...",
  fitnessLevelPrompt: "What's your current fitness level?",
  // ... etc
};

// AFTER (boot camp themed)
export const conversationCopy = {
  greeting: "Ready to join the toughest (and most fun) workout in town? Our boot camp classes will push you to be your best self!\n\nWhat's your fitness mission?",
  
  fitnessLevelPrompt: "Don't worry - we scale EVERYTHING. Where are you starting from?",
  
  goalPrompt: "What's the #1 result you want from boot camp?",
  
  timelinePrompt: "When should we save your spot? Classes fill up fast!",
  
  budgetPrompt: "Check out our membership options:",
  
  contactPrompt: "Almost there! Drop your info and we'll send class schedules right over.",
  
  trialPrompt: "Want to try a FREE class? Come see what the hype is about!",
  
  confirmationMessage: "BOOM! 💪 You're on the list! Check your email for next steps. See you in class!",
  
  // ... customize other options as needed
};
```

---

## 5. Business Information

Configure your business contact details in `shared/config.ts`:

```typescript
export const businessInfo = {
  /** Email address for lead notifications */
  businessEmail: "leads@example.com",
  
  /** Official business name */
  businessName: "Your Fitness Studio",
  
  /** Website URL */
  websiteUrl: "https://example.com",
  
  /** Phone number (optional) */
  phoneNumber: "",
  
  /** Physical address (optional) */
  address: "",
} as const;
```

### Setting Up Notification Email

The `businessEmail` is where lead notifications are sent:

```typescript
// Before
businessEmail: "leads@example.com",

// After
businessEmail: "john@ironfitness.com",

// Or use a shared inbox
businessEmail: "sales@yourgym.com",
```

### Adding Business Contact Details

```typescript
export const businessInfo = {
  businessEmail: "info@ironfitness.com",
  businessName: "Iron Fitness Studio",
  websiteUrl: "https://ironfitness.com",
  phoneNumber: "(555) 123-4567",
  address: "123 Main Street, Suite 100, Anytown, ST 12345",
} as const;
```

---

## 6. Feature Toggles

Enable or disable features using the feature flags in `shared/config.ts`:

```typescript
export const featureFlags = {
  /** Send email notifications when new leads are captured */
  enableEmailNotifications: true,
  
  /** Track analytics events (widget opens, conversions, etc.) */
  enableAnalytics: true,
  
  /** Allow users to book trial sessions through the chatbot */
  enableTrialBooking: true,
  
  /** Show progress indicator in the chat */
  enableProgressIndicator: true,
  
  /** Show confetti animation on successful booking */
  enableConfetti: true,
} as const;
```

### Feature Descriptions

| Feature | Description | When to Disable |
|---------|-------------|-----------------|
| `enableEmailNotifications` | Sends email when new lead is captured | If using CRM integration only |
| `enableAnalytics` | Tracks conversion funnel events | If not needed for reporting |
| `enableTrialBooking` | Shows trial booking step in chat | If not offering free trials |
| `enableProgressIndicator` | Shows step progress bar | For simpler conversation flow |
| `enableConfetti` | Celebration animation on success | For more professional/minimal look |

### Example Configurations

**Minimal Setup (no frills):**
```typescript
export const featureFlags = {
  enableEmailNotifications: true,
  enableAnalytics: false,
  enableTrialBooking: false,
  enableProgressIndicator: false,
  enableConfetti: false,
} as const;
```

**Full Featured (default):**
```typescript
export const featureFlags = {
  enableEmailNotifications: true,
  enableAnalytics: true,
  enableTrialBooking: true,
  enableProgressIndicator: true,
  enableConfetti: true,
} as const;
```

---

## 7. Email Notifications

Email notifications are configured through environment variables in your `.env` file.

### Step 1: Create Your .env File

Copy the sample file:

```bash
cp .env.sample .env
```

### Step 2: Configure SMTP Settings

Edit your `.env` file with your email provider settings:

```env
# Email Notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NOTIFICATION_EMAIL=leads@yourgym.com
```

### Gmail App Password Setup

Gmail requires an "App Password" instead of your regular password:

1. Go to your Google Account: https://myaccount.google.com
2. Click **Security** in the left menu
3. Under "Signing in to Google", click **2-Step Verification** (enable if not already)
4. At the bottom, click **App passwords**
5. Select app: **Mail**
6. Select device: **Other** (enter "Gym Chatbot")
7. Click **Generate**
8. Copy the 16-character password (no spaces)
9. Use this as your `SMTP_PASS` in `.env`

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=yourgym@gmail.com
SMTP_PASS=abcd efgh ijkl mnop  # Your 16-character app password
NOTIFICATION_EMAIL=yourgym@gmail.com
```

### Other Email Providers

**Outlook/Office 365:**
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

**SendGrid:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

**Mailgun:**
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-mailgun-password
```

### Testing Email Delivery

After configuration, test by:

1. Open the chatbot widget
2. Complete the entire conversation flow
3. Submit a test lead
4. Check your notification email inbox
5. Also check spam/junk folders

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Emails not sending | Verify SMTP credentials are correct |
| Authentication failed | Use App Password for Gmail, not regular password |
| Connection timeout | Check SMTP_HOST and SMTP_PORT values |
| Emails in spam | Add your domain to SPF records |

---

## 8. Advanced Customization

For deeper customization beyond the config file, you can modify CSS and component styling.

### CSS Variables

The app uses CSS custom properties defined in `client/src/index.css`. Key variables:

```css
:root {
  /* Primary colors */
  --primary: 96 85.19% 73.53%;
  --primary-foreground: 0 0% 0%;
  
  /* Background colors */
  --background: 0 0% 100%;
  --foreground: 0 0% 0%;
  
  /* Card styling */
  --card: 0 0% 96.47%;
  --card-foreground: 0 0% 0%;
  
  /* Border radius */
  --radius: 0rem;
  
  /* Fonts */
  --font-sans: 'Inter', sans-serif;
  --font-serif: 'Montserrat', sans-serif;
}
```

### Modifying Border Radius

For rounder buttons and cards:

```css
/* In client/src/index.css */
:root {
  --radius: 0.5rem;  /* Slightly rounded */
  /* or */
  --radius: 1rem;    /* More rounded */
  /* or */
  --radius: 9999px;  /* Fully rounded/pill shape */
}
```

### Font Customization

Change fonts by modifying the CSS variables:

```css
:root {
  /* Change primary font */
  --font-sans: 'Roboto', sans-serif;
  
  /* Change heading font */
  --font-serif: 'Oswald', sans-serif;
}
```

**Adding New Fonts:**

1. Add the font import to `client/index.html`:

```html
<head>
  <!-- Add Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
</head>
```

2. Update the CSS variable:

```css
:root {
  --font-sans: 'Roboto', sans-serif;
}
```

### Widget Size Customization

Modify the chat widget dimensions in the component:

```typescript
// In ChatWindow.tsx or ChatWidget.tsx
// Look for width/height classes like:
className="w-[400px] h-[600px]"  // Desktop size

// Change to:
className="w-[350px] h-[500px]"  // Smaller
className="w-[450px] h-[700px]"  // Larger
```

### Dark Mode Colors

The app supports dark mode. Customize dark theme colors:

```css
.dark {
  --background: 0 0% 0%;
  --foreground: 200 6.67% 91.18%;
  --primary: 203.77 87.60% 52.55%;
  --primary-foreground: 0 0% 100%;
  /* ... other dark mode values */
}
```

### Animation Customization

Disable or modify animations:

```css
/* Disable all animations */
* {
  animation: none !important;
  transition: none !important;
}

/* Or slow down animations */
:root {
  --animation-duration: 0.5s;
}
```

---

## Quick Reference

### File Locations

| What | Where |
|------|-------|
| Brand settings | `shared/config.ts` |
| Environment variables | `.env` |
| CSS styling | `client/src/index.css` |
| Chat widget | `client/src/components/ChatWidget.tsx` |
| Conversation flow | `client/src/components/ConversationFlow.tsx` |

### Common Tasks

| Task | Action |
|------|--------|
| Change gym name | Edit `brandName` in `shared/config.ts` |
| Change colors | Edit `themeColors` in `shared/config.ts` |
| Edit chat messages | Edit `conversationCopy` in `shared/config.ts` |
| Set notification email | Edit `NOTIFICATION_EMAIL` in `.env` |
| Disable trial booking | Set `enableTrialBooking: false` in `shared/config.ts` |

---

## Need Help?

If you encounter issues with configuration:

1. Ensure all changes are saved
2. Restart the application after making changes
3. Check browser console for errors
4. Verify `.env` file is properly formatted (no quotes around values unless containing spaces)

For advanced customization beyond this guide, consider working with a developer familiar with React and TypeScript.
