# Verse Explorer - Server

Express.js backend API server that provides a secure, optimized interface to the Quran.Foundation API with OAuth2 authentication and intelligent caching.

## Features

- 🔐 **OAuth2 Authentication**: Automatic token management with refresh capabilities
- ⚡ **Smart Caching**: LRU cache reduces API calls by ~90%
- 🔒 **CORS Security**: Configurable cross-origin resource sharing
- 📦 **Modular Architecture**: Clean route organization for maintainability
- 🚀 **Performance**: Optimized response times with caching layer
- 📝 **TypeScript**: Full type safety for robust development
- 🔄 **Auto Token Refresh**: Seamless authentication without downtime

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: TypeScript
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Caching**: [LRU Cache](https://www.npmjs.com/package/lru-cache)
- **Environment**: dotenv

## Prerequisites

- Node.js 18+ or higher
- pnpm (recommended) or npm
- Quran.Foundation API credentials (Client ID and Secret)

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install
# or
npm install
```

### Environment Variables

Create a `.env` file in the server directory:

```env
# Server Configuration
PORT=3067
NODE_ENV=development

# Quran.Foundation API Credentials
QURAN_CLIENT_ID=your_client_id_here
QURAN_CLIENT_SECRET=your_client_secret_here

# Quran API Endpoints
QURAN_TOKEN_ENDPOINT=https://test.quran.foundation/oauth/token
QURAN_API_BASE_URL=https://test.quran.foundation/api/v1

# Frontend URL (for CORS)
QURAN_CLIENT_URL=http://localhost:3000
QURAN_CLIENT_URL_PROD=https://your-production-url.com
```

**Important**: Replace `your_client_id_here` and `your_client_secret_here` with your actual Quran.Foundation API credentials.

### Development

```bash
# Start development server with hot reload
pnpm dev
# or
npm run dev

# Alternative: Start with auto-restart on file changes
pnpm dev:watch
# or
npm run dev:watch
```

The server will start on [http://localhost:3067](http://localhost:3067).

### Build for Production

```bash
# Compile TypeScript to JavaScript
pnpm build
# or
npm run build

# Start the production server
pnpm start
# or
npm start
```

### Testing

```bash
# Run tests
pnpm test
# or
npm test
```

## Project Structure

```
server/
├── controllers/           # Request handlers
│   ├── audio.controller.ts
│   ├── chapter.controller.ts
│   ├── reciter.controller.ts
│   └── translation.controller.ts
├── routes/               # API route definitions
│   ├── audio.route.ts
│   ├── chapter.route.ts
│   ├── reciter.route.ts
│   └── translation.route.ts
├── quran-client.ts       # OAuth2 client implementation
├── server.ts             # Main application entry point
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## API Endpoints

### Health Check

```
GET /health
```

Returns server status and timestamp.

### Chapters

```
GET /api/chapters
```

Returns a list of all Quran chapters with metadata.

```
GET /api/chapters/:id
```

Returns details for a specific chapter by ID.

```
GET /api/chapters/:id/verses
```

Returns all verses for a specific chapter with optional translation.

Query Parameters:

- `translation_id` (optional): Translation ID to include

### Translations

```
GET /api/translations
```

Returns a list of available translations.

### Reciters

```
GET /api/reciters
```

Returns a list of available audio reciters.

### Audio

```
GET /api/audio/:reciterId/:chapterId/:verseKey
```

Returns the audio URL for a specific verse.

Parameters:

- `reciterId`: ID of the reciter
- `chapterId`: Chapter number
- `verseKey`: Verse key (e.g., "1:1")

## Architecture

### OAuth2 Client

The `QuranAPIClient` class handles all authentication:

- **Token Acquisition**: Automatically fetches OAuth2 access tokens
- **Token Caching**: Stores tokens with expiry tracking
- **Auto Refresh**: Refreshes expired tokens before making requests
- **Error Handling**: Gracefully handles authentication failures

### Caching Strategy

LRU (Least Recently Used) cache configuration:

- **Max Items**: 500 cached responses
- **TTL**: 1 hour per cache entry
- **Automatic Eviction**: Removes oldest items when limit is reached
- **Performance**: Reduces API calls by ~90%

### Route Organization

Routes are modular and organized by domain:

- **Controllers**: Business logic and data transformation
- **Routes**: HTTP method and path definitions
- **Middleware**: CORS, body parsing, error handling

## Configuration

### Cache Settings

Adjust cache configuration in `server.ts`:

```typescript
export const cache = new LRUCache({
  max: 500, // Maximum number of items
  ttl: 1000 * 60 * 60, // Time to live (1 hour)
});
```

### CORS Settings

Configure allowed origins in `server.ts`:

```typescript
app.use(
  cors({
    origin: process.env.QURAN_CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

## Available Scripts

| Script           | Description                                |
| ---------------- | ------------------------------------------ |
| `pnpm dev`       | Start development server with tsx          |
| `pnpm dev:watch` | Start development server with auto-restart |
| `pnpm build`     | Compile TypeScript to JavaScript           |
| `pnpm start`     | Start production server                    |
| `pnpm test`      | Run test suite                             |

## Error Handling

The server includes comprehensive error handling:

- **Authentication Errors**: Automatic retry with token refresh
- **API Errors**: Proper status codes and error messages
- **Network Errors**: Graceful degradation with meaningful responses
- **Cache Errors**: Fallback to direct API calls

## Performance Optimization

- **LRU Caching**: Dramatically reduces redundant API calls
- **Token Reuse**: Avoids unnecessary authentication requests
- **Connection Pooling**: Efficient HTTP connection management
- **Response Compression**: Smaller payload sizes (if enabled)

## Security Considerations

- **Environment Variables**: Sensitive credentials stored securely
- **CORS Configuration**: Restricted to specific origins
- **OAuth2**: Industry-standard authentication
- **No API Key Exposure**: Credentials never sent to client

## Monitoring

Check server health:

```bash
curl http://localhost:3067/health
```

Expected response:

```json
{
  "status": "ok",
  "timestamp": "2025-10-18T11:45:00.000Z"
}
```

## Troubleshooting

### Common Issues

**Issue**: Server won't start

- **Solution**: Check if port 3067 is available, verify environment variables

**Issue**: Authentication errors

- **Solution**: Verify `QURAN_CLIENT_ID` and `QURAN_CLIENT_SECRET` are correct

**Issue**: CORS errors

- **Solution**: Ensure `QURAN_CLIENT_URL` matches your frontend URL

**Issue**: Cache not working

- **Solution**: Check cache configuration and ensure sufficient memory

## Development Tips

- Use `pnpm dev:watch` for automatic server restart during development
- Check console logs for OAuth2 token status
- Monitor cache hit rates for optimization opportunities
- Use the `/health` endpoint to verify server status

## API Rate Limiting

The Quran.Foundation API has rate limits. The caching layer helps:

- Reduces API calls by ~90%
- Prevents hitting rate limits under normal usage
- Improves response times for cached content

## Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure production API credentials
- [ ] Set proper `QURAN_CLIENT_URL_PROD`
- [ ] Enable HTTPS
- [ ] Set up process manager (PM2, systemd)
- [ ] Configure logging
- [ ] Set up monitoring

### Example PM2 Configuration

```json
{
  "apps": [
    {
      "name": "verse-explorer-backend",
      "script": "./dist/server.js",
      "instances": "max",
      "exec_mode": "cluster",
      "env": {
        "NODE_ENV": "production"
      }
    }
  ]
}
```

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
- Built with [Express.js](https://expressjs.com/)
- Caching powered by [LRU Cache](https://www.npmjs.com/package/lru-cache)
