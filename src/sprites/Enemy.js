export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.world_scene = config.scene;

    console.log("enemy class");

    this.hp = 3;
    this.experience = config.experience ? config.experience : 10;
    this.type = config.type ? config.type : 'none';

    this.beenSeen = false;
    this.direction = 50;
    this.body.setGravity(0, -800);

    this.alive = true;
    this.damage = 1;
    this.attackPoint = 1;



  }

  explode(){
    this.anims.play('explosionAnime', true);
    if(this.container){
      this.container.destroy();
    }
    this.on('animationcomplete', function() {
      this.alive = false;
      console.log(this.scene);
      // this.scene.enemyGroup.remove(this);
      this.destroy();

      // console.log(this.scene);
    });
  }
  collide(player,enemy){
    if(player.type === 'player'){
      this.hp = this.hp - player.attackPoint;
      
      // if(enemy.coinainer.list.length > 0){
      //   console.log("this.coinainer.length");
      // }
    }
    if(this.hp <= 0 ){
      this.explode();
      this.scene.updateScore(this.experience);
    }
  }

}