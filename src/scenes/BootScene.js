import makeAnimations from '../helpers/animations';

class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BootScene'
        });
    }
    preload() {
        const progress = this.add.graphics();

        // Register a load progress event to show a load bar
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on('complete', () => {
            // prepare all animations, defined in a separate file
            makeAnimations(this);
            progress.destroy();
            this.scene.start('GameScene');
        });

        this.load.image('lemming', 'assets/images/bomb.png');
        this.load.image('btn_stop', 'assets/images/btn_stop.png');

        this.load.image('tiles', 'assets/images/tileset.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/tilemap.json');
        //spritesheetは画像のサイズを合わせないとframe errorになる...
        this.load.spritesheet('laser', 'assets/images/bullet_sprite.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player', 'assets/images/rockman_sprite.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ika', 'assets/images/enemy_sprite.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('explosion', 'assets/images/explosion_sprite.png', { frameWidth: 64, frameHeight: 64 });

    }
}

export default BootScene;
