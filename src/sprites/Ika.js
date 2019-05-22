import Enemy from './Enemy';

export default class Ika extends Enemy {
  constructor(config) {
    super(config);
    console.log("ika class");
    this.scene.anims.create({
        key: 'waitIkaAnime',
        frames: this.scene.anims.generateFrameNumbers(config.key, { start: 1, end: 2 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.play('waitIkaAnime', true);

    this.hp = 3;

    this.moveArea = 40;
    this.dispPositionX_Left  = this.x - this.moveArea;
    this.dispPositionX_Right = this.x;
    this.dispPositionY_Left  = this.y - this.moveArea;
    this.dispPositionY_Right = this.y + this.moveArea;
    
  }

  activated() {
      if (!this.alive) {
          return false;
      }
      if (!this.beenSeen) {
          // check if it's being seen now and if so, activate it
          if (this.y < this.scene.cameras.main.scrollY + this.scene.sys.game.canvas.width + 32) {
              this.beenSeen = true;
              this.body.velocity.x = this.direction;
              this.body.allowGravity = true;
              return true;
          }
          return false;
      }
      if (this.beenSeen) {
        if(this.dispPositionX_Left > this.x ){
          this.body.velocity.x = this.direction;
        }
        if(this.dispPositionX_Right <= this.x){
          this.body.velocity.x = -this.direction;
        }
      }
      return true;
  }


  update(){
    if(!this.activated()){
    }
  }


}