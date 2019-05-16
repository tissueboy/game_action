import Laser from '../sprites/Laser';
// import PlayerLasers from '../helpers/PlayerLasers';
import Player from '../sprites/Player';
import Enemy from '../sprites/Enemy';
import Ika from '../sprites/Ika';
import Brain from '../sprites/Brain';
import Item from '../sprites/Item';
import Heart from '../sprites/Heart';
// import Fire from '../sprites/Fire';

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }
    create(){

      var isJump = false;

      this.map = this.make.tilemap({ key: 'map' });

      this.tileset = this.map.addTilesetImage('tileset', 'tiles');

      // this.groundLayer = this.map.createStaticLayer("ground", this.tileset, 0, 0);
      this.groundLayer = this.map.createDynamicLayer('ground', this.tileset, 0, 0);
      this.groundLayer.setCollisionBetween(0, 2);
      this.groundLayer.setCollisionByProperty({ collides: true });



      this.actionLayer = this.map.createDynamicLayer('action', this.tileset, 0, 0);
      this.actionLayer.setCollisionBetween(3, 5);
      this.actionLayer.setCollisionByProperty({ collides: true });




      this.enemyGroup = this.add.group();

      this.itemGroup = this.add.group();

      this.parseObjectLayers();

      // CREATE PLAYER!!!
      this.player = new Player({
          scene: this,
          key: 'player',
          x: 100,
          y: 100,
          isFloor: false,
      });

      this.playerLasers = this.add.group();

      this.lasers = this.add.group({
          classType: Laser,
          maxSize: 10,
          runChildUpdate: false // Due to https://github.com/photonstorm/phaser/issues/3724
      });

      this.physics.add.collider(this.player, this.groundLayer, this.tileCollision);

      this.physics.add.overlap(this.player, this.actionLayer);

      this.actionLayer.setTileIndexCallback(3, this.hitCoin, this.player);

      this.actionLayer.setTileIndexCallback(4, this.hitCoin, this.player);


      this.keys = {
          jump: false,
          TOUCH_START_X: 0,
          TOUCH_START_Y: 0,
          TOUCH_MOVE_X: 0,
          TOUCH_MOVE_Y: 0,
          isTOUCH: false,
          DIRECTION: 0,
          isRELEASE: false
      };

      this.input.on('pointerdown', function (pointer) {
        this.keys.TOUCH_START_X = pointer.x;
        this.keys.TOUCH_START_Y = pointer.y;
        this.keys.isTOUCH = true;
        // this.keys.isRELEASE = false;
      }, this);

      this.input.on('pointerup', function (pointer) {
        this.keys.isTOUCH = false;
        this.keys.isRELEASE = true;
        this.keys.TOUCH_START_X = 0;
        this.keys.TOUCH_START_Y = 0;
        this.keys.DIRECTION = 0;
      }, this);


  
      this.input.on('pointermove', function (pointer) {
        this.keys.TOUCH_MOVE_X = pointer.x;
        this.keys.TOUCH_MOVE_Y = pointer.y;
        if(this.keys.isTOUCH == true){
          // 左に移動
          if( ( this.keys.TOUCH_START_X - pointer.x ) > 10 ){
            this.keys.DIRECTION = -1;
          }
          // 右に移動
          if( ( this.keys.TOUCH_START_X - pointer.x ) < -10 ){
            this.keys.DIRECTION = 1;
          }
          if( ( this.keys.TOUCH_START_X - pointer.x ) <= 10 && ( this.keys.TOUCH_START_X - pointer.x ) >= -10 ){
            this.keys.DIRECTION = 0;
          }

        }

      }, this);


      this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

      this.cameras.main.startFollow(this.player, true, 0.5, 0.5);

      this.score = 30;

      var scoreText;

      // this.scene.add.text(12, 12, 'Score: 0', { font: "24px", fill: "#000" });

      this.scoreText = this.add.text(100, 100, this.score).setScrollFactor(0, 0);
      this.hpText = this.add.text(400, 100, this.player.hp).setScrollFactor(0, 0);

      this.flg_attack = false;
      this.attack_count = 0;


    }
    update(time, delta) {

      this.player.update(this.keys, time, delta);

      this.player.isFloor = false;



      this.enemyGroup.children.entries.forEach(
          (sprite) => {
              sprite.update(time, delta);
          }
      );

      if(this.collideCheck() === true){
        if(this.attack_count < 1){   
          this.physics.world.overlap(this.player, this.enemyGroup,
            function(player,enemy){
              enemy.collide(player,enemy);
            }
          );
        }
        this.attack_count++;
      }else{
        this.attack_count = 0;
      }
      this.physics.world.overlap(this.player,this.itemGroup,
        function( player,item){
          console.log("overlap");
          item.hasEffect(player,item);
        }
      );
      // this.itemGroup.children.entries.forEach(
      //     (sprite) => {
      //         sprite.update(time, delta);
      //     }
      // );

    }

    collideCheck(){

      var flg = false;
      this.physics.world.overlap(this.player, this.enemyGroup,
        function(player,enemy){
          flg = true;
        }
      );
      // console.log("this.collideCheck() flg="+flg);

      return flg;

    }
    updateScore(score){
      this.scoreText.text = Number(this.scoreText.text) + Number(score);
    }
    updateHp(hp){
      // console.log("updateHp");
      this.hpText.text = Number(hp);      
    }
    tileCollision(player, tile){

      player.isFloor = true;
      player.beforeVecX = 0;
      player.beforeVecY = 0;
      // console.log("tile="+tile);
    }
    tileActionCollision(sprite, tile){

      
      console.log("tile="+tile);

    }

    hitCoin(player, tile){

      console.log("hitCoin");

      // if(player.beforeVecX === 0 && player.beforeVecY === 0){
      //   if(player.body.velocity.x < 0 ){
      //     player.beforeVecX = player.body.velocity.x*-1;
      //   }else{
      //     player.beforeVecX = player.body.velocity.x;
      //   }
      //   if(player.body.velocity.y < 0 ){
      //     player.beforeVecY = player.body.velocity.y*-1;
      //   }else{          
      //     player.beforeVecY = player.body.velocity.y;
      //   }
        // player.body.setVelocityX(player.beforeVecX*-1);
        // player.body.setVelocityY(player.beforeVecY*-1);
      // }
    }
    parseObjectLayers() {
        console.log(this.tileset);

        this.map.getObjectLayer('enemies').objects.forEach(
            (enemy) => {
                let enemyObject;

                switch (enemy.name) {
                    case 'ika':
                        enemyObject = new Ika({
                            scene: this,
                            key: 'ika',
                            x: enemy.x,
                            y: enemy.y
                        });
                        this.enemyGroup.add(enemyObject);
                        break;
                    case 'brain':
                        enemyObject = new Brain({
                            scene: this,
                            key: 'brain',
                            x: enemy.x,
                            y: enemy.y
                        });
                        this.enemyGroup.add(enemyObject);
                        break;                      
                    default:
                        // console.error('Unknown:', enemy.name); // eslint-disable-line no-console
                        break;
                }
            }
        );

        this.map.getObjectLayer('items').objects.forEach(
            (item) => {
                let itemObject;

                switch (item.name) {
                    case 'heart':
                    console.log("heart  AAAA");
                        itemObject = new Heart({
                            scene: this,
                            key: 'heart',
                            x: item.x,
                            y: item.y
                        });
                        this.itemGroup.add(itemObject);
                        break;                    
                    default:
                        // console.error('Unknown:', enemy.name); // eslint-disable-line no-console
                        break;
                }
            }
        );

    }
}

export default GameScene;
