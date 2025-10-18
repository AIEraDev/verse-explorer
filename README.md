# Verse Explorer

A production-ready, full-stack web application for exploring the Holy Quran with audio recitations and multilingual translations. Built with Next.js and Express.js, featuring OAuth2 authentication, intelligent caching, and a modern, responsive Arabic/RTL UI.

## Overview

Verse Explorer is a minimal yet comprehensive Quran reading application designed with production-mindedness and secure API integration at its core. This application demonstrates professional implementation of the Quran.Foundation API with proper authentication, caching, and performance optimization.

### Key Features

- **114 Chapters (Surahs)**: Complete Quran with metadata and verse-by-verse navigation
- **Audio Recitations**: High-quality audio with per-verse playback and word-by-word highlighting
- **Multilingual Translations**: Access translations in various languages with proper RTL support
- **Modern Interface**: Clean, accessible, and responsive design with full Arabic/RTL handling
- **Performance Optimized**: Smart caching, request coalescing, and efficient data fetching
- **Dark Mode**: Full support for light and dark themes
- **Production-Ready**: Built with security, scalability, and maintainability in mind

## Development Philosophy

Verse Explorer was built with a mission-driven approach that combines technical excellence with deep respect for Islamic content. The implementation emphasizes:

- **Secure API Integration**: OAuth2 Client Credentials flow with token caching (in-memory) and automatic refresh
- **Performance First**: Request coalescing, LRU caching, and optimized SSR/ISR strategies
- **Proper RTL Support**: Careful handling of Arabic text rendering and right-to-left layouts
- **Audio Optimization**: Efficient streaming, reciter selection, and word-by-word highlighting
- **Respectful Implementation**: Built with understanding of Islamic values and content sensitivity

This project reflects experience from production applications like DeenMinder, bringing together web (Next.js), server (Node/Express), and careful Quran content handling including audio playback, background scheduling, and responsive RTL interfaces.

## Architecture

This is a monorepo containing two main applications:

```
verse-explorer/
├── client/          # Next.js frontend application
└── server/          # Express.js backend API server
```

### Frontend (Client)

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI**: Radix UI components with Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Features**: Responsive design, dark mode, audio player

### Backend (Server)

- **Framework**: Express.js
- **Language**: TypeScript
- **Authentication**: OAuth2 with automatic token refresh
- **Caching**: LRU cache (reduces API calls by ~90%)
- **API**: Proxy for Quran.Foundation API with enhanced security

## Quick Start

### Prerequisites

