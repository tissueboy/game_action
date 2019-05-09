import Laser from '../sprites/Laser';
// import PlayerLasers from '../helpers/PlayerLasers';
import Player from '../sprites/Player';
import Enemy from '../sprites/Enemy';
import Ika from '../sprites/Ika';
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
      this.groundLayer.type ="layer_type";

      this.groundLayer.setCollisionBetween(1, 3);
      this.groundLayer.setCollisionByProperty({ collides: true });


      this.enemyGroup = this.add.group();

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

      this.physics.add.collider(this.player, this.enemyGroup, this.tileCollision,
        function(player, enemy){
          player.damage();
          player.collide(enemy);
        }
      );

      // this.physics.add.collider(this.playerLasers,this.enemyGroup, this.tileCollision,
      //   function(playerLaser, enemy) {
      //     playerLaser.explode();
      //     enemy.collide(playerLaser);
      //   }
      // );

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

      this.scoreText = this.add.text(100, 100, this.score);
      this.hpText = this.add.text(400, 100, this.player.hp);

    }
    update(time, delta) {

      this.player.update(this.keys, time, delta);

      this.player.isFloor = false;

      this.enemyGroup.children.entries.forEach(
          (sprite) => {
              sprite.update(time, delta);
          }
      );
    }
    updateScore(score){
      this.scoreText.text = Number(this.scoreText.text) + Number(score);
    }
    updateHp(hp){
      // console.log("updateHp");
      this.hpText.text = Number(hp);      
    }
    tileCollision(sprite, tile){
      sprite.isFloor = true;
      // console.log("tileCollision");
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
                    default:
                        // console.error('Unknown:', enemy.name); // eslint-disable-line no-console
                        break;
                }
            }
        );

    }
}

export default GameScene;
