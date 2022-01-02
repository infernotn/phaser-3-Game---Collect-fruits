import "phaser";
import Scene_1 from "./Scene_1";

let configObject: Phaser.Types.Core.GameConfig = {
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "thegame",
    width: 800,
    height: 600,
  },
  scene: [Scene_1],
};

new Phaser.Game(configObject);
