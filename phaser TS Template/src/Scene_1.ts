import { Scene } from "phaser";

class Scene_1 extends Phaser.Scene {
  image: Phaser.GameObjects.Image;
  constructor() {
    super("Scene_1");
  }
  preload(): void {
    this.load.image("coin", "assets/coin.png");
  }
  create(): void {
    console.log("hello TS");
    this.image = this.add.image(400, 300, "coin");
  }
  update(): void {
    this.image.rotation += 0.01;
  }
}

export default Scene_1;
