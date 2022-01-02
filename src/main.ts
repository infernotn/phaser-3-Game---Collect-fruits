import "phaser";
import GameOver from "./GameOver";
import Scene_1 from "./Scene_1";
import UI from "./UI";
let configObject: Phaser.Types.Core.GameConfig = {
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "thegame",
    width: 800,
    height: 600,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 20 },
      // debug: true,
    },
  },
  scene: [ Scene_1, UI, GameOver],
};

const game = new Phaser.Game(configObject);
export default game;

const canvas = document.querySelector("canvas");
if (canvas) {
  canvas.addEventListener("mousemove", () => {
    canvas.style.cursor = "default";

    canvas.style.cursor = "none";
  });
}
