/**
 * Centralized Configuration for Gym Lead Chatbot
 * 
 * This file contains all customizable settings for the chatbot widget.
 * Modify these values to adapt the chatbot for different gyms/fitness businesses.
 */

// ============================================================================
// BRAND CONFIGURATION
// ============================================================================

/** The name of your gym or fitness brand */
export const brandName = "Gym Lead Bot";

/** A short tagline displayed in the chat header */
export const tagline = "Your 24/7 Lead Qualification Assistant";

/** The name of your main fitness program or membership */
export const programName = "Fitness Program";

// ============================================================================
// THEME COLORS
// ============================================================================

/**
 * Theme colors for the chatbot widget.
 * Use hex colors or Tailwind-compatible values.
 */
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

// ============================================================================
// CONVERSATION COPY
// ============================================================================

/**
 * All customizable chatbot messages and prompts.
 * Modify these to match your brand voice and offerings.
 */
export const conversationCopy = {
  /** Opening message when the chat starts */
  greeting: "Hey! Looking to get in shape and build real strength? You're in the right place. I'll help you find a plan that fits your life.\n\nWhat brings you here today?",
  
  /** Question about the user's current fitness level */
  fitnessLevelPrompt: "Great choice! Our program is designed to meet you where you are.\n\nWhat's your current fitness level?",
  
  /** Question about the user's fitness goals */
  goalPrompt: "What's your main goal? (Be specific - e.g., 'lose 20lbs', 'build muscle', 'improve endurance')",
  
  /** Question about when they want to start */
  timelinePrompt: "Love it! That's a clear target. Sustainable results come from consistent habits.\n\nWhen are you looking to start?",
  
  /** Question about budget */
  budgetPrompt: "What's your budget range for membership?",
  
  /** Request for contact information */
  contactPrompt: "Got it! Let me get your contact info so we can send you the details and pricing options.",
  
  /** Trial booking question */
  trialPrompt: "Awesome! One last thing - want to schedule a FREE trial session? It's the best way to experience what we're all about. No pressure, just pure value.",
  
  /** Success message after completing the form */
  confirmationMessage: "You're all set! We'll send you the details and follow up within 24 hours. Get ready to start your fitness journey!",

  /** Responses based on fitness level selection */
  fitnessLevelResponses: {
    beginner: "No worries! Everyone starts somewhere. Beginners often see the fastest results when they stay consistent.",
    some_experience: "Welcome back! Muscle memory is real - you'll be surprised how quickly things click again.",
    advanced: "Solid! Ready to take it to the next level. Let's dial in your training for maximum results.",
  },

  /** Responses based on timeline selection */
  timelineResponses: {
    this_week: "That's the spirit! Your future self is already thanking you for showing up.",
    within_month: "Perfect timing! Let's get you set up for success.",
    just_exploring: "Smart move! Knowledge first, then action. Let's see what works for your situation.",
  },

  /** Button labels for greeting options */
  greetingOptions: {
    weight_loss: "Sustainable fat loss",
    build_muscle: "Build muscle and strength",
    general_fitness: "General fitness and health",
    personal_training: "Personal training",
    browsing: "Just browsing",
  },

  /** Button labels for fitness level options */
  fitnessLevelOptions: {
    beginner: "Beginner - just getting started",
    some_experience: "Some experience - getting back into it",
    advanced: "Advanced - looking to optimize",
  },

  /** Button labels for timeline options */
  timelineOptions: {
    this_week: "This week - ready to go!",
    within_month: "Within the next month",
    just_exploring: "Just exploring my options",
  },

  /** Button labels for budget options */
  budgetOptions: {
    "$50-100": "$50-100/month",
    "$100-200": "$100-200/month",
    "$200+": "$200+/month",
    "not_sure": "Not sure yet",
  },

  /** Trial booking button labels */
  trialButtons: {
    yes: "Yes, Book Trial",
    no: "No Thanks",
  },

  /** Error messages */
  errors: {
    generic: "Oops! Let's try that again. No worries - everyone has hiccups sometimes.",
    saveFailed: "Failed to save your information. Please try again.",
  },
} as const;

// ============================================================================
// CONTACT/BUSINESS INFO
// ============================================================================

/**
 * Business contact information for notifications and branding.
 */
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

// ============================================================================
// FEATURE FLAGS
// ============================================================================

/**
 * Toggle features on/off for your implementation.
 */
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

// ============================================================================
// COMBINED CONFIG OBJECT
// ============================================================================

/**
 * Complete configuration object containing all settings.
 * Import this for access to all configuration in one place.
 */
export const config = {
  brand: {
    name: brandName,
    tagline,
    programName,
  },
  theme: themeColors,
  copy: conversationCopy,
  business: businessInfo,
  features: featureFlags,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type ThemeColors = typeof themeColors;
export type ConversationCopy = typeof conversationCopy;
export type BusinessInfo = typeof businessInfo;
export type FeatureFlags = typeof featureFlags;
export type Config = typeof config;
