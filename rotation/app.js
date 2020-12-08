import {Polygon} from './polygon.js'
import {Juggling} from './juggling.js'
import {Palette} from './palette.js'

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.isDown = false;
        this.moveX = 0;
        this.offsetX = 0;

        document.addEventListener('pointerdown', this.onDown.bind(this), false);
        document.addEventListener('pointermove', this.onMove.bind(this), false);
        document.addEventListener('pointerup', this.onUp.bind(this), false);

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.triangle = new Polygon(
            this.stageWidth / 6,
            this.stageHeight / 6,
            this.stageHeight / 9,
            3
        );

        this.square = new Polygon(
            this.stageWidth / 6 * 3,
            this.stageHeight / 6,
            this.stageHeight / 9,
            4
        );

        this.pentagon = new Polygon(
            this.stageWidth / 6 * 5,
            this.stageHeight / 6,
            this.stageHeight / 9,
            5
        );

        this.hexagon = new Polygon(
            this.stageWidth / 6,
            this.stageHeight / 6 * 3,
            this.stageHeight / 9,
            6
        );

        this.circle = new Juggling(
            this.stageWidth / 6 * 3,
            this.stageHeight / 6 * 3,
            this.stageHeight / 9,
            12
        );

        this.palette = new Palette(
            this.stageWidth / 6 * 5,
            this.stageHeight / 6 * 3,
            this.stageHeight / 9,
            12,
            22
        );

        this.menu = new Palette(
            this.stageWidth / 2,
            this.stageHeight + (this.stageHeight / 4),
            this.stageHeight / 2,
            15,
            100
        );
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.moveX *= 0.92;

        this.triangle.animate(this.ctx, this.moveX);
        this.square.animate(this.ctx, this.moveX);
        this.pentagon.animate(this.ctx, this.moveX);
        this.hexagon.animate(this.ctx, this.moveX);
        this.circle.animate(this.ctx, this.moveX);
        this.palette.animate(this.ctx, this.moveX);
        this.menu.animate(this.ctx, this.moveX);
    }

    onDown(e) {
        this.isDown = true;
        this.moveX = 0;
        this.offsetX = e.clientX;

    }

    onMove(e) {
        if(this.isDown) {
            this.moveX = e.clientX - this.offsetX;
            this.offsetX = e.clientX;
        }
    }

    onUp(e) {
        this.isDown = false;
    }
}

window.onload = () => {
    new App();
}