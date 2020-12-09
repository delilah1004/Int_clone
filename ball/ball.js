export class Ball {
    constructor(stageWidth, stageHeight, radius, speed) {
        this.radius = radius;
        this.vx = speed;
        this.vy = speed;

        const diameter = this.radius * 2;
        this.x = diameter + (Math.random() * stageWidth - diameter);
        this.y = diameter + (Math.random() * stageHeight - diameter);
    }

    draw(ctx, stageWidth, stageHeight, block) {
        this.x += this.vx;
        this.y += this.vy;

        this.bounceWindow(stageWidth, stageHeight);

        this.bounceBlock(block);

        ctx.fillStyle = '#fdd700';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    bounceWindow(stageWidth, stageHeight) {
        // 화면 왼쪽
        const minX = this.radius;
        // 화면 오른쪽
        const maxX = stageWidth - this.radius;
        // 화면 위쪽
        const minY = this.radius;
        // 화면 아래쪽
        const maxY = stageHeight - this.radius;

        // 공이 양 옆에 부딪혔을 때
        if(this.x <= minX || this.x >= maxX) {
            this.vx *= -1;
            this.x += this.vx;
        } 
        // 공이 위 아래에 부딪혔을 때
        else if (this.y <= minY || this.y >= maxY) {
            this.vy *= -1;
            this.y += this.vy;
        }
    }

    bounceBlock(block) {
        // 블록의 범위

        // 왼쪽
        const minX = block.x - this.radius;
        // 오른쪽
        const maxX = block.maxX + this.radius;
        // 위쪽
        const minY = block.y - this.radius;
        // 아래쪽
        const maxY = block.maxY + this.radius;

        // 블록의 범위에 공이 들어왔을 때, 튕겨내기
        if(this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
            const x1 = Math.abs(minX - this.x);
            const x2 = Math.abs(this.x - maxX);
            const y1 = Math.abs(minY - this.y);
            const y2 = Math.abs(this.y - maxY);

            const min1 = Math.min(x1, x2);
            const min2 = Math.min(y1, y2);
            
            const min = Math.min(min1, min2);

            // 블록의 양 옆에서 부딪힌 경우
            if(min == min1) {
                this.vx *= -1;
                this.x += this.vx;
            }

            // 블록의 위 아래에서 부딪힌 경우
            if(min == min2) {
                this.vy *= -1;
                this.y += this.vy;
            }
        }
    }
}