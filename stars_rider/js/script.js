// add navigation
const nav = new Nav();
nav.init();

// add night mode
const night_mode = new NightMode();
night_mode.init();

// init canvas
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

// default values
let gameSpeed = 1;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let frame = 0;
let score = 0;
let level = 1;

// space objects
const space = new Space();

// shuttle
const shuttle = new Shuttle();

// lives
const lives = new Live();

// score
function drawScore () {
    const text = score;
    ctx.font = "50px monospace";
    ctx.fillStyle = "rgba(100,100,255,0.2)";
    ctx.fillText(text, canvas.width / 2 - ctx.measureText(text).width / 2, canvas.height / 2 + 25);
}

// level
const levels = {
    1: {
        "toNext": 1
    },
    2: {
        "toNext": 5
    },
    3: {
        "toNext": 13
    },
    4: {
        "toNext": 25
    },
    5: {
        "toNext": 41,
        "addNewObjects": "meteor"
    },
    6: {
        "toNext": 61,
        "increaseGameSpeed": true
    },
    7: {
        "toNext": 85
    },
    8: {
        "toNext": 113,
        "addWeapon": "bluster"
    },
    9: {
        "toNext": 145,
        "increaseSpaceObjectsLimit": true
    },
    10: {
        "toNext": 181,
        "increaseSpaceObjectsPerTime": true
    },
    11: {
        "toNext": 221
    },
    12: {
        "toNext": 265,
        "increaseGameSpeed": true
    },
    13: {
        "toNext": 313
    },
    14: {
        "toNext": 365
    },
    15: {
        "toNext": 421
    },
    16: {
        "toNext": 481
    },
    17: {
        "toNext": 545
    },
    18: {
        "toNext": 613,
        "increaseGameSpeed": true,
        "increaseSpaceObjectsLimit": true
    },
    19: {
        "toNext": 685
    },
    20: {
        "toNext": 761,
        "increaseSpaceObjectsPerTime": true,
        "addNewObjects": "ufo"
    },
    21: {
        "toNext": 841
    },
    22: {
        "toNext": 925
    },
    23: {
        "toNext": 1013
    },
    24: {
        "toNext": 1105,
        "increaseGameSpeed": true
    },
    25: {
        "toNext": 1201
    },
    26: {
        "toNext": 1301
    },
    27: {
        "toNext": 1405,
        "increaseSpaceObjectsLimit": true
    },
    28: {
        "toNext": 1513
    },
    29: {
        "toNext": 1625
    },
    30: {
        "toNext": 1741,
        "increaseGameSpeed": true,
        "increaseSpaceObjectsPerTime": true,
        "addWeapon": "rocket"
    },
    31: {
        "toNext": 1861
    },
    32: {
        "toNext": 1985
    },
    33: {
        "toNext": 2113
    },
    34: {
        "toNext": 2245
    },
    35: {
        "toNext": 2381
    },
    36: {
        "toNext": 2521,
        "increaseGameSpeed": true,
        "increaseSpaceObjectsLimit": true
    },
    37: {
        "toNext": 2665
    },
    38: {
        "toNext": 2813
    },
    39: {
        "toNext": 2965
    },
    40: {
        "toNext": 3121,
        "increaseSpaceObjectsPerTime": true
    },
    41: {
        "toNext": 3281
    },
    42: {
        "toNext": 3445,
        "increaseGameSpeed": true
    },
    43: {
        "toNext": 3613
    },
    44: {
        "toNext": 3785
    },
    45: {
        "toNext": 3961,
        "increaseSpaceObjectsLimit": true,
        "addNewObjects": "enemy"
    },
    46: {
        "toNext": 4141
    },
    47: {
        "toNext": 4325
    },
    48: {
        "toNext": 4513,
        "increaseGameSpeed": true
    },
    49: {
        "toNext": 4705
    },
    50: {
        "toNext": 4901,
        "increaseSpaceObjectsPerTime": true
    },
    51: {
        "toNext": 5101
    },
    52: {
        "toNext": 5305
    },
    53: {
        "toNext": 5513
    },
    54: {
        "toNext": 5725,
        "increaseGameSpeed": true,
        "increaseSpaceObjectsLimit": true
    },
    55: {
        "toNext": 5941
    },
    56: {
        "toNext": 6161
    },
    57: {
        "toNext": 6385
    },
    58: {
        "toNext": 6613
    },
    59: {
        "toNext": 6845
    },
    60: {
        "toNext": 7081,
        "increaseGameSpeed": true,
        "increaseSpaceObjectsPerTime": true
    },
    61: {
        "toNext": 7321
    },
    62: {
        "toNext": 7565
    },
    63: {
        "toNext": 7813,
        "increaseSpaceObjectsLimit": true
    },
    64: {
        "toNext": 8065
    },
    65: {
        "toNext": 8321
    },
    66: {
        "toNext": 8581,
        "increaseGameSpeed": true
    },
    67: {
        "toNext": 8845
    },
    68: {
        "toNext": 9113
    },
    69: {
        "toNext": 9385
    },
    70: {
        "toNext": 9661,
        "increaseSpaceObjectsPerTime": true,
        "addNewObjects": "blackHole"
    },
    71: {
        "toNext": 9941
    },
    72: {
        "toNext": 10225,
        "increaseGameSpeed": true,
        "increaseSpaceObjectsLimit": true
    },
    73: {
        "toNext": 10513
    },
    74: {
        "toNext": 10805
    },
    75: {
        "toNext": 11101
    },
    76: {
        "toNext": 11401
    },
    77: {
        "toNext": 11705
    },
    78: {
        "toNext": 12013,
        "increaseGameSpeed": true
    },
    79: {
        "toNext": 12325
    },
    80: {
        "toNext": 12641,
        "increaseSpaceObjectsPerTime": true
    }
};

