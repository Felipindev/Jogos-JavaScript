class SoundEffects {
    constructor(){
        this.shootSounds = [
            new Audio("src/assets/audios/shoot.mp3"),
            new Audio("src/assets/audios/shoot.mp3"),
            new Audio("src/assets/audios/shoot.mp3"),
            new Audio("src/assets/audios/shoot.mp3"),
            new Audio("src/assets/audios/shoot.mp3"),
            new Audio("src/assets/audios/shoot.mp3"),
        ]
        this.hitSounds = [
            new Audio("src/assets/audios/hit.mp3"),
            new Audio("src/assets/audios/hit.mp3"),
            new Audio("src/assets/audios/hit.mp3"),
            new Audio("src/assets/audios/hit.mp3"),
            new Audio("src/assets/audios/hit.mp3"),
            new Audio("src/assets/audios/hit.mp3"),
        ]
        this.explosionSound = new Audio("src/assets/audios/explosion.mp3")
        this.nextLevelSound = new Audio("src/assets/audios/next_level.mp3")

        this.currentShootSounds = 0
        this.currentHitSounds = 0
        this.adjustVolumes()
    }

    playShootSound() {
        this.shootSounds[this.currentShootSounds].currentTime = 0
        this.shootSounds[this.currentShootSounds].play()
        this.currentShootSounds = 
            (this.currentShootSounds + 1) % this.shootSounds.length
    }
    playhitSound() {
        this.hitSounds[this.currentHitSounds].currentTime = 0
        this.hitSounds[this.currentHitSounds].play()
        this.currentHitSounds = 
            (this.currentHitSounds + 1) % this.hitSounds.length
    }
    playExplosionSound() {
        this.explosionSound.play()
    }
    playNextLevelSound() {
        this.nextLevelSound.play()
    }

    adjustVolumes() {
        this.hitSounds.forEach(sound => sound.volume = 0.2)
        this.shootSounds.forEach(sound => sound.volume = 0.5)
        this.explosionSound.volume = 0.2
        this.nextLevelSound.volume = 0.4
    }
}

export default SoundEffects