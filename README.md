# eater-game
A classic Pac-Man inspired arcade game built with HTML5 Canvas and JavaScript

## Overview

Eater Game is a classic Pac-Man inspired arcade game featuring:
- Responsive HTML5 Canvas graphics
- Smooth JavaScript animations
- Multiple ghost enemies with AI movement
- Score tracking and level progression
- Lives system
- Collectible dots and power pellets

## Features

- **Classic Gameplay**: Navigate through a maze collecting all dots while avoiding ghosts
- **Multiple Enemies**: Three different colored ghosts with independent movement patterns
- **Animated Character**: Pac-Man style character with mouth animation
- **Scoring System**: Earn 10 points per dot and 50 points per power pellet
- **Level System**: Progress through increasingly challenging levels
- **Lives System**: Start with 3 lives - avoid ghost collisions!
- **Responsive Controls**: Use arrow keys for smooth directional movement
- **Modern UI**: Beautiful gradient backgrounds and styled interface
- **Game Controls**: Start, Pause, and Restart buttons for full game control

## How to Play

### Installation

1. Clone this repository:
```bash
git clone https://github.com/the-robotron/eater-game.git
cd eater-game
```

2. Open `index.html` in your web browser:
```bash
# For Windows
start index.html

# For Mac
open index.html

# For Linux
xdg-open index.html
```

Or simply double-click the `index.html` file to open it in your default browser.

### Game Controls

- **Arrow Up**: Move up
- **Arrow Down**: Move down
- **Arrow Left**: Move left
- **Arrow Right**: Move right
- **Start Game Button**: Begin playing
- **Pause Button**: Pause/Resume the game
- **Restart Button**: Reset the game to initial state

### Objective

- Collect all yellow dots and orange power pellets in the maze
- Avoid the colorful ghosts (Red, Cyan, and Pink)
- Complete the level by collecting all items
- Survive with your three lives to maximize your score

## Game Mechanics

### Scoring
- Small dot: **10 points**
- Power pellet: **50 points**

### Lives
- Start with **3 lives**
- Lose a life when colliding with a ghost
- Game over when all lives are lost

### Ghosts
- **Red Ghost**: Patrols the top area
- **Cyan Ghost**: Moves through the middle section
- **Pink Ghost**: Guards the bottom area
- Ghosts move randomly but intelligently through the maze

## Technical Details

### Technologies Used

- **HTML5**: Structure and Canvas element
- **CSS3**: Modern styling with gradients, flexbox, and animations
- **JavaScript (ES6+)**: Game logic, collision detection, and rendering
- **Canvas API**: 2D graphics rendering

### Project Structure

```
eater-game/
├── index.html      # Main HTML file with game structure
├── style.css       # Comprehensive styling and responsive design
├── game.js         # Complete game logic and mechanics
└── README.md       # Project documentation
```

### Game Architecture

- **Grid-based Movement**: 20x15 grid system (40px per cell)
- **Collision Detection**: Real-time position checking for player-ghost and player-collectible interactions
- **Game Loop**: RequestAnimationFrame for smooth 60 FPS rendering
- **State Management**: Game state tracking (running, paused, game over)
- **Map System**: 2D array-based maze layout

## Features Breakdown

### Player Character
- Animated Pac-Man style mouth opening/closing
- Directional orientation based on movement
- Yellow color with smooth rendering

### Ghost AI
- Independent movement for each ghost
- Random direction changes at walls
- Collision detection with player
- Distinct colors for visual identification

### Maze Design
- Blue walls with outlined borders
- Strategic pathways and corridors
- Central ghost house area
- Balanced dot distribution

## Browser Compatibility

- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## Responsive Design

 The game adapts to different screen sizes:
- Desktop: Full 800x600px canvas
- Tablet/Mobile: Responsive scaling with adjusted controls

## Future Enhancements

- [ ] Add power-up mode (eat ghosts temporarily)
- [ ] Implement ghost AI pathfinding
- [ ] Add sound effects and background music
- [ ] Create multiple maze layouts
- [ ] Add high score persistence (localStorage)
- [ ] Implement bonus fruits
- [ ] Add touch controls for mobile devices
- [ ] Create difficulty levels
- [ ] Add ghost personalities (Blinky, Pinky, Inky, Clyde)

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## License

This project is open source and available for educational purposes.

## Credits

Inspired by the classic Pac-Man arcade game. Built with modern web technologies as a learning project.

## Contact

For questions or suggestions, please open an issue on GitHub.

---

Enjoy playing Eater Game! 👾🎮
