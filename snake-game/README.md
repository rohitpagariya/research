# Snake Game

A classic Snake game built with vanilla HTML, CSS, and JavaScript. No frameworks or libraries required!

## Features

- **Classic Gameplay**: Control the snake with arrow keys, eat food, and grow longer
- **Speed Controls**: Choose between three difficulty levels
  - Slow (150ms)
  - Medium (100ms)
  - Fast (50ms)
- **Pause/Resume**: Pause the game anytime with the Pause button or Spacebar
- **New Game**: Start fresh whenever you want
- **Score Tracking**: Current score and high score (saved in browser localStorage)
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Animations**: Visual effects and polished UI

## How to Play

1. Open `index.html` in your web browser
2. Use the **Arrow Keys** to control the snake:
   - ⬆️ Up Arrow - Move up
   - ⬇️ Down Arrow - Move down
   - ⬅️ Left Arrow - Move left
   - ➡️ Right Arrow - Move right
3. Eat the red food to grow and score points
4. Avoid hitting the walls or yourself
5. Press **Spacebar** to pause/resume

## Controls

- **New Game**: Click to restart the game
- **Pause**: Click or press Spacebar to pause/resume
- **Speed Buttons**: Change difficulty on the fly
  - Slow - Relaxed pace for beginners
  - Medium - Default balanced speed
  - Fast - Challenge for experienced players

## Scoring

- Each food eaten: **+10 points**
- High score is automatically saved in your browser

## Technical Details

### Files

- `index.html` - Game structure and layout
- `style.css` - Styling and responsive design
- `game.js` - Game logic and mechanics

### Technologies

- Pure HTML5 Canvas for rendering
- Vanilla JavaScript (ES6+)
- CSS3 with flexbox and animations
- LocalStorage API for high score persistence

### Game Mechanics

- Grid-based movement (20x20 tiles)
- Collision detection for walls, self, and food
- Random food generation (avoids spawning on snake)
- Prevents 180-degree turns
- Real-time speed adjustment

## Browser Compatibility

Works on all modern browsers that support:
- HTML5 Canvas
- ES6 JavaScript
- LocalStorage API

Tested on Chrome, Firefox, Safari, and Edge.

## License

This project is open source and available for use and modification.
