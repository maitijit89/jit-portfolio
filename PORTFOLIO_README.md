# Jit Maiti - Full-Stack Developer Portfolio

A cutting-edge, 3D-animated personal portfolio website built with React, Three.js, and Framer Motion. Features glassmorphism design, interactive 3D elements, and smooth animations.

## Design System: Liquid Glass Futurism

This portfolio implements a modern glassmorphism aesthetic with:
- **Frosted glass panels** with 15-20% opacity and backdrop blur effects
- **Indigo-to-purple gradient** primary palette with vibrant cyan accents
- **Asymmetric layout** with 3D canvas as focal point
- **Smooth animations** with staggered reveals and responsive interactions
- **Mobile-first responsive design** optimized for all devices

## Tech Stack

- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **3D Graphics:** Three.js + React Three Fiber
- **Animations:** Framer Motion
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **API Integration:** GitHub REST API

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── Canvas3D.tsx           # 3D scene with floating geometry
│   │   ├── TypingEffect.tsx       # Dynamic text animation
│   │   ├── GlassmorphicCard.tsx   # Reusable glassmorphic component
│   │   ├── Navigation.tsx         # Sticky header with smooth scroll
│   │   ├── Hero.tsx               # Hero section with 3D canvas
│   │   ├── About.tsx              # About section with features
│   │   ├── Skills.tsx             # Skills grid with categories
│   │   ├── Projects.tsx           # GitHub projects + featured work
│   │   └── Contact.tsx            # Contact form + social links
│   ├── hooks/
│   │   └── useScrollAnimation.ts  # Scroll-triggered animations
│   ├── lib/
│   │   └── performance.ts         # Performance optimization utilities
│   ├── pages/
│   │   ├── Home.tsx               # Main portfolio page
│   │   └── NotFound.tsx           # 404 page
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # React entry point
│   └── index.css                  # Global styles + design tokens
├── index.html                     # HTML template
└── public/                        # Static assets

server/
└── index.ts                       # Express server (production)
```

## Features

### Hero Section
- **3D Canvas:** Interactive floating geometric shapes (icosahedron, torus, sphere)
- **Typing Effect:** Dynamic character-by-character text reveal
- **Call-to-Action:** Primary and secondary buttons with hover effects
- **Scroll Indicator:** Animated scroll prompt

### About Section
- Dual expertise showcase (Backend & Frontend)
- Feature cards with icons
- Statistics display

### Skills Section
- **Categorized Tech Stack:**
  - Frontend & Mobile (React Native, Next.js, Flutter, TypeScript, Tailwind CSS)
  - Backend (Node.js, Express)
  - Databases (MongoDB, PostgreSQL, Redis)
  - Cloud & DevOps (AWS, Google Cloud, Docker, Kubernetes, CI/CD, Git)

### Projects Section
- **GitHub Integration:** Fetches repositories from GitHub API
- **Featured Projects:** Custom descriptions for flagship work
- **Project Cards:** Display stars, forks, languages, and topics
- **External Links:** Direct access to GitHub repositories

### Contact Section
- **Contact Form:** Name, email, message with validation
- **Social Links:** GitHub, Email, LinkedIn, Twitter
- **Availability Status:** Shows current availability

### Navigation
- **Sticky Header:** Fixed navigation with glassmorphic design
- **Smooth Scrolling:** Scroll to sections with smooth animation
- **Mobile Menu:** Hamburger menu for mobile devices
- **Logo:** Gradient text "JM" branding

## Performance Optimizations

1. **Lazy Loading:** 3D canvas loads only when visible
2. **Code Splitting:** Separate chunks for 3D components
3. **Animation Optimization:** Respects `prefers-reduced-motion`
4. **Intersection Observer:** Scroll animations trigger on viewport entry
5. **Throttling/Debouncing:** Optimized scroll and resize handlers

## Development

### Install Dependencies
```bash
pnpm install
```

### Start Development Server
```bash
pnpm dev
```

The site will be available at `http://localhost:3000`

### Build for Production
```bash
pnpm build
```

### Preview Production Build
```bash
pnpm preview
```

## Customization

### Update Personal Information

**Hero Section** (`client/src/components/Hero.tsx`):
- Change name and tagline
- Update CTA button text and links
- Modify social media links

**About Section** (`client/src/components/About.tsx`):
- Update feature descriptions
- Modify statistics

**Skills Section** (`client/src/components/Skills.tsx`):
- Add/remove technologies
- Reorganize skill categories
- Update category colors

**Projects Section** (`client/src/components/Projects.tsx`):
- Update featured projects
- Modify GitHub username (currently: `jitmaiti89`)
- Change project descriptions

**Contact Section** (`client/src/components/Contact.tsx`):
- Update email address
- Modify social media links
- Customize form handling

### Customize Design

**Colors** (`client/src/index.css`):
- Primary: `oklch(0.45 0.18 280)` (Indigo-Purple)
- Accent: `oklch(0.65 0.22 200)` (Cyan)
- Modify OKLCH values to change palette

**Typography** (`client/src/index.css`):
- Display Font: Clash Display (from Google Fonts)
- Body Font: Inter (from Google Fonts)
- Adjust font weights and sizes in theme

**Animations** (`client/src/index.css`):
- Modify keyframe animations
- Adjust animation durations
- Update easing functions

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Color contrast compliance
- Respects `prefers-reduced-motion`

## Deployment

### Deploy to Manus
The portfolio is ready to deploy directly through the Manus platform with built-in hosting and custom domain support.

### Deploy to Vercel
```bash
vercel deploy
```

### Deploy to Netlify
```bash
netlify deploy --prod --dir=dist/public
```

### Deploy to Other Platforms
1. Build the project: `pnpm build`
2. Deploy the `dist/public` directory
3. Configure server to serve `index.html` for all routes (SPA)

## GitHub API Integration

The Projects section fetches repositories from GitHub using the public REST API:

```
https://api.github.com/users/jitmaiti89/repos
```

To change the GitHub username:
1. Open `client/src/components/Projects.tsx`
2. Update the username in the API URL
3. Rebuild and redeploy

## Performance Metrics

- **Lighthouse Score:** 90+
- **First Contentful Paint:** < 2s
- **Largest Contentful Paint:** < 3s
- **Cumulative Layout Shift:** < 0.1

## Future Enhancements

- Dark mode toggle
- Blog section with Markdown support
- Testimonials carousel
- Newsletter subscription
- Analytics dashboard
- Multi-language support
- Progressive Web App (PWA)

## License

MIT License - Feel free to use this portfolio as a template for your own.

## Support

For issues or questions, please refer to the component documentation in each file's header comments.

---

Built with ❤️ using React, Three.js, and Framer Motion
