import { INITIAL_FRAMES, PATH_ENGINE_IMAGE, PATH_ENGINE_SPRITES, PATH_INVADER_IMAGE, PATH_SPACESHIP_IMAGE } from "../utils/constants.js"
import Projectile from "./Projectile.js";

class Invader {
    constructor(position, velocity) {
        this.width = 50 * 0.8; // Largura do invasor
        this.height = 37 * 0.8; // Altura do invasor
        this.velocity = velocity || 1
        this.position = position
        this.image = this.getImage(PATH_INVADER_IMAGE);
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

    moveDown(){
        this.position.y += this.height; // Move para baixo uma altura do invasor
    }

    incrementVelocity(boost) {
        this.velocity += boost // Aumenta a velocidade do invasor
    }

    draw(ctx) {
        // Desenha o invasor
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        
    }

    shoot(projectiles){
        const p = new Projectile(
            {
                x: this.position.x + this.width / 2 - 1  , // Centraliza o tiro
                y: this.position.y + this.height , // Posição acima da nave
            },
            10
        )
        projectiles.push(p);
    }

    hit(projectile){
        return (
            projectile.position.x >= this.position.x && 
            projectile.position.x <= this.position.x + this.width &&
            projectile.position.y >= this.position.y &&
            projectile.position.y <= this.position.y + this.height
        )
    }
}

export default Invader;