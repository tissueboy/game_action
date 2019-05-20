import Item from '../sprites/Item';

export default class Heart extends Item {
  constructor(config) {
    super(config);
    console.log("Heart class");
    this.recoveryPoint = 10;
    this.anims.play('waitIkaAnime', true);

  }
  create(){

  }

  hasEffect(player,item){
    console.log("item.recoveryPoint = "+item.recoveryPoint);
    player.hp = player.hp + item.recoveryPoint;
    this.scene.updateHp(player.hp);
    item.destroy();
    
  }
}