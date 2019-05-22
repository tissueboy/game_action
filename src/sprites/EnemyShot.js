export default class EnemyShot extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    console.log("EnemyShot class");

    this.shot = this.scene.add.sprite(0, 0, 'lemming');

  }
  update(keys, time, delta) {

    this.body.setVelocity(100, 100);

  }

}