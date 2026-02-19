# TriCoreFS

[Live Demo](https://tri-core-fs.vercel.app)

Visual File System Simulator — an interactive tool for learning how operating systems manage disk storage.

## Overview

TriCoreFS simulates a complete file system with a 512-block virtual disk. It visualizes the internals that are normally hidden by the OS: block allocation, inode management, directory structures, and permissions.

**Use it to understand:**
- How files are stored across disk blocks
- Trade-offs between allocation strategies
- Why renaming is O(1) but copying is O(n)
- How Unix-style permissions work

## Demo

Create files, switch allocation strategies, and watch the disk blocks light up in real-time.

## Installation

```bash
git clone https://github.com/nandu-99/TriCoreFS.git
cd TriCoreFS
npm install
npm run dev
```

## Allocation Strategies

| Strategy | Blocks | Access | Fragmentation |
|----------|--------|--------|---------------|
| Contiguous | Adjacent | O(1) | High |
| Linked | Scattered + pointers | O(n) | None |
| Indexed | Index block + data | O(1) | Index overhead |
| Unix FFS | Direct + indirect ptrs | O(1) | Minimal |

## Architecture

```
src/
├── lib/filesystem.ts      # Core: allocate, free, create, delete
├── types/filesystem.ts    # Inode, Block, Disk interfaces
├── hooks/useFileSystem.ts # React state management
└── components/            # UI: DiskBlockVisual, FileList, Inspector
```

**Key abstractions:**
- `Inode` — metadata (size, permissions, block pointers)
- `Directory` — name → inode mappings
- `Disk` — array of blocks + free bitmap

## Tech

React 18 · TypeScript · Vite · Tailwind · shadcn/ui

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run test` | Run tests |

## Contributing

PRs welcome. Fork → branch → commit → PR.

### License

MIT
