import { makeAutoObservable } from "mobx";
import data from "./config";
export const score = new (class scoreState {
  fruits = 0;
  highScore = data.highScore;
  constructor() {
    makeAutoObservable(this);
  }
})();

export const currentHealth = new (class health {
  hearts = 3;
  constructor() {
    makeAutoObservable(this);
  }
})();
