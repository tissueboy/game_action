import Laser from '../sprites/Laser';
import PlayerLasers from '../helpers/PlayerLasers';

export default class Player extends Phaser.GameObjects.Sprite {
    constructor(config) {

        super(config.scene, config.x, config.y, config.key);

        console.log(this.scene);

        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        this.type = 'player';
        this.isFloor = false;
        this.body.gravity.y = 800;
        this.body.gravity.y = 0;
        this.jumpPower = -600;
        this.countTouch = 0;
        this.jumpTimer = 0;
        this.jumping = false;
        this.delta = 0;
        this.derection = "right";
        this.isDamege = false;
        this.hp = 100;

        this.scene.anims.create({
            key: 'waitLeftAnime',
            frames: this.scene.anims.generateFrameNumbers(config.key, { start: 7, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'runLeftAnime',
            frames: this.scene.anims.generateFrameNumbers(config.key, { start: 3, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'jumpLeftAnime',
            frames: this.scene.anims.generateFrameNumbers(config.key, { start: 2, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'damageLeftAnime',
            frames: this.scene.anims.generateFrameNumbers(config.key, { start: 0, end: 1 }),
            frameRate: 4,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'waitRightAnime',
            frames: this.scene.anims.generateFrameNumbers(config.key, { start: 8, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'runRightAnime',
            frames: this.scene.anims.generateFrameNumbers(config.key, { start: 10, end: 12 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'jumpRightAnime',
            frames: this.scene.anims.generateFrameNumbers(config.key, { start: 13, end: 13 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'damageRightAnime',
            frames: this.scene.anims.generateFrameNumbers(config.key, { start: 14, end: 15 }),
            frameRate: 4,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'shotAnime',
            frames: this.scene.anims.generateFrameNumbers(config.key, { start: 16, end: 16 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'explosionAnime',
            frames: this.scene.anims.generateFrameNumbers('explosion', { start: 0, end: 16 }),
            frameRate: 10,
            repeat: 0
        });
    }
    create(){
      // this.scene.physics.world.collide(this, this.scene.groundLayer, this.scene.tileCollision);
      // this.physics.world.add.collider(this, this.scene.groundLayer, this.scene.tileCollision);
      this.physics.add.collider(this, this.scene.enemyGroup, this.scene.tileCollision,
        function(player, enemy){
          player.damage();
          player.collide(enemy);
        }
      );
    }

    update(keys, time, delta) {

      this.jumpTimer -= delta;

      if(keys.isTOUCH === true && this.isFloor === false && this.countTouch == 0){  
        this.laser();
      }
      if(keys.isTOUCH === false && this.isFloor == true){
        this.jumping = false;
        this.countTouch = 0;
      }
      //ジャンプ
      if(keys.isTOUCH === true){
        this.jump();
      }
      if(keys.isTOUCH === false){
        this.countTouch = 0;
        this.jumpTimer = 600;
      }
      this.body.setVelocityX(keys.DIRECTION* 100);

      
      if(keys.DIRECTION < 0 && this.isDamege == false){
        //左に進むアニメーション
        this.anims.play('runLeftAnime', true);
        this.derection = "left";
      }else if(keys.DIRECTION > 0 && this.isDamege == false){
        //右に進むアニメーション
        this.anims.play('runRightAnime', true);
        this.derection = "right";
      }


      if(this.jumping === true && this.isFloor === false && this.isDamege == false){
        if(this.derection === "left"){
          this.anims.play('jumpLeftAnime', true);
        }
        if(this.derection === "right"){
          this.anims.play('jumpRightAnime', true);
        }
        
      }
      if(keys.DIRECTION === 0 && this.jumping == false && this.isDamege == false){
        if(this.derection === "left"){
          this.anims.play('waitLeftAnime', true);
        }
        if(this.derection === "right"){
          this.anims.play('waitRightAnime', true);
        }
      }

      this.isDamege = false;

    }


    jump() {
      if (this.jumping === false) {
          this.jumpTimer = 600;
      }

      if(this.jumpTimer >= 0){
        this.body.setVelocityY(this.jumpPower);
      }

      this.jumping = true;

      if(this.body.velocity.y <= 0){
        this.body.velocity.y = this.body.velocity.y*0.5;
        this.body.gravity.y = 0;   
      }
    }
    laser(){
      var laser = new Laser({
        scene: this.scene,
        key: 'laser',
          x: this.x,
          y: this.y,
      });
      this.scene.playerLasers.add(laser);   
      this.countTouch++;     
    }
    damage(){
      console.log("damage");
      this.isDamege = true;
      if(this.derection === "left"){
        this.anims.play('damageLeftAnime', true);
      }
      if(this.derection === "right"){
        this.anims.play('damageRightAnime', true);
      }
    }
    explode(){
      this.anims.play('explosionAnime', true);
      this.on('animationcomplete', function() {
        this.alive = false;
        this.destroy();
      });
    }
    collide(obj){
      if(obj.type === 'ika'){
        this.hp = this.hp - obj.damage;
        this.scene.updateHp(this.hp);
      }
      if(this.hp <= 0 ){
        this.explode();
        console.log("=======GAME OVER========")
      }
    }
}
