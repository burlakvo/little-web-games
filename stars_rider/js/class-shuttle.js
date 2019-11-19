class Shuttle {
    constructor () {
        this.img = document.createElement("img");
        this.img.setAttribute("src", "./images/base-shuttle.png");

        this.h = 64;
        this.w = 48;
        this.x = (canvasWidth - this.w) / 2;
        this.y = canvasHeight - this.h - 10;

        this.type = "shuttle";
        this.weapons = {"running": []};

        // control
        this.moveRight = false;
        this.moveLeft = false;

        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
    }

    draw (ctx) {
        ctx.beginPath();
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        ctx.closePath();
    }

    fire () {
        if (this.weapons.bluster && this.weapons.bluster.fired) {
            const x = this.x + this.w / 2;
            const y = this.y;
            this.weapons.running.push(new Bluster(x, y));

            this.weapons.bluster.fired = false;
        }
        else if (this.weapons.rocket && this.weapons.rocket.fired && this.weapons.rocket.num > 0) {
            const x = this.x + this.w / 2;
            const y = this.y;
            this.weapons.running.push(new Rocket(x, y));

            this.weapons.rocket.fired = false;
            this.weapons.rocket.num--;
        }
    }

    drawWeapons (delta, ctx) {
        this.weapons.running.forEach((weapon, index, object) => {
            if (weapon.removeConditions()) {
                object.splice(index, 1);
            }
            else {
                weapon.action(delta);
                weapon.draw(ctx);
            }
        });
    }

    keyDownHandler (e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            this.moveRight = true;
        }
        else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.moveLeft = true;
        }
        else if (e.key == " " && this.weapons.hasOwnProperty("bluster") && !this.weapons.bluster.pressed) {
            this.weapons.bluster.pressed = true;
            this.weapons.bluster.fired = true;
        }
        else if (e.key == "Shift" && this.weapons.hasOwnProperty("rocket") && !this.weapons.rocket.pressed) {
            this.weapons.rocket.pressed = true;
            this.weapons.rocket.fired = true;
        }
    }

    keyUpHandler (e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            this.moveRight = false;
        }
        else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.moveLeft = false;
        }
        else if (e.key == " " && this.weapons.hasOwnProperty("bluster")) {
            this.weapons.bluster.pressed = false;
        }
        else if (e.key == "Shift" && this.weapons.hasOwnProperty("rocket")) {
            this.weapons.rocket.pressed = false;
        }
    }

    move (delta) {
        if (this.moveRight) {
            this.x += delta * 100;
            if (this.x + this.w > canvasWidth){
                this.x = canvasWidth - this.w;
            }
        }
        else if (this.moveLeft) {
            this.x -= delta * 100;
            if (this.x < 0){
                this.x = 0;
            }
        }
    }

    addWeapon (type) {
        switch (type) {
            case "bluster":
                this.weapons.bluster = {};
                this.weapons.bluster.fired = false;
                break;

            case "rocket":
                this.weapons.rocket = {};
                this.weapons.rocket.num = 5;
                this.weapons.rocket.fired = false;
                break;
        }
    }
}

class Weapon {
    constructor (x, y, direction = "up") {
        this.x = x;
        this.y = y;

        this.demage = 1;
        this.speed = 1;
        this.type = "weapon";

        this.destinctTarget = false;
        this.direction = direction;
    }

    removeConditions () {
        if (this.y < 0 - this.h) return true;
        else if (this.y > canvasHeight) return true;
        else if (this.destinctTarget) return true;
    }

    achieveTarget () {
        this.destinctTarget = true;
    }

    action () {
        const movement = gameSpeed * delta * 100 * this.speed;
        this.y += (this.direction == "up") ? -movement : movement;
    }
}

class Bluster extends Weapon {
    constructor (x, y, direction = "up", color = "#ff0") {
        super(x, y, direction);

        this.w = 2;
        this.h = 10;

        this.color = color;
    }

    draw (ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.w / 2, this.y, this.w, this.h);
        ctx.closePath();
    }
}

class Rocket extends Weapon {
    constructor(x, y) {
        super(x, y);

        this.limit = 3;
        this.demage = 2;

        this.w = 15;
        this.h = 30;

        this.img = document.createElement("img");
        this.img.setAttribute("src", "./images/rocket.png");
    }

    draw (ctx) {
        ctx.beginPath();
        ctx.drawImage(this.img, 0, 0, this.w, this.h, this.x - this.w / 2, this.y, this.w, this.h);
        ctx.closePath();
    }
}