# Gym Lead Chatbot

AI-powered lead qualification chatbot for fitness businesses. Capture, qualify, and convert leads 24/7 with an embeddable chat widget.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/typescript-%5E5.0-blue.svg)

## Features

- **24/7 Automated Lead Qualification** - Capture leads around the clock with intelligent conversation flows
- **WordPress Embeddable Widget** - Easy integration with any website using a simple script tag
- **Real-time Admin Dashboard** - Monitor leads, view analytics, and manage conversations
- **Analytics & Conversion Tracking** - Track widget opens, completions, and conversion rates
- **Email Notifications** - Instant alerts when new leads are captured
- **Customizable Branding** - Configure colors, messaging, and brand voice to match your gym
- **Mobile-Responsive Design** - Optimized experience across all devices
- **AI-Powered Conversations** (Optional) - Enhanced responses using OpenAI integration

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon-compatible)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/gym-lead-chatbot.git
   cd gym-lead-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.sample .env
   ```
   Edit `.env` with your database credentials and other settings.

4. **Push database schema**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`.

## Configuration

All chatbot settings are centralized for easy customization:

- **`shared/config.ts`** - Brand name, colors, conversation copy, and feature flags
- **`.env`** - Database connection, email settings, and API keys

For detailed configuration options, see [CONFIGURATION.md](./CONFIGURATION.md).

## Deployment

### Production Build

```bash
npm run build
npm start
```

### WordPress Integration

Add this script to your WordPress site to embed the chat widget:

```html
<script src="https://your-domain.com/widget-loader.js"></script>
```

For detailed deployment instructions including Docker and cloud hosting, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- TanStack Query

### Backend
- Express.js
- Drizzle ORM
- PostgreSQL (Neon-compatible)
- Nodemailer for email

### Optional
- OpenAI API for AI-powered responses

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # UI components (ChatWidget, LeadsTable, etc.)
│   │   ├── pages/          # Page components (Home, AdminPanel)
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and query client
├── server/                 # Backend Express application
│   ├── routes.ts           # API endpoints
│   ├── storage.ts          # Database operations
│   ├── email.ts            # Email notifications
│   └── ai.ts               # OpenAI integration
├── shared/                 # Shared code between client/server
│   ├── config.ts           # Centralized configuration
│   └── schema.ts           # Database schema and types
└── public/                 # Static assets
    └── widget-loader.js    # Embeddable widget script
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

Built with purpose for fitness businesses ready to grow.
