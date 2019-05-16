import Enemy from './Enemy';

export default class Brain extends Enemy {
// export default class Brain extends Phaser.GameObjects.Sprite {
  constructor(config) {
    // super(config.scene, config.x, config.y, config.key);
    super(config);
    console.log("brain class");

    this.bom1 = this.scene.add.sprite(0, 0, 'lemming');
    // this.bom2 = this.scene.add.sprite(-40, -40, 'lemming');
    // this.container = this.scene.add.container(this.body.x + 80, this.body.y+ 80, [ this.bom1 ]);
    // this.container.body.setGravity(0, -800);
    this.container = this.scene.add.container(this.body.x, this.body.y, [ this.bom1 ]);
    config.scene.physics.world.enable(this.container);
    config.scene.add.existing(this.container);
    this.container.body.setGravity(0, -800);

    this.beenSeen = false;
    this.direction = 50;
    this.body.setGravity(0, -800);
    this.moveArea = 40;
    this.alive = true;
    this.damage = 1;
    this.attack_bomb_count = 0;
    this.attackPoint = 50;

    // config.scene.tweens.add({
    //     targets: this.container,
    //     angle: 360,
    //     duration: 6000,
    //     yoyo: true,
    //     repeat: -1
    // });

  }

  update(time, delta){
    this.container.x = this.body.x + (Math.cos(time*0.001)*100);
    this.container.y = this.body.y + (Math.sin(time*0.001)*100);

    // this.body.y = this.body.y + (Math.sin(time*0.004)*100);

    // this.container.rotation += 0.1;
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
  collideContainerCheck(){

    var flg = false;
    this.scene.physics.world.overlap(this.scene.player, this.container,
      function(player,enemy){
        flg = true;
      }
    );
    // console.log("this.collideCheck() flg="+flg);

    return flg;

  }
  playerAddDamage(player,enemy){
    if(player.type === 'player'){
      player.hp = player.hp - this.attackPoint;
      console.log("player.hp="+player.hp);
      this.scene.updateHp(player.hp);
      // if(enemy.coinainer.list.length > 0){
      //   console.log("this.coinainer.length");
      // }
    }
    if(player.hp <= 0 ){
      player.explode();
      console.log("=====game over-----");
      // this.scene.updateScore(this.experience);
    }
  }  

}