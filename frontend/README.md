# Vibe Dashboard Frontend

A modern, responsive dashboard frontend built with Next.js 14 and Tailwind CSS. Features a glassmorphism design with smooth animations and real-time search functionality.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 3.4
- **Language**: TypeScript 5.3
- **Build Tool**: Next.js built-in bundler

## Features

- 🎨 Glassmorphism UI design with blur effects
- 🔍 Real-time search with debouncing
- ⚡ Fast and responsive
- 📱 Mobile-first responsive design (320px+)
- ✨ Smooth animations and transitions
- 🎯 Loading & empty states
- 🧩 Modular component architecture

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout (metadata, providers)
│   ├── page.tsx            # Main dashboard page
│   ├── globals.css         # Global styles & custom animations
│   └── favicon.ico
├── components/
│   ├── SearchBar.tsx       # Search input with glassmorphism
│   └── ItemCard.tsx        # Item card component
├── services/
│   └── api.ts              # API client & TypeScript interfaces
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Components

### SearchBar
- Interactive search input with icons
- Clear button when query exists
- Glass-morphism styling
- Accepts search handler callback

**Props:**
```typescript
interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading?: boolean
}
```

### ItemCard
- Displays individual item details
- Shows category, name, description
- Displays creation date and ID
- Hover effects and transitions

**Props:**
```typescript
interface ItemCardProps {
  item: Item
}
```

## Services

### API Service (`services/api.ts`)

```typescript
fetchItems(search?: string): Promise<Item[]>
```

Fetches items from the backend with optional search filtering.

**Interfaces:**
```typescript
interface Item {
  id: number
  name: string
  description: string
  category: string
  createdAt: string
}
```

## Styling

### Tailwind Configuration

- Custom glass-morphism utilities
- Backdrop blur effects
- Responsive grid layouts
- Dark mode friendly color scheme

### Custom Animations

- `animate-fade-in`: Smooth fade and slide in
- `animate-spin-slow`: Slow spinner for loading

### Color Scheme

- **Background**: Gradient slate (900 → 800 → 900)
- **Primary Text**: Slate-100
- **Accent**: Cyan-300 / Blue-400
- **Glass**: White with 10-20% opacity + 10px blur

## Responsive Design

- **Mobile**: Single column (320px+)
- **Tablet**: 2 columns (md: 768px+)
- **Desktop**: 3 columns (lg: 1024px+)

## Environment Variables

Create a `.env.local` file (optional):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

The frontend defaults to `http://localhost:5000` for the API.

## Performance Optimizations

- Debounced search (300ms) to reduce API calls
- Next.js automatic code splitting
- CSS-in-JS optimization with Tailwind
- Static site generation where possible

## TypeScript

Fully typed with strict mode disabled for flexibility. Enable with:

```json
// tsconfig.json
"strict": true
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS 12+, Android 5+)

## Troubleshooting

### "Failed to fetch items" error
- Ensure backend is running on `http://localhost:5000`
- Check CORS is enabled in the backend
- Use browser DevTools to check network tab

### Styling not applying
- Clear `.next` folder: `rm -rf .next`
- Restart dev server
- Check Tailwind content paths in `tailwind.config.js`

### Build fails
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node -v` (should be 18+)
- Review build error messages

## Development Tips

- Use React DevTools browser extension for debugging
- Check [Next.js docs](https://nextjs.org/docs) for features
- Tailwind CSS IntelliSense extension for VS Code
- Use `npm run build` to test production build locally

## Future Enhancements

- Pagination support
- Sorting functionality
- Item detail page with routing
- Favorites/wishlist feature
- Dark/light theme toggle
- PWA capabilities
- Deployment to Vercel

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## License

Open source - feel free to use and modify