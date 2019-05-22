import Enemy from './Enemy';

export default class Brain extends Enemy {
// export default class Brain extends Phaser.GameObjects.Sprite {
  constructor(config) {
    // super(config.scene, config.x, config.y, config.key);
    super(config);
    console.log("brain class");

    this.bom1 = this.scene.add.sprite(0, 0, 'lemming');

    this.container = this.scene.add.container(this.body.x, this.body.y, [ this.bom1 ]);
    config.scene.physics.world.enable(this.container);
    config.scene.add.existing(this.container);
    this.container.body.setGravity(0, -800);

    this.beenSeen = false;
    this.direction = 50;
    this.body.setGravity(0, -800);
    this.moveArea = 40;
    this.alive = true;
    
    this.attack_bomb_count = 0;
    this.attackPoint = 1;
    this.hp = 20;

  }

  update(time, delta){

    this.container.x = this.body.x + (Math.cos(time*0.001)*100);
    this.container.y = this.body.y + (Math.sin(time*0.001)*100);

    this.scene.physics.world.overlap(this.scene.player, this.container,
      function(player,bomb){
        console.log("container");
      }
    );

    if(this.collideContainerCheck() === true){
      if(this.attack_bomb_count < 1){   
        this.scene.physics.world.overlap(
          this.scene.player,
          this.container,
          this.playerAddDamage(this.scene.player,this.container),
        );
      }
      this.attack_bomb_count++;
    }else{
      this.attack_bomb_count = 0;
    }
  }

 

}