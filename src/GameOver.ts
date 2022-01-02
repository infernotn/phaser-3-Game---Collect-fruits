import data from "./config";
import { autorun } from "mobx";
import { currentHealth, score } from "./Global";
import Scene_1 from "./Scene_1";
import { Scene } from "phaser";
class GameOver extends Phaser.Scene {
  gameOvertext: Phaser.GameObjects.Text;
  rect: Phaser.GameObjects.Rectangle;
  canvas: HTMLCanvasElement | null;
  constructor() {
    super("GameOver");
  }

  preload() {}
  create() {
    this.scene.setVisible(true);
    const { width, height } = this.scale;

    this.rect = this.add
      .rectangle(0, 0, width, height)
      .setOrigin(0)
      .setAlpha(0)
      .setFillStyle(0x000000);
    this.gameOvertext = this.add
      .text(width / 2, height / 2, "Game Over", {
        fontSize: "60px",
        color: "#ffffff",
        align: "center",
        fontStyle: "bold",
      })
      .setOrigin(0.5)
      .setAlpha(0);

    //tweens
    this.tweens.add({
      targets: this.rect,
      duration: 1000,
      alpha: 0.7,
      onComplete: () => {
        this.tweens.add({
          targets: this.gameOvertext,
          duration: 1000,
          alpha: 1,
        });
      },
    });
    //re-start the game
    this.canvas = document.querySelector("canvas");

    this.canvas?.addEventListener("click", () => {
      this.cameras.main.fadeOut(1000);
      this.cameras.main.on(
        "camerafadeoutcomplete",
        () => {
          this.scene.launch("Scene_1");
          setTimeout(() => {console.log("re-start");
          this.scene.stop();
     
           }, 200);
        
         
        },
        this
      );
    });
  }
}
export default GameOver;
