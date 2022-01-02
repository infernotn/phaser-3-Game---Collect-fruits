import data from "./config";
import { autorun } from "mobx";
import { currentHealth, score } from "./Global";

interface hearts {
  sprite: Phaser.GameObjects.Sprite;
  text: string;
}
class UI extends Phaser.Scene {
  scoreText: Phaser.GameObjects.Text;
  public score: number;
  healthCont: Phaser.GameObjects.Container;
  heart: Phaser.GameObjects.Sprite;
  health: hearts[];
  highScoreText: Phaser.GameObjects.Text;
  constructor() {
    super("UI");
  }

  preload() {
    this.load.spritesheet("health", "./assets/health.png", {
      frameWidth: 563,
      frameHeight: 544,
      endFrame: 2,
    });
  }
  create() {
    const { width, height } = this.scale;

    ///health
    this.healthCont = this.add
      .container(width * 0.01, height * 0.02)
      .setDepth(10);
    this.health = [];
    for (let i = 0; i < data.maxHearts; i++) {
      this.heart = this.add.sprite(565 * i, 0, "health", "1").setOrigin(0);

      this.healthCont.add(this.heart);
      this.health.push({
        sprite: this.heart,
        text: "1",
      });
      this.healthCont.setScale(0.08);
      console.log(i);
    }
    autorun(() => {
      this.health[currentHealth.hearts].sprite.setFrame(0);
    });

    //Score
    this.score = 0;
    this.scoreText = this.add
      .text(width / 2, height * 0.05, "0", {
        fontSize: "60px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5)
      .setDepth(10);
    autorun(() => {
      this.scoreText.text = score.fruits.toString();
    });
    //highScore

    this.highScoreText = this.add
      .text(
        width * 0.99,
        height * 0.02,
        "high Score : " + score.highScore.toString(),
        {
          fontSize: "30px",
          color: "#ffffff",
          fontStyle: "bold",
        }
      )
      .setOrigin(1, 0)
      .setDepth(10);
    autorun(() => {
      this.highScoreText.text = "high Score : " + score.highScore.toString();
    });
  }

  loseHealth(): void {
    data.currentHealth -= 1;
    this.health[data.currentHealth].sprite.setFrame(0);
    this.health[data.currentHealth].text = "0";
  }
}
export default UI;
