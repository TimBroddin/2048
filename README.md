# 2048 - Modern Next.js Edition

A modern implementation of the classic 2048 game built with Next.js, TypeScript, React, and Tailwind CSS.

This is a complete modernization of the original vanilla JavaScript implementation, featuring:
- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **React** with modern hooks
- **Tailwind CSS** for styling
- **localStorage** for game persistence
- **Touch and keyboard controls**
- **Responsive design**

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to play the game.

### Build

```bash
# Create production build
npm run build

# Run production server
npm start
```

## Original Credits

A small clone of [1024](https://play.google.com/store/apps/details?id=com.veewo.a1024), based on [Saming's 2048](http://saming.fr/p/2048/) (also a clone).

Made just for fun. Original game: [Play it here!](http://gabrielecirulli.github.io/2048/)

The official app can also be found on the [Play Store](https://play.google.com/store/apps/details?id=com.gabrielecirulli.app2048) and [App Store!](https://itunes.apple.com/us/app/2048-by-gabriele-cirulli/id868076805)

### Contributions

 - [TimPetricola](https://github.com/TimPetricola) added best score storage
 - [chrisprice](https://github.com/chrisprice) added custom code for swipe handling on mobile
 - [elektryk](https://github.com/elektryk) made swipes work on Windows Phone
 - [mgarciaisaia](https://github.com/mgarciaisaia) added support for Android 2.3

Many thanks to [rayhaanj](https://github.com/rayhaanj), [Mechazawa](https://github.com/Mechazawa), [grant](https://github.com/grant), [remram44](https://github.com/remram44) and [ghoullier](https://github.com/ghoullier) for the many other good contributions.

## Tech Stack

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **React 18** - UI library with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **CSS Animations** - Smooth tile movements and transitions

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── game.tsx        # Main game component
│   ├── grid.tsx        # Grid component
│   ├── tile.tsx        # Tile component
│   ├── game-header.tsx # Header with scores
│   └── game-message.tsx # Win/lose messages
├── lib/                # Core game logic
│   ├── game-manager.ts # Game state management
│   ├── grid.ts         # Grid logic
│   ├── tile.ts         # Tile logic
│   ├── types.ts        # TypeScript types
│   ├── use-game.ts     # Game hook
│   └── use-local-storage.ts # Storage hook
└── public/             # Static assets
```

## How to Play

Use your **arrow keys** to move the tiles. When two tiles with the same number touch, they **merge into one!**

The goal is to create a tile with the number **2048**.

## Contributing
Changes and improvements are more than welcome! Feel free to fork and open a pull request. Please make your changes in a specific branch and request to pull into `master`! If you can, please make sure the game fully works before sending the PR, as that will help speed up the process.

You can find the same information in the [contributing guide.](https://github.com/gabrielecirulli/2048/blob/master/CONTRIBUTING.md)

## License
2048 is licensed under the [MIT license.](https://github.com/gabrielecirulli/2048/blob/master/LICENSE.txt)

## Donations
I made this in my spare time, and it's hosted on GitHub (which means I don't have any hosting costs), but if you enjoyed the game and feel like buying me coffee, you can donate at my BTC address: `1Ec6onfsQmoP9kkL3zkpB6c5sA4PVcXU2i`. Thank you very much!
