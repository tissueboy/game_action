export default class EnemyShot extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.rx ,config.ry ,config.key);

    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    // this.rx = config.rx - config.x;
    // this.ry = config.ry - config.y;

    this.shotPos = {
      x:config.x,
      y:config.y
    };
    this.anglePlayer = {
      x:config.rx,
      y:config.ry
    }

    // this.bom1 = this.scene.add.sprite(config.x, config.x, 'lemming');

    this.BetweenPoints = Phaser.Math.Angle.BetweenPoints;
    this.velocityFromRotation = this.scene.physics.velocityFromRotation;

    this.angleShot = this.BetweenPoints(this.shotPos,this.anglePlayer);

    this.velocityShot = new Phaser.Math.Vector2();

    this.wirePower = 100;

    this.velocityFromRotation(this.angleShot, this.wirePower, this.velocityShot);

    this.body.setVelocity(this.velocityShot.x, this.velocityShot.y);

    this.body.setGravity(0, -800);

    this.attackPoint = 1;

    this.scene.physics.add.overlap(this, this.scene.player, (shot, player) => {
      player.damage();
      shot.collide(player,shot);
    });
    this.scene.physics.add.collider(this, this.scene.groundLayer,this.collideLayer);

    this.scene.physics.add.collider(this, this.scene.groundLayer,(shot, player) => {
      shot.collideLayer(shot)
    });

    // this.physics.add.collider(this.player, this.groundLayer, this.tileCollision);


  }

  collide(player,shot){
    console.log("collide==shot this.destroy();");
    if(player.type === 'player'){
      player.hp = player.hp - shot.attackPoint;
      this.scene.updateHp(player.hp);
    }
    this.destroy();
  }
  collideLayer(shot){
    console.log("collideLayer");
    shot.destroy();
  }
}