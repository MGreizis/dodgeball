import Scene from './Scene.js';
export default class Game {
    static GRAVITY = 0.0098;
    static BALL_RADIUS_MIN = 25;
    static BALL_RADIUS_SPREADING = 25;
    static BALL_SPEED_MIN = -5;
    static BALL_SPEED_MAX = 10;
    static PLAYER_BALL_RADIUS = 50;
    scene;
    constructor(canvas) {
        this.scene = new Scene(canvas);
    }
    start() {
        console.log('start animation');
        requestAnimationFrame(this.step);
    }
    step = (timestamp) => {
        const gameover = this.scene.update(timestamp);
        this.scene.render();
        if (!gameover) {
            requestAnimationFrame(this.step);
        }
        if (gameover) {
            this.scene.createBall();
            this.start();
        }
    };
}
//# sourceMappingURL=Game.js.map