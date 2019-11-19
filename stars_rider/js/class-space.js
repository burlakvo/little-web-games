class Space {
    constructor () {
        this.limit = 15;
        this.perTime = 2;
        this.newOn = 0;
        this.objects = [];

        this.objectsToGenerate = [
            {
                "type": "asteroid",
                "from": 0,
                "to": 0.5
            }
        ];
    }

    draw (ctx) {
        this.objects.forEach((spaceObject, index, object) => {
            if (spaceObject.removeConditions()) {
                object.splice(index, 1);
                if (spaceObject.limitUse) this.limit++;
                if (spaceObject.points) score += spaceObject.points;
            }
            else {
                spaceObject.action();
                spaceObject.draw(ctx);
            }
        });
    }

    generate () {
        if (this.newOn == frame) {
            if (this.limit > 0) {
                let numToGenerate = Math.floor(Math.random() * (this.perTime + 1)); // from 0 to this.perTime
                numToGenerate = (this.limit - numToGenerate >= 0) ? numToGenerate : this.limit;
                if (numToGenerate != 0) {
                    const newObjectsToGenerate = [];
                    for (let i = 0; i < numToGenerate; i++) {
                        if (!newObjectsToGenerate[i]) {
                            const whatToGenerateNum = Math.random();
                            let whatToGenerate;
                            for (const obj of this.objectsToGenerate) {
                                if (obj.from <= whatToGenerateNum && whatToGenerateNum <= obj.to) {
                                    whatToGenerate = obj.type;
                                    break;
                                }
                            }
                            switch (whatToGenerate) {
                                case "asteroid":
                                    newObjectsToGenerate[i] = new Asteroid();
                                    break;

                                case "meteor":
                                    newObjectsToGenerate[i] = new Meteor();
                                    break;

                                case "ufo":
                                    newObjectsToGenerate[i] = new Ufo();
                                    break;

                                case "enemy":
                                    newObjectsToGenerate[i] = new Enemy();
                                    break;

                                case "blackHole":
                                    newObjectsToGenerate[i] = new BlackHole();
                                    break;

                                default:
                                    newObjectsToGenerate[i] = new Asteroid();
                            }
                        }
                        newObjectsToGenerate[i].setX(Math.floor(Math.random() * (canvasWidth - newObjectsToGenerate[i].w)));
                        let touch = false;
                        for (let j = 0; j < i; j++) {
                            if (i != j &&
                                ((newObjectsToGenerate[j].x - newObjectsToGenerate[j].w / 2 <= newObjectsToGenerate[i].x
                                    && newObjectsToGenerate[i].x <= newObjectsToGenerate[j].x + 1.5 * newObjectsToGenerate[j].w
                                )
                                ||
                                (newObjectsToGenerate[j].x - newObjectsToGenerate[j].w / 2 <= newObjectsToGenerate[i].x + newObjectsToGenerate[i].w
                                    && newObjectsToGenerate[i].x + newObjectsToGenerate[i].w <= newObjectsToGenerate[j].x + 1.5 * newObjectsToGenerate[j].w
                                ))
                            ) {
                                i--;
                                touch = true;
                                break;
                            }
                        }

                        if (!touch) {
                            this.objects.push(newObjectsToGenerate[i]);
                            this.limit--;
                        }
                    }
                }
            }
            this.newOn += Math.floor(Math.random() * 40 + 40);
        }
    }

    crashDetection (threat) {
        let crash = false;
        space.objects.forEach((spaceObject, index, object) => {
            if (spaceObject.state == "crashed") {
                spaceObject.state = "remove";
            }
            else if (spaceObject.state == "killed") {
                if (spaceObject.pointsForKill === 1) score += spaceObject.points;
                spaceObject.state = "remove";
            }
            else if (spaceObject.state == "remove") {
                object.splice(index, 1);
                space.limit++;
            }
            else if (
                (spaceObject.x < threat.x + threat.w && threat.x < spaceObject.x + spaceObject.w)
                &&
                (spaceObject.y < threat.y + threat.h && threat.y < spaceObject.y + spaceObject.h)
            ) {
                if (threat.type === "shuttle") {
                    if (spaceObject.img) {
                        spaceObject.img.setAttribute("src", "./images/star.png")
                        spaceObject.state = "crashed";
                    }
                    else {
                        object.splice(index, 1);
                    }
                }
                else if (threat.type === "weapon" && spaceObject.lives) {
                    spaceObject.lives -= threat.demage;
                    if (spaceObject.lives <= 0) {
                        spaceObject.img.setAttribute("src", "./images/star.png")
                        spaceObject.state = "killed";
                    }
                }

                crash = true;
            }
        });
        return crash;
    }
}

