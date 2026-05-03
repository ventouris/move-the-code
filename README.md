# Move the Code

A fun pathfinding game for kids that teaches logic and problem-solving. Queue up movement commands to guide your character to the goal while avoiding obstacles.

Built by the initiative of a 5-year-old kid who wanted to replicate a robot game they did at school!

## How to play

1. **Choose your character** — select from 8 different animals (turtle, unicorn, dog, rabbit, panda, penguin, princess)
2. **Pick a difficulty** — Easy (2-4 moves), Normal (5-8 moves), or Hard (9-12 moves)
3. **Queue commands** — click the arrow buttons to add movement commands (up, down, left, right) to your queue
4. **Watch your animal move** — press Play to execute all commands in sequence
5. **Reach the goal** — get your character to the ⭐ star without hitting obstacles 🪨
6. **Try again** — press Play Again to get a new level or Start Over to keep the same difficulty

The game tracks your path (shown in light blue) and celebrates when you reach the goal!

## Features

- **8 adorable characters** — choose your favorite animal to control
- **3 difficulty levels** — progressively challenging puzzles
- **Procedural level generation** — new random levels every time
- **Visual feedback** — emoji rotation based on movement direction, path visualization
- **Sound effects** — satisfying audio feedback (can be muted)
- **Progressive command limit** — max 20 commands to encourage efficient solving
- **Collision detection** — avoid obstacles or it's game over
- **Privacy-first analytics** — Umami tracking with no personal data collected
- **Mobile friendly** — fully responsive design with touch support

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite 5 |
| Styling | Tailwind CSS |
| State Management | React Hooks |
| Hosting | GitHub Pages |
| CI / CD | GitHub Actions |
| Analytics | Umami |

## Project structure

```
├── src/
│   ├── components/           # React UI components
│   │   ├── GameGrid.tsx      # Main game board
│   │   ├── GridCell.tsx      # Individual grid cells
│   │   ├── ControlPanel.tsx  # Command queue and controls
│   │   ├── CommandPanel.tsx  # Direction buttons
│   │   ├── QueueDisplay.tsx  # Command queue visualization
│   │   ├── GameHeader.tsx    # Title and mute button
│   │   ├── GameFooter.tsx    # Privacy notice
│   │   ├── AvatarSelector.tsx    # Character selection
│   │   ├── DifficultySelector.tsx # Difficulty selection
│   │   ├── ActionButtons.tsx  # Play and reset buttons
│   │   └── CommandButton.tsx  # Individual command buttons
│   ├── hooks/
│   │   ├── useGameLogic.ts   # Core game state and logic
│   │   └── useSound.ts       # Audio playback
│   ├── utils/
│   │   └── index.ts          # Pathfinding, validation, generation
│   ├── constants/
│   │   └── index.ts          # Game constants and sound URLs
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   ├── data.json             # Text labels and emojis
│   ├── App.tsx               # Main application
│   ├── main.tsx              # React entry point
│   └── index.css             # Global styles
│
├── .github/workflows/
│   └── deploy.yml            # GitHub Pages deployment
│
├── index.html                # HTML template
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
└── tsconfig.json             # TypeScript config
```

## Running locally

### Prerequisites

- Node.js 18+ and npm

### Development

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173` (or next available port).

### Build for production

```bash
npm run build
```

Output goes to the `dist/` folder.

## Game logic

### Level generation

Each level is procedurally generated with:
- **Random start position** — one of the four corners
- **Random goal position** — placed at a distance based on difficulty
- **Random obstacles** — placed to create interesting puzzles while ensuring a valid solution exists
- **Path validation** — uses BFS (Breadth-First Search) to guarantee solvable levels

### Difficulty settings

| Difficulty | Min moves | Max moves | Obstacles |
|---|---|---|---|
| Easy | 2 | 4 | 4–7 |
| Normal | 5 | 8 | 8–11 |
| Hard | 9 | 12 | 11–14 |

### Command execution

- Commands execute sequentially with a 500ms delay between each step
- The character rotates to face the direction of movement
- Path is tracked and visualized in light blue
- Game ends immediately if the character hits an obstacle or goes out of bounds

## Customization

### Change character limit

Edit `src/constants/index.ts`:

```typescript
export const MAX_COMMAND_QUEUE = 20; // Change this value
```

### Adjust difficulty settings

Edit `src/constants/index.ts`:

```typescript
export const DIFFICULTY_SETTINGS: Record<Difficulty, { min: number; max: number }> = {
  easy: { min: 2, max: 4 },
  normal: { min: 5, max: 8 },
  hard: { min: 9, max: 12 },
};
```

### Add new animals

1. Add emoji to `src/data.json`:

```json
{
  "animals": {
    "your-animal": "🦋"
  }
}
```

2. Update `src/types/index.ts`:

```typescript
export type Animal = 'turtle' | 'unicorn' | ... | 'your-animal';
```

### Customize game text

Edit `src/data.json` to change titles, buttons, and UI text.

## Deployment (GitHub Pages)

### First-time setup

1. Push the repository to GitHub.
2. Go to **Settings → Pages → Source** and select **GitHub Actions**.
3. The `deploy` workflow runs automatically on every push to `main`.

Your site will be live at `https://{username}.github.io/move-the-code/`.

**Custom domain** — if you configure a custom domain in Pages settings, edit `.github/workflows/deploy.yml` and change:

```yaml
VITE_BASE: /
```

## Privacy

This site uses [Umami](https://umami.is), a privacy-first analytics tool. Only page views are tracked — no personal data is collected.

---

Built with the help of [Claude Code](https://claude.ai/code) by Anthropic.
