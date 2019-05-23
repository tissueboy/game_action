import Enemy from './Enemy';
import EnemyShot from './EnemyShot';

export default class Cloud extends Enemy {
  constructor(config) {
    super(config);
    console.log("Cloud class");

    this.shotGroup = this.scene.add.group();

    this.scene.anims.create({
        key: 'waitCloudAnime',
        frames: this.scene.anims.generateFrameNumbers('ika', { start: 4, end: 4 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.play('waitCloudAnime', true);


    this.shotCount = 0;

    this.shotCount2 = 0;

    this.shot;

  }

  update(time, delta){

    this.shotCount++;

    if( this.shotCount % 60 === 0){

      this.shot =  new EnemyShot({
          scene: this.scene,
          key: 'shot',
          x: this.body.x,
          y: this.body.y,
          rx: this.scene.player.body.x,
          ry: this.scene.player.body.y
      });

      this.shotCount = 0;

    }

  }

}