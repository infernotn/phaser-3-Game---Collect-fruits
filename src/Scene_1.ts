import { Game, Physics, Scene } from "phaser";
import game from "./main";
import Food from "./Food";
import data from "./config";
import { currentHealth, score } from "./Global";

class Scene_1 extends Phaser.Scene {
  bg: Phaser.GameObjects.Image;
  Food: Phaser.GameObjects.Image;
  basket: Phaser.Physics.Arcade.Sprite;
  apple: Phaser.GameObjects.GameObject;
  fruits: Phaser.GameObjects.Group;
  foods: Phaser.GameObjects.Group;
  ground: Phaser.GameObjects.Rectangle;

  constructor() {
    super("Scene_1");
  }
  init() {
    this.scene.launch("UI");
  }
  preload(): void {
    this.load.image("bg", "./assets/Forest.png");
    this.load.spritesheet("food", "./assets/Food Pack Sprite Sheet.png", {
      frameWidth: 160,
      frameHeight: 160,
      endFrame: 24,
    });

    this.load.image("basket", "./assets/basket.png");
  }
  create(): void {
    currentHealth.hearts = data.maxHearts;
    score.fruits = 0;
    this.cameras.main.fadeIn(1000);
    const { width, height } = this.scale;
    data.currentHealth = data.maxHearts;
    this.ground = this.add
      .rectangle(0, height * 0.97, width, 10)
      .setVisible(false)
      .setOrigin(0);
    this.physics.add.existing(this.ground, true);

    //spawn
    this.foods = this.add.group();

    //TODO
    // this.physics.add.collider(this.fruits, this.fruits);
    const timerEventConfig = {
      delay: data.spawnSpeed,
      callback: () => {
        this.children.add(
          new Food(
            this,
            Phaser.Math.Between(20, 780),
            Phaser.Math.Between(-100, -10),
            "food",
            this.basket,
            this.foods,
            this.ground
          )
        );
      },
      callbackScope: this,
      loop: true,
    };
    const timedEvent = new Phaser.Time.TimerEvent(timerEventConfig);
    this.time.addEvent(timedEvent);
    ///
    this.bg = this.add.image(0, 0, "bg").setOrigin(0);

    this.basket = this.physics.add.sprite(400, 500, "basket").setScale(0.2);
    this.basket.setSize(450, 80);
  }
  update(): void {
    this.basket.body.velocity.y = 0;
    this.basket.setPosition(game.input.mousePointer.x, 500);
  }
}
export default Scene_1;