class SpaceObject {
    constructor (w, h) {
        this.img = document.createElement("img");
        this.w = w;
        this.h = h;
        this.y = - this.h;
        this.speed = 1;
        this.lives = 1;
        this.points = 1;
        this.pointsForKill = Math.floor(Math.random() * 2);
        this.limitUse = 1;
    }

    setX (x) {
        this.x = x;
    }

    removeConditions () {
        if (this.y > canvasHeight + this.h) return true;
    }

    action () {
        this.y += gameSpeed * delta * 100 * this.speed;
    }

    draw (ctx) {
        ctx.beginPath();
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        ctx.closePath();
    }
}

class Asteroid extends SpaceObject {
    constructor () {
        super(32, 32);
        this.img.setAttribute("src", "./images/asteroid.png");
    }
}

class Meteor extends SpaceObject {
    constructor () {
        super(22, 64);
        this.img.setAttribute("src", "./images/meteor.png");
        this.speed = 2;
        this.lives = 2;
        this.points = 2;
    }
}

class Ufo extends SpaceObject {
    constructor () {
        super(64, 36);
        this.img.setAttribute("src", "./images/ufo.png");
        this.lives = Math.floor(Math.random() * 5 + 1);
        this.points = Math.floor(Math.random() * 5 + 1);
        this.pointsForKill = 1;
    }

    action () {
        const movement = gameSpeed * delta * 50 * this.speed;

        if (this.y < 0) {
            this.y += movement;
            this.VerticalMoveToSteps = 0;
        }
        else if (this.y > this.h * 3) {
            this.y -= movement;
            this.VerticalMoveToSteps = 0;
        }
        else {
            if (this.VerticalMoveTo == "top" && this.VerticalMoveToSteps > 0) {
                this.y -= movement;
                this.VerticalMoveToSteps--;
            }
            else if (this.VerticalMoveTo == "bottom" && this.VerticalMoveToSteps > 0) {
                this.y += movement;
                this.VerticalMoveToSteps--;
            }
            else {
                this.VerticalMoveTo = (Math.floor(Math.random() * 2)) ? "top" : "bottom";
                this.VerticalMoveToSteps = 30;
            }
        }

        if (this.x < 0) {
            this.x += movement;
            this.horizontalMoveToSteps = 0;
        }
        else if (this.x + this.w > canvasHeight) {
            this.x -= movement;
            this.horizontalMoveToSteps = 0;
        }
        else {
            if (this.horizontalMoveTo == "left" && this.horizontalMoveToSteps > 0) {
                this.x -= movement;
                this.horizontalMoveToSteps--;
            }
            else if (this.horizontalMoveTo == "right" && this.horizontalMoveToSteps > 0) {
                this.x += movement;
                this.horizontalMoveToSteps--;
            }
            else {
                this.horizontalMoveTo = (Math.floor(Math.random() * 2)) ? "left" : "right";
                this.horizontalMoveToSteps = 30;
            }
        }
    }
}

class Enemy extends SpaceObject {
    constructor () {
        super(46, 64);
        this.img.setAttribute("src", "./images/enemy_shuttle.png");
        this.lives = 3;
        this.points = 4;
        this.pointsForKill = 1;
    }

    action () {
        const movement = gameSpeed * delta * 50 * this.speed;

        if (this.y < 10) {
            this.y += movement;
            this.VerticalMoveToSteps = 0;
        }

        if (this.x < 0) {
            this.x += movement;
            this.horizontalMoveToSteps = 0;
        }
        else if (this.x + this.w > canvasHeight) {
            this.x -= movement;
            this.horizontalMoveToSteps = 0;
        }
        else {
            if (this.horizontalMoveTo == "left" && this.horizontalMoveToSteps > 0) {
                this.x -= movement;
                this.horizontalMoveToSteps--;
            }
            else if (this.horizontalMoveTo == "right" && this.horizontalMoveToSteps > 0) {
                this.x += movement;
                this.horizontalMoveToSteps--;
            }
            else {
                this.horizontalMoveTo = (Math.floor(Math.random() * 2)) ? "left" : "right";
                this.horizontalMoveToSteps = 50;
            }
        }

        if (Math.random() > 0.99) {
            const x = this.x + this.w / 2;
            const y = this.y + this.h;
            space.objects.push(new Bluster(x, y, "down", "#f00"));
        }
    }
}

class BlackHole extends SpaceObject {
    constructor () {
        super(64, 64);
        this.img.setAttribute("src", "./images/black_hole.png");
    }
}