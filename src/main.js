import 'phaser';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import TitleScene from './scenes/TitleScene';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 640,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 800
            },
            debug: true
        }
    },
    scene: [
        BootScene,
        TitleScene,
        GameScene
    ]
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
