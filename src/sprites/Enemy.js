export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    console.log("enemy class");

    this.hp = 3;
    this.experience = config.experience ? config.experience : 10;
    this.type = config.type ? config.type : 'none';

    this.beenSeen = false;
    this.direction = 50;
    this.body.setGravity(0, -800);

    this.alive = true;

    this.attackPoint = 1;
    this.isDamege = false;
    // this.tween;

  }

  explode(){

    this.setAlpha(1);
    this.alpha = 1;

    this.anims.play('explosionAnime', true);

    if(this.container){
      this.container.destroy();
    }
    this.on('animationcomplete', function() {
      this.alive = false;
      console.log(this.scene);
      this.destroy();

    });
  }
  collide(player,enemy){
    if(player.type === 'player'){
      this.hp = this.hp - player.attackPoint;
    }
    if(this.hp <= 0 ){
      this.explode();
      this.scene.updateScore(this.experience);
    }else{
      this.alpha = 1;
      this.damage();
    }
  }

  damage(){

    console.log("damage enemy");

    this.isDamege = true;

    var enemy = this;
    var tween = this.scene.tweens.add({
      targets: this,
      alpha: 0.1,
      duration: 200,
      loop: 20,
    });
    // var tween = this.tween;
    var stop = function(){
      console.log("functoin stop");
      tween.stop();
      // console.log("player="+player);
      enemy.alpha = 1;
      enemy.isDamege = false;
    }
    setTimeout(stop, 1000);
  }
}