// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game constants
const GRID_SIZE = 20;
const TILE_COUNT = canvas.width / GRID_SIZE;

// Speed settings (in milliseconds)
const SPEEDS = {
    slow: 150,
    medium: 100,
    fast: 50
};

// Game state
let snake = [];
let food = {};
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameSpeed = SPEEDS.slow;
let gameLoop = null;
let isPaused = false;
let isGameOver = false;

// DOM elements
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const newGameBtn = document.getElementById('newGame');
const pauseGameBtn = document.getElementById('pauseGame');
const slowSpeedBtn = document.getElementById('slowSpeed');
const mediumSpeedBtn = document.getElementById('mediumSpeed');
const fastSpeedBtn = document.getElementById('fastSpeed');

// Initialize game
function initGame() {
    // Reset snake to center
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];

    // Reset direction
    dx = 1;
    dy = 0;

    // Reset score
    score = 0;
    updateScore();

    // Generate first food
    generateFood();

    // Reset game states
    isPaused = false;
    isGameOver = false;
    pauseGameBtn.textContent = 'Pause';

    // Start game loop
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(update, gameSpeed);
}

// Generate food at random position
function generateFood() {
    let newFood;
    let isOnSnake;

    do {
        isOnSnake = false;
        newFood = {
            x: Math.floor(Math.random() * TILE_COUNT),
            y: Math.floor(Math.random() * TILE_COUNT)
        };

        // Check if food spawned on snake
        for (let segment of snake) {
            if (segment.x === newFood.x && segment.y === newFood.y) {
                isOnSnake = true;
                break;
            }
        }
    } while (isOnSnake);

    food = newFood;
}

// Update game state
function update() {
    if (isPaused || isGameOver) return;

    // Move snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Check wall collision
    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        gameOver();
        return;
    }

    // Check self collision
    for (let segment of snake) {
        if (segment.x === head.x && segment.y === head.y) {
            gameOver();
            return;
        }
    }

    // Add new head
    snake.unshift(head);

    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        updateScore();
        generateFood();
    } else {
        // Remove tail if no food eaten
        snake.pop();
    }

    // Draw everything
    draw();
}

// Draw game
function draw() {
    // Clear canvas
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= TILE_COUNT; i++) {
        ctx.beginPath();
        ctx.moveTo(i * GRID_SIZE, 0);
        ctx.lineTo(i * GRID_SIZE, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * GRID_SIZE);
        ctx.lineTo(canvas.width, i * GRID_SIZE);
        ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, index) => {
        if (index === 0) {
            // Head
            ctx.fillStyle = '#2ecc71';
        } else {
            // Body
            ctx.fillStyle = '#27ae60';
        }

        ctx.fillRect(
            segment.x * GRID_SIZE + 1,
            segment.y * GRID_SIZE + 1,
            GRID_SIZE - 2,
            GRID_SIZE - 2
        );

        // Add shine effect to head
        if (index === 0) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fillRect(
                segment.x * GRID_SIZE + 3,
                segment.y * GRID_SIZE + 3,
                GRID_SIZE / 2,
                GRID_SIZE / 2
            );
        }
    });

    // Draw food
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(
        food.x * GRID_SIZE + GRID_SIZE / 2,
        food.y * GRID_SIZE + GRID_SIZE / 2,
        GRID_SIZE / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Add shine to food
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(
        food.x * GRID_SIZE + GRID_SIZE / 2 - 2,
        food.y * GRID_SIZE + GRID_SIZE / 2 - 2,
        GRID_SIZE / 4,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Draw game over message
    if (isGameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2 - 20);

        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2 + 20);
        ctx.fillText('Press "New Game" to play again', canvas.width / 2, canvas.height / 2 + 50);
    }

    // Draw pause message
    if (isPaused && !isGameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
    }
}

// Update score display
function updateScore() {
    scoreElement.textContent = score;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
    }

    highScoreElement.textContent = highScore;
}

// Game over
function gameOver() {
    isGameOver = true;
    clearInterval(gameLoop);
    draw();
}

// Toggle pause
function togglePause() {
    if (isGameOver) return;

    isPaused = !isPaused;
    pauseGameBtn.textContent = isPaused ? 'Resume' : 'Pause';

    if (!isPaused) {
        draw();
    } else {
        draw();
    }
}

// Change game speed
function changeSpeed(speed, button) {
    gameSpeed = SPEEDS[speed];

    // Update active button
    document.querySelectorAll('.speed-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    if (button) {
        button.classList.add('active');
    }

    // Restart game loop with new speed
    if (gameLoop && !isGameOver) {
        clearInterval(gameLoop);
        gameLoop = setInterval(update, gameSpeed);
    }
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    // Prevent default arrow key behavior
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }

    // Change direction (prevent 180-degree turns)
    switch (e.key) {
        case 'ArrowUp':
            if (dy === 0) {
                dx = 0;
                dy = -1;
            }
            break;
        case 'ArrowDown':
            if (dy === 0) {
                dx = 0;
                dy = 1;
            }
            break;
        case 'ArrowLeft':
            if (dx === 0) {
                dx = -1;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx === 0) {
                dx = 1;
                dy = 0;
            }
            break;
        case ' ':
            e.preventDefault();
            togglePause();
            break;
    }
});

// Button event listeners
newGameBtn.addEventListener('click', initGame);
pauseGameBtn.addEventListener('click', togglePause);

slowSpeedBtn.addEventListener('click', () => {
    changeSpeed('slow', slowSpeedBtn);
});

mediumSpeedBtn.addEventListener('click', () => {
    changeSpeed('medium', mediumSpeedBtn);
});

fastSpeedBtn.addEventListener('click', () => {
    changeSpeed('fast', fastSpeedBtn);
});

// Initialize high score display
highScoreElement.textContent = highScore;

// Start game on load
initGame();
