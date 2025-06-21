import { INITIAL_FRAMES, PATH_ENGINE_IMAGE, PATH_ENGINE_SPRITES, PATH_SPACESHIP_IMAGE } from "../utils/constants.js"
import Projectile from "./Projectile.js";

class Player {
    constructor(canvasWidth, canvasHeight) {
        this.alive = true; // Indica se o jogador está vivo
        this.width = 48 * 2; 
        this.height = 48 * 2; 
        this.velocity = 6
        this.position = {
            x: canvasWidth / 2 - this.width / 2,
            y: canvasHeight - this.height - 30,
        }
        this.image = this.getImage(PATH_SPACESHIP_IMAGE);
        this.engineImage = this.getImage(PATH_ENGINE_IMAGE)
        this.engineISprites = this.getImage(PATH_ENGINE_SPRITES)

        this.sx = 0 
        this.framesCounter = INITIAL_FRAMES; // Contador de frames para animação
    }

    getImage(path) {
        const image = new Image();
        image.src = path;
        return image;
    }

    moveLeft() {
        this.position.x -= this.velocity;
    }

    moveRight() {
        this.position.x += this.velocity;
    }

    draw(ctx) {
        //DESENHANDO A NAVE
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);

        //DESENHANDO OS TIROS
        ctx.drawImage(
            this.engineISprites, 
            this.sx, 0, 
            48, 48,
            this.position.x,
            this.position.y + 10,
            this.width,
            this.height
        );

        //DESENHANDO O MOTOR DA NAVE
        ctx.drawImage(this.engineImage, this.position.x, this.position.y + 8, this.width, this.height);

        this.update();
    }

    update(){
        if (this.framesCounter === 0){
            this.sx = this.sx === 96 ? 0 : this.sx + 48; // Alterna entre os sprites do motor
            this.framesCounter = INITIAL_FRAMES; // Reseta o contador de frames
        }

        this.framesCounter--;
    }

    shoot(projectiles){
        const p = new Projectile(
            {
                x: this.position.x + this.width / 2 - 1  , // Centraliza o tiro
                y: this.position.y - 10 , // Posição acima da nave
            },
            -10
        )
        projectiles.push(p);
    }

    hit(projectile){
        return (
            projectile.position.x >= this.position.x + 10 && 
            projectile.position.x <= this.position.x + this.width - 15 &&
            projectile.position.y >= this.position.y + 15 &&
            projectile.position.y <= this.position.y + this.height - 10
        )
    }
}

export default Player;