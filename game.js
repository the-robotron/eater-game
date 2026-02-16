// Game Canvas and Context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game Variables
let score = 0;
let lives = 3;
let level = 1;
let gameRunning = false;
let gamePaused = false;

// Grid Configuration
const gridSize = 40;
const cols = canvas.width / gridSize;
const rows = canvas.height / gridSize;

// Player Object
const player = {
    x: 1,
    y: 1,
    dx: 0,
    dy: 0,
    size: gridSize - 8,
    speed: 1,
    mouthOpen: 0,
    mouthDirection: 1
};

// Ghost Objects
const ghosts = [
    { x: 18, y: 1, dx: 1, dy: 0, color: '#FF0000' },
    { x: 1, y: 13, dx: 0, dy: 1, color: '#00FFFF' },
    { x: 18, y: 13, dx: -1, dy: 0, color: '#FFB8FF' }
];

// Game Map (0 = empty, 1 = wall, 2 = dot, 3 = power pellet)
const map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1],
    [1,3,1,1,2,1,1,1,2,1,1,2,1,1,1,2,1,1,3,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,2,1,1,1,1,1,1,2,1,2,1,1,2,1],
    [1,2,2,2,2,1,2,2,2,1,1,2,2,2,1,2,2,2,2,1],
    [1,1,1,1,2,1,1,1,0,1,1,0,1,1,1,2,1,1,1,1],
    [1,1,1,1,2,1,0,0,0,0,0,0,0,0,1,2,1,1,1,1],
    [1,1,1,1,2,1,0,1,1,0,0,1,1,0,1,2,1,1,1,1],
    [1,1,1,1,2,0,0,1,0,0,0,0,1,0,0,2,1,1,1,1],
    [1,1,1,1,2,1,0,1,1,1,1,1,1,0,1,2,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,1,1,2,1,1,2,1,1,1,2,1,1,2,1],
    [1,3,2,1,2,2,2,2,2,0,0,2,2,2,2,2,1,2,3,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

let dots = [];
let powerPellets = [];

// Initialize Game
function init() {
    dots = [];
    powerPellets = [];
    
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (map[y][x] === 2) {
                dots.push({x, y});
            } else if (map[y][x] === 3) {
                powerPellets.push({x, y});
            }
        }
    }
    
    updateDisplay();
}

// Draw Functions
function drawMap() {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (map[y][x] === 1) {
                ctx.fillStyle = '#0000FF';
                ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
                ctx.strokeStyle = '#0066FF';
                ctx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);
            }
        }
    }
}

