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
    this.moveArea = 40;
    this.dispPositionX_Left  = this.x - this.moveArea;
    this.dispPositionX_Right = this.x;
    this.dispPositionY_Left  = this.y - this.moveArea;
    this.dispPositionY_Right = this.y + this.moveArea;
    this.alive = true;
    this.damage = 1;

  }

  update(){

  }
  explode(){
    this.anims.play('explosionAnime', true);
    this.on('animationcomplete', function() {
      this.alive = false;
      this.destroy();
    });
  }
  collide(obj){
    if(obj.type === 'laser'){
      this.hp = this.hp - obj.damage;
    }
    if(this.hp <= 0 ){
      this.explode();
      this.scene.updateScore(this.experience);
    }
  }

}