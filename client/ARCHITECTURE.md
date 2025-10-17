# Architecture Documentation

## System Overview

Verse Explorer is a full-stack web application that provides an elegant interface for exploring Quranic content. The architecture follows a client-server model with clear separation of concerns.

## Architecture Diagram

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                     Client (Browser)                     │
│  ┌────────────────────────────────────────────────────┐ │
│  │           Next.js 15 Frontend (Port 3000)          │ │
│  │  - React Server Components                         │ │
│  │  - Client Components with SWR                      │ │
│  │  - Tailwind CSS + shadcn/ui                        │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                           │
                           │ HTTP/REST
                           ▼
┌─────────────────────────────────────────────────────────┐
│            Express Backend (Port 3001)                   │
│  ┌────────────────────────────────────────────────────┐ │
│  │  REST API Endpoints                                │ │
│  │  - CORS enabled                                    │ │
│  │  - LRU Cache (1hr TTL)                            │ │
│  │  - Error handling                                  │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │  OAuth2 Client                                     │ │
│  │  - Token management                                │ │
│  │  - Auto-refresh                                    │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                           │
                           │ OAuth2 + REST
                           ▼
┌─────────────────────────────────────────────────────────┐
│          Quran.Foundation API (External)                 │
│  - Chapters, Verses, Translations                        │
│  - Audio recitations                                     │
│  - Reciters and resources                                │
└─────────────────────────────────────────────────────────┘
\`\`\`

## Component Architecture

### Frontend Components

#### Pages
- **`app/page.tsx`**: Home page (Server Component)
- **`app/chapter/[id]/page.tsx`**: Chapter detail page (Client Component)

#### Client Components
- **`ChapterList`**: Fetches and displays chapters with search
- **`VerseList`**: Displays verses with audio playback
- **`TranslationSelector`**: Dropdown for translation selection
- **`ReciterSelector`**: Dropdown for reciter selection

### Backend Architecture

#### Server (`server.js`)
- Express application with CORS middleware
- Route handlers for all API endpoints
- LRU cache integration
- Error handling middleware

#### OAuth2 Client (`quran-client.js`)
- Encapsulates OAuth2 flow
- Token caching and refresh logic
- Authenticated request wrapper
- API method abstractions

## Data Flow

### Chapter List Flow
1. User visits home page
2. `ChapterList` component mounts
3. Fetches from `/api/chapters`
4. Backend checks cache
5. If miss: OAuth2 auth → API call → cache → response
6. If hit: Return cached data
7. Component renders chapter cards

### Verse Reading Flow
1. User clicks chapter
2. Navigate to `/chapter/[id]`
3. Fetch chapter info and verses
4. User selects translation/reciter
5. Component re-fetches with new params
6. Verses render with audio buttons

### Audio Playback Flow
1. User clicks audio button
2. Fetch audio URL from backend
3. Backend retrieves from cache or API
4. Create HTML5 Audio element
5. Play audio with controls

## Caching Strategy

### Backend Cache (LRU)
- **Max items**: 500
- **TTL**: 1 hour
- **Keys**: Endpoint + query params
- **Benefits**: 
  - Reduces API calls
  - Faster response times
  - Respects API rate limits

### OAuth2 Token Cache
- **Storage**: In-memory (class property)
- **Refresh**: 5 minutes before expiry
- **Scope**: `content`

## Security Considerations

1. **API Credentials**: Stored in backend only, never exposed to client
2. **CORS**: Configured to allow frontend origin
3. **Environment Variables**: Sensitive data in `.env` files
4. **OAuth2**: Industry-standard authentication
5. **Input Validation**: Query parameters validated before use

## Performance Optimizations

1. **Server-Side Rendering**: Fast initial page loads
2. **Client-Side Caching**: SWR for data fetching
3. **Backend Caching**: LRU cache reduces API calls
4. **Code Splitting**: Next.js automatic code splitting
5. **Image Optimization**: Next.js Image component
6. **Lazy Loading**: Components load on demand

## Scalability Considerations

### Current Limitations
- In-memory cache (lost on restart)
- Single server instance
- No database for user data

### Future Improvements
- Redis for distributed caching
- Load balancer for multiple instances
- Database for user preferences
- CDN for static assets
- WebSocket for real-time features

## Error Handling

### Frontend
- Loading states with spinners
- Error alerts with user-friendly messages
- Fallback UI for failed requests
- Retry logic with SWR

### Backend
- Try-catch blocks around async operations
- HTTP status codes for different errors
- Detailed error logging
- Graceful degradation

## Testing Strategy

### Integration Tests
- API endpoint functionality
- OAuth2 authentication flow
- Caching behavior
- Error scenarios
- Response structure validation

### Future Testing
- Unit tests for components
- E2E tests with Playwright
- Performance testing
- Load testing

## Deployment Architecture

### Development
- Frontend: `localhost:3000`
- Backend: `localhost:3001`
- Hot reload enabled

### Production
- Frontend: Vercel (recommended)
- Backend: Any Node.js platform (Railway, Render, etc.)
- Environment variables configured on platforms
- HTTPS enabled
- Monitoring and logging

## API Design Principles

1. **RESTful**: Standard HTTP methods and status codes
2. **Consistent**: Uniform response structure
3. **Documented**: Clear endpoint descriptions
4. **Versioned**: API version in base URL
5. **Cacheable**: Appropriate cache headers
6. **Stateless**: No server-side session state

## Future Enhancements

1. **User Authentication**: Save preferences and bookmarks
2. **Offline Support**: PWA with service workers
3. **Advanced Search**: Full-text search across verses
4. **Bookmarks**: Save favorite verses
5. **Reading Plans**: Structured reading schedules
6. **Dark Mode**: Theme switching
7. **Multiple Languages**: i18n support
8. **Analytics**: Usage tracking and insights
\`\`\`



<AssistantMessageContentPart partEncoded="eyJ0eXBlIjoidGFzay13YWl0aW5nLXYxIiwiY3JlYXRlZEF0IjoxNzYwNjQ1ODgwNzQ5LCJmaW5pc2hlZEF0IjoxNzYwNjQ1ODgwNzQ5LCJpZCI6Im1Ga2ZtTlhsbTczTFU1RnAiLCJsYXN0UGFydFNlbnRBdCI6MTc2MDY0NTg4MDc0OSwicGFydHMiOlt7InR5cGUiOiJ0b29sLWNhbGxzIn1dfQ==" />



<AssistantMessageContentPart partEncoded="eyJ0eXBlIjoidGFzay1tYW5hZ2UtdG9kb3MtdjEiLCJpZCI6IkY3YmVra0szMldFUmt6T2ciLCJ0YXNrTmFtZUFjdGl2ZSI6IkNvbXBsZXRpbmcgdG9kbyBsaXN0IiwidG9vbENhbGxJZCI6InRvb2x1XzAxUXpyNTk2eGpIc04ySFg0bjVYcTRaYyIsInRhc2tOYW1lQ29tcGxldGUiOiJDb21wbGV0ZWQgdG9kbyBsaXN0IiwiY3JlYXRlZEF0IjoxNzYwNjQ1ODgxNTYxLCJmaW5pc2hlZEF0IjpudWxsLCJwYXJ0cyI6W10sImxhc3RQYXJ0U2VudEF0IjpudWxsfQ==" />
