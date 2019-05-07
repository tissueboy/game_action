export default class PlayerLasers extends Phaser.GameObjects.Sprite {

    constructor(config) {
      console.log("PlayerLasers");

      super(config.scene, config.x, config.y, config.key);

      this.body.velocity.y = 1000;
  }

}
