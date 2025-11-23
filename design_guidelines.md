# Dad Bod Reset Chatbot Widget - Design Guidelines

## Design Approach

**Reference-Based**: Drawing inspiration from Intercom and Drift for widget mechanics, combined with fitness app aesthetics (like Future, MyFitnessPal premium) and the authentic, no-BS personality of the Dad Bod Reset brand. This isn't a corporate chatbot—it's a coaching conversation.

## Typography System

**Font Stack**:
- Primary: Inter (Google Fonts) - clean, modern, highly readable for chat
- Accent Headers: Montserrat Bold (Google Fonts) - strong, confident for motivational moments

**Hierarchy**:
- Widget Button Icon: 24px
- Chat Messages (Bot): 15px, font-medium
- Chat Messages (User): 15px, font-normal  
- Input Field: 16px, font-normal
- Button CTAs: 15px, font-semibold, uppercase tracking-wide
- Progress Steps: 13px, font-medium
- Admin Table Headers: 14px, font-semibold
- Admin Table Data: 14px, font-normal
- Success Messages: 18px, font-bold

## Spacing System

Use Tailwind units: **2, 3, 4, 6, 8, 12, 16** for consistent rhythm

- Widget button: p-4, rounded-full
- Chat window padding: p-6
- Message bubbles: px-4 py-3, mb-3
- Between question/response groups: mb-6
- Button spacing: px-6 py-3
- Input fields: px-4 py-3
- Admin panel sections: p-8
- Card components: p-6

## Widget Layout Structure

### Floating Chat Button
- Fixed bottom-right position: bottom-6 right-6
- Circular button: 64px × 64px (w-16 h-16)
- Chat icon from Heroicons (chat-bubble-left-right)
- Subtle shadow for depth
- Notification badge (when applicable): absolute top-0 right-0, 20px circle with count

### Expanded Chat Window
**Desktop**: 400px wide × 600px tall, fixed bottom-right with 24px margin from edges
**Mobile**: Full screen takeover (100vw × 100vh)

**Structure**:
- Header bar: h-16, flex items-center justify-between, px-6
  - Logo/brand name on left
  - Minimize/close icons on right (Heroicons: minus, x-mark)
- Chat content area: flex-1, overflow-y-auto, px-6 py-4
- Input area: sticky bottom, px-6 py-4, border-top

### Message Bubbles
**Bot Messages**:
- Left-aligned, max-width 85%
- Rounded corners: rounded-2xl rounded-tl-sm (speech bubble effect)
- Include avatar icon (dumbbell or coaching icon from Heroicons)
- Appear with subtle slide-up animation

**User Messages**:
- Right-aligned, max-width 75%
- Rounded corners: rounded-2xl rounded-tr-sm
- Simpler styling than bot messages

### Progress Indicator
Horizontal stepper above chat area showing: Intro → Goals → Details → Booking → Done
- 5 circles connected by lines
- Current step: filled, others outlined
- Completed steps: checkmark icon (Heroicons: check)

### Input Components

**Multiple Choice Buttons**:
- Grid layout: grid-cols-1 gap-3
- Each button: w-full, text-left, px-4 py-3, rounded-lg, border-2
- Hover/focus states with subtle lift effect
- Selected state with thicker border

**Text Input Fields**:
- Full width, rounded-lg, px-4 py-3
- Floating label pattern (label moves up on focus)
- Error state with shake animation

**Calendar Picker**:
- 7-column grid for week view
- Date tiles: 44px × 44px, rounded-lg
- Time slots in 2-column grid below date selection
- Each slot: px-4 py-2, rounded-md

**Primary CTA Button**:
- Full width or auto based on context
- Chunky padding: px-8 py-4
- Rounded: rounded-full
- Icon on right (Heroicons: arrow-right)

## Admin Panel Layout

**Full Dashboard View**:
- Sidebar navigation: 240px wide, fixed left
  - Dashboard, Leads, Export, Settings menu items
  - Each item: px-4 py-3, rounded-lg, with icon from Heroicons

**Main Content Area**:
- Container: max-w-7xl mx-auto, px-8 py-12
- Header section: mb-12
  - Page title: text-4xl font-bold
  - Stats cards in grid: grid-cols-1 md:grid-cols-4 gap-6
  - Each stat card: p-6, rounded-xl, with icon, number (text-3xl font-bold), and label

**Leads Table**:
- Full width with rounded-xl border
- Sticky header row
- Alternating row backgrounds for readability
- Columns: Name, Email, Phone, Goal, Budget, Date, Actions
- Action buttons (View, Export): icon-only, rounded-lg, p-2
- Pagination controls at bottom: flex items-center justify-between

**Filter Bar**:
- Horizontal flex layout above table
- Filter dropdowns: 180px wide each, gap-4
- Date range picker, goal filter, budget filter
- Clear filters button on right

## Special Components

### Confetti Animation
On booking confirmation: canvas overlay, full viewport, z-index-50, auto-dismiss after 3s

### Success Confirmation Card
- Centered in chat: max-w-sm mx-auto
- Large checkmark icon: w-16 h-16 (Heroicons: check-circle)
- Summary list with icons for each captured detail
- Next steps callout box with distinct background

### Loading States
- Typing indicator: 3 animated dots in bot message bubble
- Skeleton loaders for admin table rows: animated pulse effect

## Mobile Responsiveness

**Chat Widget**:
- Mobile (< 768px): Full screen overlay, no floating button visible when open
- Tablet/Desktop: Persistent floating button, 400×600px chat window

**Admin Panel**:
- Mobile: Sidebar collapses to hamburger menu
- Table: Horizontal scroll with sticky first column
- Stats cards: Stack to single column

## Brand Voice Integration in UI

- Welcome message includes emoji: "Hey! 👋"
- Motivational micro-copy throughout: "Your future self will thank you 🔥"
- Button labels use brand phrases: "Let's Do This", "I'm Ready", "Book My Free Session"
- Error messages stay encouraging: "Oops! Let's try that again" (not harsh)
- Success confirmations celebrate: "Heck yeah! You're booked 💪"

## Images

No hero images required for this chat widget interface. The chatbot is a conversational UI where the focus is on message flow and input interaction. However:

**Avatar/Icon Usage**:
- Bot avatar in message bubbles: Use a dumbbell icon or coaching whistle icon
- Success confirmation: Use celebration/trophy imagery
- Empty states in admin: Illustration of clipboard or analytics dashboard

The emphasis is on clean, functional design that feels like a personal coaching conversation, not a corporate support chat.