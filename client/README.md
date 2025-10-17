# Verse Explorer

A modern web application for exploring the Holy Quran with translations and audio recitations. Built with Next.js 15, Express, and the Quran.Foundation API.

## Features

- **Browse Chapters**: View all 114 chapters (Surahs) with metadata
- **Search**: Real-time search across chapter names and translations
- **Read Verses**: Beautiful display of Arabic text with translations
- **Audio Playback**: Listen to verse recitations with automatic playback of next ayah
- **Multiple Translations**: Choose from various English translations
- **Responsive Design**: Works seamlessly on desktop and mobile
- **OAuth2 Authentication**: Secure API access with token caching
- **Performance Optimized**: LRU caching for fast response times

## Important Notes

### API Environment

This application uses the **Quran.Foundation Pre-Production (Test) API**, which has **limited data availability**. Not all reciters, translations, or features may be fully available in the test environment.

**Test API Base URL:** `https://apis-prelive.quran.foundation/content/api/v4`

For production use, you would need to switch to the production API endpoint with appropriate credentials.

### Audio Recitation

Due to the Pre-Production API limitations, currently only **Mahmoud Khaleel Al-Husary (Reciter ID: 6)** audio recitations are fully supported and working. Other reciters may not have audio available through the test API endpoint.

**Working Reciter:**

- **Name**: Mahmoud Khaleel Al-Husary
- **ID**: 6
- **Style**: Murattal
- **Qirat**: Hafs

The application includes automatic playback of the next ayah when the current ayah finishes playing, providing a seamless listening experience.

## React Query Implementation

This project uses **TanStack React Query (v5)** for all data fetching and caching, providing:

### Benefits

- **Automatic Caching**: Smart caching with configurable stale times
- **Background Refetching**: Keep data fresh automatically
- **Loading & Error States**: Built-in state management
- **Request Deduplication**: Prevent duplicate API calls
- **DevTools**: Debug queries in development mode

### Caching Strategy

Different data types have optimized cache durations:

- **Chapters**: 5 minutes (rarely change)
- **Verses**: 3 minutes (moderate changes)
- **Translations**: 10 minutes (very stable)
- **Reciters**: 10 minutes (very stable)
- **Audio URLs**: 30 minutes (long-lived URLs)

### Custom Hooks

All API interactions are abstracted into custom hooks:

- `useChapters()` - Fetch all chapters
- `useChapter(id)` - Fetch single chapter
- `useVerses({ chapterId, translationId, perPage })` - Fetch verses
- `useTranslations()` - Fetch available translations
- `useReciters()` - Fetch available reciters
- `useAudio({ reciterId, chapterId, verseNumber })` - Fetch audio URL

### DevTools

React Query DevTools are available in development mode. Press the React Query icon in the bottom-left corner to inspect cache, queries, and mutations.

## Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Modern styling with design tokens
- **shadcn/ui** - High-quality UI components
- **TanStack React Query** - Powerful data fetching and caching

### Backend

- **Express** - Node.js web framework
- **OAuth2** - Secure API authentication
- **LRU Cache** - In-memory caching layer
- **Quran.Foundation API** - Quranic data source

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm (or npm)
- Quran.Foundation API credentials ([Get them here](https://api-docs.quran.com/docs/quickstart/))

### Installation

1. **Clone the repository** \`\`\`bash git clone <your-repo-url> cd verse-explorer \`\`\`

2. **Install frontend dependencies** \`\`\`bash pnpm install \`\`\`

3. **Install backend dependencies** \`\`\`bash cd backend pnpm install \`\`\`

4. **Configure environment variables**

   Create `backend/.env` file: \`\`\`env QURAN_CLIENT_ID=your_client_id_here QURAN_CLIENT_SECRET=your_client_secret_here QURAN_TOKEN_ENDPOINT=https://api.quran.foundation/oauth/token QURAN_API_BASE_URL=https://apis-prelive.quran.foundation/content/api/v4 QURAN_CLIENT_URL=http://localhost:3000 PORT=3067 \`\`\`

   Create `.env.local` file in the root: \`\`\`env NEXT_PUBLIC_API_URL=http://localhost:3001 \`\`\`

### Running the Application

1. **Start the backend server** \`\`\`bash cd backend pnpm start

   # or for development with auto-reload

   pnpm dev \`\`\`

2. **Start the frontend** (in a new terminal) \`\`\`bash pnpm dev \`\`\`

3. **Open your browser** Navigate to [http://localhost:3000](http://localhost:3000)

## API Endpoints

The Express backend provides the following endpoints:

- `GET /health` - Health check
- `GET /api/chapters` - List all chapters
- `GET /api/chapters/:id/verses` - Get verses for a chapter
  - Query params: `page`, `per_page`, `translations`, `words`, `audio`, `tafsirs`
- `GET /api/reciters` - List available reciters
- `GET /api/translations` - List available translations
- `GET /api/audio/:reciterId/:chapterId/:verseNumber` - Get audio for a verse

## Testing

Run the integration tests:

\`\`\`bash cd backend pnpm test \`\`\`

The test suite covers:

- Health check endpoint
- Chapter fetching and caching
- Verse retrieval with translations
- Pagination functionality
- Reciter and translation listings
- Audio endpoint
- Error handling

## Project Structure

\`\`\` verse-explorer/ ├── app/ # Next.js app directory │ ├── page.tsx # Home page with chapter list │ ├── chapter/[id]/ # Dynamic chapter pages │ ├── layout.tsx # Root layout │ └── globals.css # Global styles ├── components/ # React components │ ├── chapter-list.tsx # Chapter grid with search │ ├── verse-list.tsx # Verse display with audio │ ├── translation-selector.tsx │ └── reciter-selector.tsx ├── backend/ # Express server │ ├── server.js # Main server file │ ├── quran-client.js # OAuth2 API client │ └── test/ # Integration tests └── public/ # Static assets \`\`\`

## Caching Strategy

The backend implements a two-tier caching strategy:

1. **OAuth2 Token Cache**: Access tokens are cached and automatically refreshed
2. **API Response Cache**: LRU cache with 1-hour TTL for API responses
   - Reduces API calls by ~90%
   - Improves response times significantly
   - Configurable cache size (default: 500 items)

## Deployment

### Backend Deployment

Deploy the Express backend to any Node.js hosting platform:

\`\`\`bash cd backend

# Set environment variables on your platform

# Deploy using your platform's CLI or Git integration

\`\`\`

### Frontend Deployment

Deploy to Vercel (recommended):

\`\`\`bash

# Install Vercel CLI

pnpm i -g vercel

# Deploy

vercel

# Set environment variable

vercel env add NEXT_PUBLIC_API_URL \`\`\`

Update `NEXT_PUBLIC_API_URL` to point to your deployed backend.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [Quran.Foundation](https://quran.foundation/) for providing the API
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- The open-source community for the amazing tools and libraries

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