function checkLevel () {
    for (let [lvl, data] of Object.entries(levels)) {
        if (score >= data.toNext && level == lvl) {
            level++;
            console.log("you got level " + level);
            data = levels[level];
            if (data.increaseGameSpeed) gameSpeed *= 1.1;
            if (data.increaseSpaceObjectsLimit) space.limit++;
            if (data.increaseSpaceObjectsPerTime) space.perTime++;
            if (data.addNewObjects) {
                switch (data.addNewObjects) {
                    case "meteor":
                        space.objectsToGenerate.push({
                            "type": "meteor",
                            "from": 0.6,
                            "to": 0.8
                        });
                        break;
                    case "ufo":
                        space.objectsToGenerate.push({
                            "type": "ufo",
                            "from": 0.8,
                            "to": 0.9
                        });
                        break;
                    case "enemy":
                        space.objectsToGenerate.push({
                            "type": "enemy",
                            "from": 0.94,
                            "to": 0.98
                        });
                        break;
                    case "blackHole":
                        space.objectsToGenerate.push({
                            "type": "blackHole",
                            "from": 0.98,
                            "to": 1
                        });
                        break;
                }
            }
            if (data.addWeapon) {
                switch (data.addWeapon) {
                    case "bluster":
                        shuttle.addWeapon(data.addWeapon);
                        break;

                    case "rocket":
                        shuttle.addWeapon(data.addWeapon);
                        break;
                }
            }
        }
    }
}

function drawGameInfo () {
    const text = [];

    text.push("Level: " + level);
    if (shuttle.weapons.bluster) text.push("Bluster: \u221e");
    if (shuttle.weapons.rocket) text.push("Rockets: " + shuttle.weapons.rocket.num);

    ctx.font = "16px monospace";
    ctx.fillStyle = "rgba(170,170,170,0.5)";
    for(let i = 0; i < text.length; i++) {
        ctx.fillText(text[i], 10, (10 + 16) * (i + 1));
    }
}

// render
let lastTime = (new Date()).getTime();
let currTime = 0;
let delta;

function draw () {
    currTime = (new Date()).getTime();
    delta = (currTime-lastTime)/1000;
    //if (delta > 0.2) requestAnimationFrame(draw);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (space.crashDetection(shuttle)) lives.num--;
    shuttle.weapons.running.forEach(weapon => {
        if (space.crashDetection(weapon)) weapon.achieveTarget();
    });

    checkLevel();
    drawGameInfo();
    drawScore();
    lives.draw(ctx);

    shuttle.fire();
    shuttle.drawWeapons(delta, ctx);
    shuttle.move(delta);
    shuttle.draw(ctx);

    space.generate();
    space.draw(ctx);

    frame++;

    lastTime = currTime;
    if (lives.num > 0) requestAnimationFrame(draw);
}

draw();