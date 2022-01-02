import data from "./config";
import { autorun } from "mobx";
import { currentHealth, score } from "./Global";
import { Physics, Scene, Tweens } from "phaser";
import game from "./main";
class Food extends Phaser.Physics.Arcade.Sprite {
  frameElement: string | number;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    basket: Phaser.GameObjects.Sprite,
    foods: Phaser.GameObjects.Group,
    ground: Phaser.GameObjects.Rectangle
  ) {
    super(scene, x, y, texture);
    foods.add(this);

    this.frameElement = Phaser.Math.Between(0, 24);
    this.setFrame(this.frameElement)
      .setScale(Phaser.Math.FloatBetween(0.3, 0.4))
      .setRotation(Phaser.Math.FloatBetween(-Math.PI / 2, Math.PI / 2));
    scene.physics.add.existing(this);
    scene.physics.add.collider(this, basket, () => {
      this.destroy(true);
      if (this.isFruit(this.frameElement)) {
        //add score
        score.fruits += data.scorePerApple;
      }
      //////// lose health
      else {
        currentHealth.hearts -= 1;
        //gameover
        if (currentHealth.hearts == 0) {
          scene.scene.pause();

          scene.scene.launch("GameOver");
          updateHighScore();
        }
      }
      console.log("apple deactivited");
    });

    //destroy foods when touch the ground
    scene.physics.add.collider(this, ground, () => {
      scene.tweens.add({
        duration: 500,
        targets: this,
        alpha: 0,
        onComplete: () => {
          this.destroy(true);
        },
      });
    });
  }
  isFruit(txt: string | number): boolean {
    return (
      txt.toString() in
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "12", "17"]
    );
  }
}

export default Food;
function updateHighScore() {
  if (score.fruits > score.highScore) {
    score.highScore = score.fruits;
  }
}
