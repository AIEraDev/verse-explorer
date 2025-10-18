# Verse Explorer - Client

A modern, responsive web application for exploring the Holy Quran with audio recitations and translations.

## Features

- 📖 **Chapter Browsing**: View all 114 chapters (Surahs) of the Quran
- 🎵 **Audio Recitations**: Listen to verses with multiple reciters (test environment has limited availability)
- 🌍 **Translations**: Access translations in multiple languages
- 🎨 **Modern UI**: Clean, accessible interface built with Radix UI components
- 🌓 **Dark Mode**: Full dark mode support with next-themes
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- ⚡ **Performance**: Optimized with React Query for efficient data fetching and caching

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling**: React Hook Form with Zod validation

## Prerequisites

- Node.js 18+ or higher
- pnpm (recommended) or npm

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install
# or
npm install
```

### Environment Variables

Create a `.env.local` file in the client directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3067/api
```

Replace the URL with your backend server URL (default is `http://localhost:3067/api`).

### Development

```bash
# Start the development server
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create an optimized production build
pnpm build
# or
npm run build

# Start the production server
pnpm start
# or
npm start
```

### Linting

```bash
# Run ESLint
pnpm lint
# or
npm run lint
```

## Project Structure

```
client/
├── app/                    # Next.js App Router pages
│   ├── chapter/           # Chapter detail pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── loading.tsx        # Loading states
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components (Radix UI)
│   ├── chapter-list.tsx  # Chapter listing component
│   ├── reciter-selector.tsx
│   ├── translation-selector.tsx
│   └── verse-list.tsx
├── hooks/                 # Custom React hooks
│   ├── use-audio.ts      # Audio playback management
│   ├── use-chapters.ts   # Chapter data fetching
│   ├── use-reciters.ts   # Reciter data fetching
│   ├── use-translations.ts
│   └── use-verses.ts
├── lib/                   # Utility functions
│   ├── constant.ts       # App constants
│   └── utils.ts          # Helper functions
├── providers/            # React context providers
│   └── query-provider.tsx
└── public/               # Static assets
```

## Available Scripts

| Script       | Description                           |
| ------------ | ------------------------------------- |
| `pnpm dev`   | Start development server on port 3000 |
| `pnpm build` | Build for production                  |
| `pnpm start` | Start production server               |
| `pnpm lint`  | Run ESLint to check code quality      |

## Key Components

### Chapter List

Displays all chapters with metadata including name, translation, verses count, and revelation location.

### Verse List

Shows verses for a selected chapter with:

- Arabic text
- Translation selector
- Audio player with reciter selection
- Verse numbering

### Audio Player

Integrated audio player supporting:

- Play/Pause controls
- Reciter selection
- Auto-play next verse
- Playback controls

## API Integration

The client communicates with the backend server through REST APIs:

- `GET /api/chapters` - List all chapters
- `GET /api/chapters/:id` - Get chapter details
- `GET /api/chapters/:id/verses` - Get chapter verses
- `GET /api/translations` - List available translations
- `GET /api/reciters` - List available reciters
- `GET /api/audio/:reciterId/:chapterId/:verseKey` - Get audio URL

## Customization

### Theme

Edit `app/globals.css` to customize the color scheme. The app supports both light and dark modes.

### Components

All UI components are in the `components/ui` directory and can be customized using Tailwind classes.

## Known Limitations

- **Test API**: Currently using Quran.Foundation Test API with limited data
- **Audio**: Only Mahmoud Khaleel Al-Husary recitations are fully functional in test environment
- **Translations**: Limited translation availability in test mode

## Performance Optimization

- React Query caching reduces redundant API calls
- Next.js automatic code splitting
- Image optimization with Next.js Image component
- Lazy loading for better initial page load

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Data provided by [Quran.Foundation API](https://quran.foundation)
- UI components by [Radix UI](https://www.radix-ui.com/)
- Icons by [Lucide](https://lucide.dev/)
