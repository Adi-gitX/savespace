# savespace


[Live Demo](https://savespacex.vercel.app)

savespace is an educational web app for understanding file systems through interactive simulation.  
It combines a modern landing experience with a full visualization workspace and a Finder-style interface.

## What You Get

- A visual file system simulator with disk block mapping
- Multiple allocation strategies with live behavior differences
- File/directory operations backed by simulated inode + block metadata
- Fragmentation visibility and disk usage insights
- Finder-style UX for interacting with simulated files

## Route Map

| Route | Purpose |
|---|---|
| `/` | Product landing page |
| `/visualization` | Main simulator workspace |
| `/finder` | Finder-style file browser interface |
| `/theory` | Concept explanation page |
| `/roadmap` | Learning path / roadmap page |

## Simulator Concepts

The visualization module models:

- `Inode`: file metadata and block pointers
- `Directory`: name → inode mapping
- `Disk`: block array + free bitmap
- Allocation strategy behavior and trade-offs

### Supported Allocation Strategies

| Strategy | How it stores blocks | Access pattern | Fragmentation profile |
|---|---|---|---|
| Contiguous | Adjacent blocks | Fast sequential/random | External fragmentation risk |
| Linked | Chained scattered blocks | Sequential-friendly | No external fragmentation |
| Indexed | Index block + data blocks | Fast direct access | Index overhead |
| Unix-style | Direct + indirect pointers | Scales to larger files | Balanced practical approach |

## Project Structure

```txt
src/
  App.tsx                        # Route setup
  pages/
    LandingPage.tsx
    Index.tsx                    # /visualization page
    FinderInterface.tsx
    Theory.tsx
    Roadmap.tsx
  hooks/
    useFileSystem.ts             # Simulator state/actions
  lib/
    filesystem.ts                # Core FS simulation logic
  types/
    filesystem.ts                # FS data model/types
  components/
    landing/                     # Landing page sections
    FileList.tsx
    FileInspector.tsx
    DiskBlockVisual.tsx
    DirectoryTree.tsx
    ...                          # Other simulator UI parts
```

## Local Development

### Prerequisites

- Node.js 18+ (recommended)
- npm 9+

### Setup

```bash
git clone <your-repo-url>
cd TriCoreFS
npm install
npm run dev
```

Open the app at `http://localhost:5173`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks |
| `npm run test` | Run Vitest once |
| `npm run test:watch` | Run Vitest in watch mode |

## Notes for Contributors

- Visualization state persists to `localStorage` (key: `visual-fs-state`).
- If behavior looks stale during local testing, clear browser local storage and reload.
- Keep route contracts stable (`/visualization`, `/finder`, `/theory`, `/roadmap`) unless intentionally migrating links.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI / shadcn-style components
- Framer Motion
- Vitest

## License

MIT
