import Enemy from './Enemy';
import EnemyShot from './EnemyShot';

export default class Cloud extends Enemy {
  constructor(config) {
    super(config);
    console.log("Cloud class");

    // this.shot;


    


    this.shotGroup = this.scene.add.group();

    // this.container = this.add.container(400, 300);

    // config.scene.physics.world.enable(this.shotGroup);
    // config.scene.add.existing(this.shotGroup);
    // this.shotGroup.children.entries.setGravity(0, -800);

    this.scene.anims.create({
        key: 'waitCloudAnime',
        frames: this.scene.anims.generateFrameNumbers('ika', { start: 4, end: 4 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.play('waitCloudAnime', true);

    // var addShot = this.addShot();

    // this.addShot();

    this.shotCount = 0;


    // this.shotGroup = config.scene.physics.add.group({
    //     bounceX: 1,
    //     bounceY: 1,
    //     collideWorldBounds: true
    // });

    // this.shotGroup.create(100, 200, 'block').setVelocity(100, 200);

  }

  update(time, delta){

    console.log("time==="+this.shotCount);

    this.shotCount++;

    if( this.shotCount % 60 === 0){
      this.addShot();
      this.shotCount = 0;
    }
      // Array.from(this.shotGroup.children.entries).forEach(
      //     (fireball) => {
      //         // console.log(fireball);
      //         fireball.update(time, delta);
      //     });
  }
  addShot(){
    console.log("==========shot=x="+this.body.x);

    var shot =  new EnemyShot({
        scene: this.scene,
        key: 'shot',
        x: this.body.x,
        y: this.body.y
    });

    // scene.container.add(this.shot);
    // this.shotGroup.add(shot);
    // this.enemyGroup.add(enemyObject);

    // this.shot = this.add.sprite(0, 0, 'lemming');
    
  }

}