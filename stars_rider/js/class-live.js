class Live {
    constructor () {
        this.num = 3;

        this.w = 24;
        this.h = 24;
        this.y = 10;
        this.x = canvasWidth - this.w - 10;

        this.img = document.createElement("img");
        this.img.setAttribute("src", "./images/space-suit.png");
    }

    draw (ctx) {
        for (let i = 0; i < this.num; i++) {
            ctx.beginPath();
            ctx.drawImage(this.img, this.x - (this.w + 10) * i, this.y, this.w, this.h);
            ctx.closePath();
        }
    }
}