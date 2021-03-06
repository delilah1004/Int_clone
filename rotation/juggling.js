const PI2 = Math.PI * 2;

export class Juggling {
    constructor(x, y, radius, sides) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sides = sides;
        this.rotate = 0;
    }

    animate(ctx, moveX) {
        ctx.save();
        ctx.fillStyle = `#000`

        const angle = PI2 / this.sides;

        ctx.translate(this.x, this.y);

        this.rotate -= moveX * 0.008;
        ctx.rotate(this.rotate);

        for (let i = 0; i < this.sides; i++) {
            const x = this.radius * Math.cos(angle * i);
            const y = this.radius * Math.sin(angle * i);

            ctx.beginPath();
            ctx.arc(x, y, 10, 0, PI2, false);
            ctx.fill();
        }

        ctx.restore();
    }
}