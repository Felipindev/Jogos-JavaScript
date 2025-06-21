import Grid from "./classes/Grid.js";
import Invader from "./classes/Invader.js";
import Player from "./classes/Player.js";
import Projectile from "./classes/Projectile.js";
import Particle from "./classes/Particle.js";
import Obstacle from "./classes/Obstacle.js";
import { GameState } from "./utils/constants.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

ctx.imageSmoothingEnabled = false;

let currentState = GameState.PLAYING

const player = new Player(canvas.width, canvas.height);
const playerProjectiles = [];
const invadersProjectiles = [];
const particles = [];
const obstacles = [];

const initObstacles = () => {
    const x = canvas.width / 2 - 100;
    const y = canvas.height - 250;
    const color = "rgba(255, 255, 255, 0.2)";
    const offSet = canvas.width * 0.15

    const obstacle1 = new Obstacle({ x: x - offSet, y }, 150, 20, color);
    const obstacle2 = new Obstacle({ x: x + offSet, y }, 150, 20, "orange");

    obstacles.push(obstacle1, obstacle2 );
}

initObstacles();

const grid = new Grid(3, 5)

const keys = {
    left: false,
    right: false,
    shoot: {
        pressed: false, 
        released: true,
    },
}

const drawObstacles = () => {
    obstacles.forEach((obstacle) => {
        obstacle.draw(ctx);
    })
}

const drawProjectiles = () => {
    const projectiles = [...playerProjectiles, ...invadersProjectiles];

    projectiles.forEach((projectile) => {
        projectile.draw(ctx);
        projectile.update();
        
    });
}

const drawParticles = () => {
    particles.forEach((particle) => {
        particle.draw(ctx);
        particle.update();
    })
}

const clearParticle = () => {
    particles.forEach((particle, i) => {
        if (particle.opacity <= 0) {
            particles.splice(i, 1);
        }
    })
}
const clearProjectiles = () => {
    playerProjectiles.forEach((projectile, index) => {
        if (projectile.position.y <= 0) {
            playerProjectiles.splice(index, 1);
        }
    })
}

const createExplosion = (position, size, color) => {
    for (let i = 0; i < size; i++) {
        const particle = new Particle({
            x: position.x,
            y: position.y
        }, {
            x: Math.random() -0.5, // Velocidade aleatória no eixo x
            y: Math.random() -0.5, // Velocidade aleatória no eixo x  
        },
        Math.random() * 5 + 1, // Raio aleatório entre 1 e 6

        color || "crimson" // Cor padrão branca
    )
        particles.push(particle);
    }
}

const checkShootInvaders = () => {
    grid.invaders.forEach((invader, invaderIndex) => {
        playerProjectiles.some((projectile, projectileIndex) => {
            if (invader.hit(projectile)) {
                createExplosion(
                    {
                        x: invader.position.x + invader.width / 2,
                        y: invader.position.y + invader.height / 2
                    },
                    10,
                    "#941cff"
                );

                grid.invaders.splice(invaderIndex, 1);
                playerProjectiles.splice(projectileIndex, 1); 
            }
        })
    })
}

const checkShootPlayer = () => {
    invadersProjectiles.some((projectile, i) => {
        if (player.hit(projectile)) {
            invadersProjectiles.splice(i, 1);
            gameOver()
        }
    })
}

const checkShootObstacles = () => {
    obstacles.forEach((obstacle) => {
        playerProjectiles.some((projectile, i) => {
        if (obstacle.hit(projectile)) {
            playerProjectiles.splice(i, 1);
        }
    })
        invadersProjectiles.some((projectile, i) => {
        if (obstacle.hit(projectile)) {
            invadersProjectiles.splice(i, 1);
        }
    })
    })
}

const spawnGrid = () => {
    if (grid.invaders.length === 0) {
       grid.rows = Math.round(Math.random() * 9) + 2; // Entre 3 e 5 linhas
       grid.cols = Math.round(Math.random() * 7) + 3; // Entre 3 e 7 colunas
       grid.restart()
    }
}


const gameOver = () => {
    createExplosion(
                {
                    x: player.position.x + player.width / 2,
                    y: player.position.y + player.height / 2
                },
                20,
                "#ff0000"
            );
            createExplosion(
                {
                    x: player.position.x + player.width / 2,
                    y: player.position.y + player.height / 2
                },
                15,
                "#F1F1F1"
            );
            createExplosion(
                {
                    x: player.position.x + player.width / 2,
                    y: player.position.y + player.height / 2
                },
                18,
                "#4D9BE6"
            );
    currentState = GameState.GAME_OVER;
    player.alive = false;
}

const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentState === GameState.PLAYING){
        spawnGrid();
        
        drawProjectiles();
        drawParticles();
        drawObstacles();

        clearProjectiles();
        clearParticle();

        checkShootInvaders();
        checkShootPlayer();
        checkShootObstacles();

        grid.draw(ctx);
        grid.update(player.alive);

        ctx.save();

        ctx.translate(player.position.x + player.width / 2, player.position.y + player.height / 2);

        if (keys.shoot.pressed && keys.shoot.released) {
            player.shoot(playerProjectiles);
            keys.shoot.released = false;
            
        }

        if (keys.left && player.position.x >= 0) {
            player.moveLeft()
            ctx.rotate(-0.15)
        }
        if (keys.right && player.position.x <= canvas.width - player.width) {
            player.moveRight()
            ctx.rotate(0.15)
        }

        ctx.translate(- player.position.x - player.width / 2, - player.position.y - player.height / 2);

        player.draw(ctx);

        ctx.restore();

        requestAnimationFrame(gameLoop);
    }

    if (currentState === GameState.GAME_OVER) {
        checkShootObstacles();
        
        drawParticles();
        drawProjectiles();
        drawObstacles();

        clearProjectiles();
        clearParticle();

        grid.draw(ctx);
        grid.update(player.alive);
    }

    
}

addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    
    if (key === "a" || key === "ArrowLeft") keys.left = true;
        
    if (key === "d" || key === "ArrowRight") keys.right = true;

    if (key === "enter") keys.shoot.pressed = true;
    
    
}) 

addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();
    
    if (key === "a" || key === "ArrowLeft") keys.left = false;
    
    if (key === "d" || key === "ArrowRight") keys.right = false;
    
    if (key === "enter") {
        keys.shoot.pressed = false;
        keys.shoot.released = true;
    }
}) 
// Adicione este trecho para disparar com o mouse:
addEventListener("mousedown", (event) => {
    if (event.button === 0) { // 0 é o botão esquerdo do mouse
        keys.shoot.pressed = true;
    }
});

addEventListener("mouseup", (event) => {
    if (event.button === 0) {
        keys.shoot.pressed = false;
        keys.shoot.released = true;
    }
});

setInterval(() => {
    const invader = grid.getRandomInvader()

    if (invader) {
        invader.shoot(invadersProjectiles);
    }
}, 1000 ); 

gameLoop();