function drawDots() {
    ctx.fillStyle = '#FFD700';
    dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x * gridSize + gridSize/2, dot.y * gridSize + gridSize/2, 3, 0, Math.PI * 2);
        ctx.fill();
    });
    
    ctx.fillStyle = '#FFA500';
    powerPellets.forEach(pellet => {
        ctx.beginPath();
        ctx.arc(pellet.x * gridSize + gridSize/2, pellet.y * gridSize + gridSize/2, 6, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawPlayer() {
    const centerX = player.x * gridSize + gridSize / 2;
    const centerY = player.y * gridSize + gridSize / 2;
    const radius = player.size / 2;
    
    player.mouthOpen += player.mouthDirection * 0.1;
    if (player.mouthOpen > 0.5 || player.mouthOpen < 0) {
        player.mouthDirection *= -1;
    }
    
    let angle = 0;
    if (player.dx > 0) angle = 0;
    else if (player.dx < 0) angle = Math.PI;
    else if (player.dy < 0) angle = -Math.PI / 2;
    else if (player.dy > 0) angle = Math.PI / 2;
    
    ctx.fillStyle = '#FFFF00';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, angle + player.mouthOpen, angle + (2 * Math.PI) - player.mouthOpen);
    ctx.lineTo(centerX, centerY);
    ctx.fill();
}

function drawGhosts() {
    ghosts.forEach(ghost => {
        const x = ghost.x * gridSize + gridSize / 2;
        const y = ghost.y * gridSize + gridSize / 2;
        
        ctx.fillStyle = ghost.color;
        ctx.beginPath();
        ctx.arc(x, y, gridSize / 2 - 4, Math.PI, 0);
        ctx.lineTo(x + gridSize/2 - 4, y + gridSize/2 - 4);
        ctx.lineTo(x + gridSize/3, y);
        ctx.lineTo(x, y + gridSize/2 - 4);
        ctx.lineTo(x - gridSize/3, y);
        ctx.lineTo(x - gridSize/2 + 4, y + gridSize/2 - 4);
        ctx.closePath();
        ctx.fill();
        
        // Eyes
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(x - 8, y - 8, 6, 8);
        ctx.fillRect(x + 2, y - 8, 6, 8);
        ctx.fillStyle = '#000000';
        ctx.fillRect(x - 6, y - 6, 3, 4);
        ctx.fillRect(x + 4, y - 6, 3, 4);
    });
}

// Game Logic
function movePlayer() {
    const newX = player.x + player.dx;
    const newY = player.y + player.dy;
    
    if (newX >= 0 && newX < cols && newY >= 0 && newY < rows && map[newY][newX] !== 1) {
        player.x = newX;
        player.y = newY;
        
        // Check dot collision
        const dotIndex = dots.findIndex(d => d.x === player.x && d.y === player.y);
        if (dotIndex !== -1) {
            dots.splice(dotIndex, 1);
            score += 10;
            updateDisplay();
        }
        
        // Check power pellet collision
        const pelletIndex = powerPellets.findIndex(p => p.x === player.x && p.y === player.y);
        if (pelletIndex !== -1) {
            powerPellets.splice(pelletIndex, 1);
            score += 50;
            updateDisplay();
        }
        
        // Check win condition
        if (dots.length === 0 && powerPellets.length === 0) {
            winLevel();
        }
    }
}

function moveGhosts() {
    ghosts.forEach(ghost => {
        const newX = ghost.x + ghost.dx;
        const newY = ghost.y + ghost.dy;
        
        if (newX >= 0 && newX < cols && newY >= 0 && newY < rows && map[newY][newX] !== 1) {
            ghost.x = newX;
            ghost.y = newY;
        } else {
            // Random direction change
            const directions = [{dx:1,dy:0}, {dx:-1,dy:0}, {dx:0,dy:1}, {dx:0,dy:-1}];
            const dir = directions[Math.floor(Math.random() * directions.length)];
            ghost.dx = dir.dx;
            ghost.dy = dir.dy;
        }
        
        // Check collision with player
        if (ghost.x === player.x && ghost.y === player.y) {
            loseLife();
        }
    });
}

function loseLife() {
    lives--;
    updateDisplay();
    
    if (lives <= 0) {
        gameOver();
    } else {
        resetPositions();
    }
}

function resetPositions() {
    player.x = 1;
    player.y = 1;
    player.dx = 0;
    player.dy = 0;
    
    ghosts[0].x = 18; ghosts[0].y = 1;
    ghosts[1].x = 1; ghosts[1].y = 13;
    ghosts[2].x = 18; ghosts[2].y = 13;
}

function winLevel() {
    level++;
    gameRunning = false;
    alert('Level Complete! Score: ' + score);
    init();
    resetPositions();
}

function gameOver() {
    gameRunning = false;
    alert('Game Over! Final Score: ' + score);
    resetGame();
}

function resetGame() {
    score = 0;
    lives = 3;
    level = 1;
    init();
    resetPositions();
}

function updateDisplay() {
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
    document.getElementById('level').textContent = level;
}

// Game Loop
function gameLoop() {
    if (!gameRunning || gamePaused) return;
    
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawMap();
    drawDots();
    drawPlayer();
    drawGhosts();
    
    movePlayer();
    
    if (Math.random() < 0.3) {
        moveGhosts();
    }
    
    requestAnimationFrame(gameLoop);
}

// Controls
document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    
    switch(e.key) {
        case 'ArrowUp':
            player.dx = 0; player.dy = -1;
            break;
        case 'ArrowDown':
            player.dx = 0; player.dy = 1;
            break;
        case 'ArrowLeft':
            player.dx = -1; player.dy = 0;
            break;
        case 'ArrowRight':
            player.dx = 1; player.dy = 0;
            break;
    }
});

document.getElementById('startBtn').addEventListener('click', () => {
    if (!gameRunning) {
        gameRunning = true;
        gamePaused = false;
        gameLoop();
    }
});

document.getElementById('pauseBtn').addEventListener('click', () => {
    gamePaused = !gamePaused;
    if (!gamePaused && gameRunning) {
        gameLoop();
    }
});

document.getElementById('restartBtn').addEventListener('click', () => {
    gameRunning = false;
    gamePaused = false;
    resetGame();
});

// Initialize on load
window.addEventListener('load', () => {
    init();
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawDots();
    drawPlayer();
    drawGhosts();
});
