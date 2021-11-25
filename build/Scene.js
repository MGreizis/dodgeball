import Game from './Game.js';
export default class Scene {
    canvas;
    ballRadius;
    ballPositionX;
    ballPositionY;
    ballSpeedX;
    ballSpeedY;
    playerPositionX;
    lastTickTimeStamp;
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth - 1;
        this.canvas.height = window.innerHeight - 4;
        this.createBall();
        this.playerPositionX = this.canvas.width / 2;
        this.lastTickTimeStamp = performance.now();
    }
    createBall() {
        this.ballRadius = Game.BALL_RADIUS_MIN + Game.BALL_RADIUS_SPREADING * Math.random();
        this.ballSpeedX = Game.BALL_SPEED_MIN + Game.BALL_SPEED_MAX * Math.random();
        this.ballSpeedY = 0;
        this.ballPositionX = this.ballRadius
            + (this.canvas.width - 2 * this.ballRadius) * Math.random();
        this.ballPositionY = this.canvas.height * 0.8 + this.canvas.height * 0.2 * Math.random();
    }
    update(timestamp) {
        const t = timestamp - this.lastTickTimeStamp;
        this.lastTickTimeStamp = timestamp;
        this.ballSpeedY -= Game.GRAVITY * t;
        this.ballPositionX += this.ballSpeedX * t;
        this.ballPositionY += this.ballSpeedY * t + 0.5 * Game.GRAVITY * t * t;
        if (this.ballPositionX <= this.ballRadius && this.ballSpeedX < 0) {
            this.ballSpeedX = -this.ballSpeedX;
        }
        if (this.ballPositionX >= this.canvas.width - this.ballRadius
            && this.ballSpeedX > 0) {
            this.ballSpeedX = -this.ballSpeedX;
        }
        if (this.ballPositionY <= this.ballRadius && this.ballSpeedY < 0) {
            this.ballSpeedY = -this.ballSpeedY;
        }
        const distX = this.playerPositionX - this.ballPositionX;
        const distY = Game.PLAYER_BALL_RADIUS - this.ballPositionY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        const gameover = distance <= (this.ballRadius + Game.PLAYER_BALL_RADIUS);
        return gameover;
    }
    render() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = 'red';
        ctx.beginPath();
        const playerPositionY = this.canvas.height - Game.PLAYER_BALL_RADIUS;
        ctx.ellipse(this.playerPositionX, playerPositionY, Game.PLAYER_BALL_RADIUS, Game.PLAYER_BALL_RADIUS, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        const y = this.canvas.height - this.ballPositionY;
        ctx.ellipse(this.ballPositionX, y, this.ballRadius, this.ballRadius, 0, 0, 2 * Math.PI);
        ctx.fill();
    }
}
//# sourceMappingURL=Scene.js.map