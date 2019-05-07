export default class Laser extends Phaser.GameObjects.Sprite {
    constructor(config) {

        super(config.scene, config.x, config.y, config.key);

        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        this.type = 'laser';

        this.damage = 1;

        this.body.setSize(8, 8);
        this.body.offset.set(12, 12);
        this.body.setGravity(0, -800);

        this.body.velocity.y = 400;

        this.scene.anims.create({
            key: 'laserAnime',
            frames: this.scene.anims.generateFrameNumbers('laser', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
    }

    fire(x,y) {
    }

    update(time, delta) {
        this.anims.play('laserAnime', true);

        if (!this.active) {
            return;
        }
        this.body.setVelocityY(360);

    }

    collided() {
        if (this.body.velocity.y === 0) {
        }
        if (this.body.velocity.x === 0) {
        }
    }

    explode() {
        this.destroy();
    }
}
