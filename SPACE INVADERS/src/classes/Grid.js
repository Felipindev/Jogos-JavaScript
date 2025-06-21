import Invader from "./Invader.js";

class Grid {
    constructor(rows, cols){
        this.rows = rows; // Número de linhas
        this.cols = cols; // Número de colunas
        this.invaders = this.init(); // Array para armazenar os invasores
        this.invadersVelocity = 1; // Velocidade dos invasores
        this.direction = "right"; // Direção inicial dos invasores
        this.moveDown = false
    }

    init(){
        const array = []

        for (let row = 0; row < this.rows; row++){
            for (let col = 0; col < this.cols; col++){
                const invader = new Invader({
                    x: col * 50 + 20, // Largura do invasor // + 20 para espaçamento
                    y: row * 37 + 20, // Altura do invasor // + 20 para espaçamento
                }, this.invadersVelocity);
                array.push(invader);
            }
        }
        return array;
    }

    draw(ctx){
        this.invaders.forEach((invader) => {
            invader.draw(ctx);
        });
    }

    update(playerStatus){

        if (this.reachedRightBoundary()){
            this.direction = "left";
            this.moveDown = true;
        } else if (this.reachedLeftBoundary()){
            this.direction = "right";
            this.moveDown = true;
        }

        // Verifica se o jogador está vivo antes de atualizar os invasores
        if (playerStatus.alive === false) this.moveDown = false;

        this.invaders.forEach((invader) => {
            if (this.moveDown) {
                invader.moveDown();
                invader.incrementVelocity(0.2)
                this.invadersVelocity = invader.velocity; // Atualiza a velocidade dos invasores
            }

            if (this.direction === "right") invader.moveRight();
            
            if (this.direction === "left") invader.moveLeft();
        })
        this.moveDown = false; // Reseta o movimento para baixo após mover todos os invasores

    }

    reachedRightBoundary(){
        return this.invaders.some(
            (invader) => invader.position.x + invader.width >= innerWidth
        )
    }
    reachedLeftBoundary(){
        return this.invaders.some(
            (invader) => invader.position.x <= 0
        )
    }

    getRandomInvader() {
        const index = Math.floor(Math.random() * this.invaders.length);
        return this.invaders[index];
    }

    restart () {
        this.invaders = this.init(); // Reinicializa os invasores
        this.direction = "right"; // Reseta a direção
    }
}
export default Grid;