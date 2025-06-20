import Player from "./classes/Player.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const player = new Player(canvas.width, canvas.height);

const keys = {
    left: false,
    right: false,
}

const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (keys.left && player.position.x >= 0) {
        player.moveLeft()
    }
    if (keys.right && player.position.x <= canvas.width - player.width) {
        player.moveRight()
    }

    player.draw(ctx);

    requestAnimationFrame(gameLoop);
}

addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    
    if (key === "a" || key === "ArrowLeft") keys.left = true;
        
    if (key === "d" || key === "ArrowRight") keys.right = true;
    
    
}) 

addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();
    
    if (key === "a" || key === "ArrowLeft") keys.left = false;
    
    if (key === "d" || key === "ArrowRight") keys.right = false;
    
    
}) 

gameLoop();