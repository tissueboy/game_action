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

        this.body.gravity.x = 0;
        this.body.gravity.y = 0;
        this.wirePower = 300;
        this.countTouch = 0;
        this.jumpTimer = 0;
        this.delta = 0;
        this.derection = "right";
        this.isDamege = false;
        this.hp = 100;
        this.rx = 0;
        this.ry = 0;
        this.attackPoint = 1;
        this.beforeVecX = 0;
        this.beforeVecY = 0;
        this.degree = 10;
        this.touchStart = {
          x:0,
          y:0
        };
        this.touchMove = {
          x:0,
          y:0
        };
        this.anglePlayer = {
          x:0,
          y:0
        }
        this.scene.anims.create({
          key: 'waitLeftAnime',
          frames: this.scene.anims.generateFrameNumbers(config.key, { start: 7, end: 7 }),
          frameRate: 10,
          repeat: -1
        });
        this.scene.anims.create({
          key: 'explosionAnime',
          frames: this.scene.anims.generateFrameNumbers('explosion', { start: 0, end: 16 }),
          frameRate: 10,
          repeat: 0
        });

      this.graph = this.scene.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });
      this.graph.lineStyle(2, 0x00aa00);

      this.arrow = this.scene.add.graphics({ lineStyle: { width: 4, color: 0x00FF00 } });
      this.arrow.lineStyle(2, 0x00FF00);

      this.normalAngle;
      this.tang = 0;

      this.BetweenPoints = Phaser.Math.Angle.BetweenPoints;
      this.SetToAngle = Phaser.Geom.Line.SetToAngle;
      this.velocityFromRotation = this.scene.physics.velocityFromRotation;
      this.velocityShot = new Phaser.Math.Vector2();

      this.angleShot = 0;

    }

    create(){
      this.physics.add.collider(this, this.scene.enemyGroup, this.scene.tileCollision,
        function(player, enemy){
          player.damage();
          player.collide(enemy);
        }
      );

    }

    update(keys, time, delta) {

      if(this.alive === false){
        return;
      }else{
        this.anims.play('waitLeftAnime', true);
      }

      this.jumpTimer -= delta;

      if(keys.isTOUCH === true){
        this.graph.clear();
        this.graph.lineBetween(
          keys.TOUCH_START_X,
          keys.TOUCH_START_Y,
          keys.TOUCH_MOVE_X,
          keys.TOUCH_MOVE_Y
        );

        /*
        https://proglight.jimdo.com/programs/java/monsterstrike/
        引っ張り始めた点(px,py)　(keys.TOUCH_START_X,keys.TOUCH_START_Y)
        引っ張って放した点(fx,fy)(keys.TOUCH_MOVE_X,keys.TOUCH_MOVE_Y)
        進むべき方向(rx,ry)
        rx = -1 * (fx - px) = px - fx
        ry = -1 * (fy - py) = py - fy
        */
        this.rx = keys.TOUCH_START_X - keys.TOUCH_MOVE_X;
        this.ry = keys.TOUCH_START_Y - keys.TOUCH_MOVE_Y;
        this.touchStart.x = keys.TOUCH_START_X;
        this.touchStart.y = keys.TOUCH_START_Y;
        this.touchMove.x = keys.TOUCH_MOVE_X;
        this.touchMove.y = keys.TOUCH_MOVE_Y;
        
        this.angleShot = this.BetweenPoints(this.touchMove,this.touchStart);

      }

      if(keys.isTOUCH === false && keys.isRELEASE === true){

        this.velocityFromRotation(this.angleShot, this.wirePower, this.velocityShot);

        this.body.setVelocity(this.velocityShot.x, this.velocityShot.y);

      }

      if(this.isFloor === true){

        keys.isRELEASE = false;

        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        // this.tang= 0;

      }else{

        this.body.gravity.y = -800;

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
      this.alive = false;
      this.on('animationcomplete', function() {
        console.log("animationcomplete");
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
