import Game from './Game.js';

export default class Scene {
  private canvas: HTMLCanvasElement;

  private ballRadius: number;

  private ballPositionX: number;

  private ballPositionY: number;

  private ballSpeedX: number;

  private ballSpeedY: number;

  private playerPositionX: number;

  private lastTickTimeStamp : number;

  /**
   * Constructor
   *
   * @param canvas canvas
   */
  public constructor(canvas: HTMLElement) {
    this.canvas = <HTMLCanvasElement>canvas;

    // Resize the canvas to full window size
    this.canvas.width = window.innerWidth - 1;
    this.canvas.height = window.innerHeight - 4;

    // Spawn a Ball
    this.createBall();

    // Set the player at the center
    this.playerPositionX = this.canvas.width / 2;

    // Set the last tick timestamp to current time
    this.lastTickTimeStamp = performance.now();
  }

  /**
   * Creates (spawns) a ball
   */
  public createBall(): void {
    this.ballRadius = Game.BALL_RADIUS_MIN + Game.BALL_RADIUS_SPREADING * Math.random();
    this.ballSpeedX = Game.BALL_SPEED_MIN + Game.BALL_SPEED_MAX * Math.random();
    this.ballSpeedY = 0;
    this.ballPositionX = this.ballRadius
        + (this.canvas.width - 2 * this.ballRadius) * Math.random();
    this.ballPositionY = this.canvas.height * 0.8 + this.canvas.height * 0.2 * Math.random();
  }

  /**
   * Update
   *
   * @param timestamp timestamp
   * @returns gameover
   */
  public update(timestamp: number): boolean {
    const t = timestamp - this.lastTickTimeStamp;
    this.lastTickTimeStamp = timestamp;

    // move: calculate the new position of the ball
    // Some physics here: the y-portion of the speed changes due to gravity
    // Formula: Vt = V0 + gt
    // 9.8 is the gravitational constant
    this.ballSpeedY -= Game.GRAVITY * t;
    // Calculate new X and Y parts of the position
    // Formula: S = v*t
    this.ballPositionX += this.ballSpeedX * t;
    // Formula: S=v0*t + 0.5*g*t^2
    this.ballPositionY += this.ballSpeedY * t + 0.5 * Game.GRAVITY * t * t;

    // collide: check if the ball hits the walls and let it bounce
    // Left wall
    if (this.ballPositionX <= this.ballRadius && this.ballSpeedX < 0) {
      this.ballSpeedX = -this.ballSpeedX;
    }
    // Right wall
    if (this.ballPositionX >= this.canvas.width - this.ballRadius
      && this.ballSpeedX > 0) {
      this.ballSpeedX = -this.ballSpeedX;
    }

    // Bottom only (ball will always come down)
    if (this.ballPositionY <= this.ballRadius && this.ballSpeedY < 0) {
      this.ballSpeedY = -this.ballSpeedY;
    }

    // adjust: Check if the ball collides with the player. It's game over
    // then
    const distX = this.playerPositionX - this.ballPositionX;
    const distY = Game.PLAYER_BALL_RADIUS - this.ballPositionY;
    // Calculate the distance between ball and player using Pythagoras'
    // theorem
    const distance = Math.sqrt(distX * distX + distY * distY);
    // Collides is distance <= sum of radii of both circles
    const gameover = distance <= (this.ballRadius + Game.PLAYER_BALL_RADIUS);
    return gameover;
  }

  /**
   * draw: the items on the canvas
   *
   */
  public render(): void {
    // Get the canvas rendering context
    const ctx = this.canvas.getContext('2d');
    // Clear the entire canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw the player
    ctx.fillStyle = 'red';
    ctx.beginPath();
    const playerPositionY = this.canvas.height - Game.PLAYER_BALL_RADIUS;
    ctx.ellipse(this.playerPositionX, playerPositionY, Game.PLAYER_BALL_RADIUS,
      Game.PLAYER_BALL_RADIUS, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Draw the ball
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    // reverse height, so the ball falls down
    const y = this.canvas.height - this.ballPositionY;
    ctx.ellipse(this.ballPositionX, y, this.ballRadius, this.ballRadius, 0, 0, 2 * Math.PI);
    ctx.fill();
  }
}
