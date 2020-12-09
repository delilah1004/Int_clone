export class Block {
    constructor(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.maxX = width + x;
        this.maxY = height + y;
    }

    draw(ctx) {
        const xGap = 80;
        const yGap = 60;

        ctx.fillStyle = '#ff384e';
        ctx.beginPath();
        // 직사각형
        ctx.rect(this.x, this.y, this.width, this.height); // x, y, w, h
        ctx.fill();

        ctx.fillStyle = '#190f3a';
        ctx.beginPath();
        // 아래쪽 그림자
        ctx.moveTo(this.maxX, this.maxY);
        ctx.lineTo(this.maxX - xGap, this.maxY + yGap);
        ctx.lineTo(this.x - xGap, this.maxY + yGap);
        ctx.lineTo(this.x, this.maxY);
        ctx.fill();

        ctx.fillStyle = '#9d0919';
        ctx.beginPath();
        // 왼쪽 그림자
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.maxY);
        ctx.lineTo(this.x - xGap, this.maxY + yGap);
        ctx.lineTo(this.x - xGap, this.maxY + yGap - this.height);
        ctx.fill();
    }
}