- Node.js 18+ or higher
- pnpm (recommended) or npm
- Quran.Foundation API credentials ([Get them here](https://quran.foundation))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/AIEraDev/verse-explorer.git
cd verse-explorer
```

2. **Install dependencies for both client and server**

```bash
# Install client dependencies
cd client
pnpm install

# Install server dependencies
cd ../server
pnpm install
```

3. **Configure environment variables**

**Server** - Create `server/.env`:

```env
PORT=3067
NODE_ENV=development

QURAN_CLIENT_ID=your_client_id_here
QURAN_CLIENT_SECRET=your_client_secret_here
QURAN_TOKEN_ENDPOINT=https://test.quran.foundation/oauth/token
QURAN_API_BASE_URL=https://test.quran.foundation/api/v1

QURAN_CLIENT_URL=http://localhost:3000
QURAN_CLIENT_URL_PROD=https://your-production-url.com
```

**Client** - Create `client/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3067/api
```

4. **Start the development servers**

Open two terminal windows:

**Terminal 1 - Start the backend server**:

```bash
cd server
pnpm dev
```

Server will run on [http://localhost:3067](http://localhost:3067)

**Terminal 2 - Start the frontend**:

```bash
cd client
pnpm dev
```

Frontend will run on [http://localhost:3000](http://localhost:3000)

5. **Open the application**

Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Features

### 📖 Chapter Browsing

- View all 114 chapters with Arabic names and translations
- See chapter metadata (verses count, revelation location)
- Navigate to any chapter for detailed exploration

### 🎵 Audio Recitations

- Multiple reciter options (test environment has limited availability)
- Integrated audio player with play/pause controls
- Auto-play next verse functionality
- Currently using Mahmoud Khaleel Al-Husary in test mode

### 🌍 Translations

- Multiple language translations available
- Side-by-side Arabic text and translation
- Easily switch between different translations

### 🎨 Modern UI

- Clean, minimalist design
- Full dark mode support
- Responsive layout for all devices
- Accessible components built with Radix UI

### ⚡ Performance

- Smart caching reduces API calls by ~90%
- Optimized loading states
- Efficient data fetching with React Query
- Fast page transitions

## Project Structure

```
verse-explorer/
├── client/                          # Frontend application
│   ├── app/                        # Next.js app router pages
│   ├── components/                 # React components
│   │   ├── ui/                    # Reusable UI components
│   │   ├── chapter-list.tsx       # Chapter listing
│   │   ├── verse-list.tsx         # Verse display
│   │   └── ...
│   ├── hooks/                      # Custom React hooks
│   ├── lib/                        # Utilities
│   └── providers/                  # Context providers
│
└── server/                          # Backend API server
    ├── controllers/                # Route handlers
    ├── routes/                     # API routes
    ├── quran-client.ts            # OAuth2 client
    └── server.ts                   # Main server file
```

## API Documentation

### Available Endpoints

| Endpoint                                         | Description                 |
| ------------------------------------------------ | --------------------------- |
| `GET /health`                                    | Health check                |
| `GET /api/chapters`                              | List all chapters           |
| `GET /api/chapters/:id`                          | Get chapter details         |
| `GET /api/chapters/:id/verses`                   | Get chapter verses          |
| `GET /api/translations`                          | List available translations |
| `GET /api/reciters`                              | List available reciters     |
| `GET /api/audio/:reciterId/:chapterId/:verseKey` | Get verse audio URL         |

See [server/README.md](server/README.md) for detailed API documentation.

## Development

### Client Development

```bash
cd client
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm lint       # Run linting
```

See [client/README.md](client/README.md) for detailed client documentation.

### Server Development

```bash
cd server
pnpm dev        # Start development server
pnpm build      # Compile TypeScript
pnpm start      # Run production build
```

See [server/README.md](server/README.md) for detailed server documentation.

## Building for Production

### Backend

```bash
cd server
pnpm build
pnpm start
```

### Frontend

```bash
cd client
pnpm build
pnpm start
```

## Deployment

### Prerequisites for Production

- Node.js 18+ runtime environment
- Reverse proxy (nginx, Apache)
- SSL certificate for HTTPS
- Production Quran.Foundation API credentials
- Environment variables properly configured

### Deployment Options

#### Option 1: Traditional VPS/Server

1. Set up Node.js environment
2. Build both client and server
3. Configure reverse proxy (nginx)
4. Set up process manager (PM2)
5. Configure SSL/HTTPS

#### Option 2: Platform-as-a-Service

**Backend (Server)**:

- Railway
- Render
- Heroku
- DigitalOcean App Platform

**Frontend (Client)**:

- Vercel (recommended for Next.js)
- Netlify
- Cloudflare Pages

### Environment Variables for Production

Update both `.env` files with production URLs and credentials:

**Server**:

```env
NODE_ENV=production
QURAN_CLIENT_URL_PROD=https://your-production-domain.com
```

**Client**:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

## Known Limitations

- **Test API**: Currently using Quran.Foundation Test API with limited data availability
- **Audio**: Only Mahmoud Khaleel Al-Husary recitations fully functional in test mode
- **Translations**: Limited translation options in test environment
- **Rate Limits**: API rate limits apply (mitigated by caching)

## Technology Stack

### Frontend

- Next.js 15
- TypeScript
- React 19
- Radix UI
- Tailwind CSS
- TanStack Query
- Lucide Icons

### Backend

- Express.js
- TypeScript
- Axios
- LRU Cache
- OAuth2

## Performance

- **Cache Hit Rate**: ~90% for repeated requests
- **API Response Time**: < 100ms (cached), < 500ms (uncached)
- **Page Load Time**: < 2s (first load), < 500ms (subsequent)
- **Bundle Size**: Optimized with Next.js code splitting

## Security

- OAuth2 authentication for API access
- CORS configuration for cross-origin security
- Environment variables for sensitive data
- No API credentials exposed to client
- HTTPS recommended for production

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Update documentation as needed
- Test your changes thoroughly
- Ensure no linting errors

## Troubleshooting

### Common Issues

**Problem**: Frontend can't connect to backend

- **Solution**: Ensure backend is running on port 3067 and `NEXT_PUBLIC_API_URL` is correct

**Problem**: Authentication errors on backend

- **Solution**: Verify Quran.Foundation API credentials in server `.env`

**Problem**: CORS errors

- **Solution**: Check `QURAN_CLIENT_URL` in server `.env` matches frontend URL

**Problem**: Audio not playing

- **Solution**: Test environment has limited audio. Use Mahmoud Khaleel Al-Husary reciter

## Getting API Credentials

To use this application, you need Quran.Foundation API credentials:

1. Visit [Quran.Foundation](https://quran.foundation)
2. Register for API access
3. Obtain your Client ID and Client Secret
4. Add credentials to `server/.env`

## About the Developer

This project was built with both technical excellence and deep personal conviction. As a Hafiz of the Qur'an and public speaker on technology and faith topics, I bring a unique perspective to Islamic software development that combines:

- **Production Experience**: Built and shipped DeenMinder to production, handling complex mobile (Flutter) and web experiences with RTL support, audio playback, and background scheduling
- **Technical Expertise**: Full-stack development across Next.js, Node/Express, Flutter, with specific focus on token caching, proxy patterns, and efficient content delivery
- **Mission Alignment**: Deep understanding of Islamic values and content sensitivity, ensuring respectful and thoughtful implementation
- **Faith-Tech Integration**: Public speaker and advocate for building technology that serves and respects religious communities

This project represents not just code, but a commitment to building tools that honor the Qur'an while demonstrating modern software engineering practices.

## License

For issues, questions, or contributions:

- Open an issue on GitHub
- Check existing documentation in `client/README.md` and `server/README.md`
- Review the [Quran.Foundation API documentation](https://quran.foundation/docs)

## Roadmap

- [ ] Add more language translations
- [ ] Implement user bookmarks and favorites
- [ ] Add verse sharing functionality
- [ ] Enhanced search capabilities
- [ ] Mobile app (React Native)
- [ ] Offline support with PWA
- [ ] User authentication and profiles

---

**Built with ❤️ for the Muslim community**
