import Scene from './Scene.js';

/**
 * Main class of this Game.
 */
export default class Game {
  public static readonly GRAVITY: number = 0.0098;

  public static readonly BALL_RADIUS_MIN: number = 25;

  public static readonly BALL_RADIUS_SPREADING: number = 25;

  public static readonly BALL_SPEED_MIN: number = -5;

  public static readonly BALL_SPEED_MAX: number = 10;

  public static readonly PLAYER_BALL_RADIUS: number = 50;

  private scene: Scene;

  /**
   * Construct a new instance of this class
   *
   * @param canvas the canvas to render on
   */
  public constructor(canvas: HTMLElement) {
    this.scene = new Scene(canvas);
  }

  /**
   * Start the game.
   */
  public start(): void {
    // Start the animation
    console.log('start animation');
    requestAnimationFrame(this.step);
  }

  /**
   * This MUST be an arrow method in order to keep the `this` variable working
   * correctly. It will otherwise be overwritten by another object caused by
   * javascript scoping behaviour.
   *
   * @param timestamp a `DOMHighResTimeStamp` similar to the one returned by
   *   `performance.now()`, indicating the point in time when `requestAnimationFrame()`
   *   starts to execute callback functions
   */
  private step = (timestamp: number): void => {
    // To make it as accurate as possible, incorporate the time t
    // At 60fps, each interval is approximately 17ms.
    const gameover = this.scene.update(timestamp);

    this.scene.render();

    // Call this method again on the next animation frame
    if (!gameover) {
      requestAnimationFrame(this.step);
    }
    if (gameover) {
      // this.Game.start();
      this.scene.createBall();
      this.start();
    }
  };
}
