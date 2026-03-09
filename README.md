# Diagram Creator

A zero-dependency, browser-based tool for creating process flow diagrams with real-time preview and full visual customization.

![Diagram Creator](screenshots/desktop-1280x900.png)

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |
| `npm run cy:open` | Open Cypress test runner |
| `npm run cy:run` | Run Cypress tests headless |
| `npm run test:e2e` | Start server and run E2E tests |

## Architecture

```
src/
├── main.ts                 # App bootstrap
├── types.ts                # Config types, defaults, presets
├── state.ts                # Reactive store (pub-sub)
├── styles/main.css         # UI + responsive styles
├── ui/
│   ├── layout.ts           # App shell + mobile toggle
│   └── controls.ts         # Sidebar control panel
├── renderer/
│   ├── geometry.ts         # Layout computation (vertical/horizontal)
│   ├── svg-renderer.ts     # SVG rendering engine
│   └── feedback-loop.ts    # Feedback loop path drawing
└── export/
    ├── svg-export.ts       # SVG file export
    └── png-export.ts       # PNG rasterization + export
```

**Key patterns:**
- **State management** — Simple pub-sub store with `requestAnimationFrame` batching
- **Rendering** — Pure function: `config → SVG`
- **Geometry** — Layout calculated separately from rendering, supports vertical and horizontal directions
- **Zero runtime dependencies** — Only TypeScript and Vite as dev dependencies

## Features

- **Vertical and horizontal** layout directions
- **Preset configurations** — Quick-switch between styles
- **Real-time preview** — All controls update the diagram instantly
- **Feedback loop** — Configurable loop path with optional label and corner radius
- **Double-border effect** — Adjustable border gap for nested rect styling
- **Full typography control** — Font family, size, weight, color, uppercase
- **Export** — SVG (vector) and PNG (raster at custom resolution)
- **Mobile responsive** — Collapsible sidebar with hamburger toggle

## Export

- **SVG** — Clean vector file, opens in any vector editor
- **PNG** — Rasterized at configurable width/height (default 1920x1080)

## Deploy

```bash
npm run build
# Output in dist/
```

For Vercel:

```bash
npx vercel --prod
```
