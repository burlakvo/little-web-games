class Fireman {
    constructor () {
        this.targetPos = 0; // position where fireman have to go
        this.score = 0;
    }

    init (id, name) {
        this.is = document.getElementById(id); // get element
        this.currentPos = (this.is.getBoundingClientRect().left + this.is.getBoundingClientRect().right) / 2; // center of fire man
        this.name = name;
    }

    move (direction) { // too logical for describe
        let x = (direction === "left") ? -5 : 5;
        this.is.style.left = parseInt(this.is.style.left) + x + "px";
        this.currentPos += x;
    }

    streetWatch () {
        try {
            let buildingsInFire = document.querySelectorAll(".building.fire");
            if (buildingsInFire.length === 0) {
                throw this.name + ": no one building in fire. I can rest a little!";
            }
            let closer = {}; // object for keep closer building in fire to fireman
            // find target
            buildingsInFire.forEach((item) => {
                let buildingInFirePos = item.getBoundingClientRect();
                buildingInFirePos = (buildingInFirePos.left + buildingInFirePos.right) / 2; // center of building
                if (closer.pos === undefined || Math.abs(buildingInFirePos - this.currentPos) < Math.abs(closer.pos - this.currentPos)) {
                    closer.pos = buildingInFirePos;
                    closer.val = item.getAttribute("buildingNumber");
                }
            });
            // set target
            if (this.targetPos === 0 || Math.abs(closer.pos - this.currentPos) < Math.abs(this.targetPos - this.currentPos)) { // if we don't have target or new target closer than current
                this.targetPos = closer.pos;
                this.targetVal = closer.val;
            }
            // think about other
            if (!document.querySelector(".building[buildingNumber='" + this.targetVal + "']").classList.contains("fire")){
                throw this.name + ": target has not any fire"
            }
            // move fireman
            if (this.currentPos >= (this.targetPos - 10) && this.currentPos <= (this.targetPos + 10)) { // if fireman touch target
                let building = document.querySelector(".building[buildingNumber='" + this.targetVal + "']");
                building.classList.remove("fire");
                console.log(this.name + ": got it!");
                this.targetPos = 0;
                this.score++;
                this.is.parentElement.querySelector(".score").innerHTML = "score is " + this.score;
            }
            else if (this.currentPos > this.targetPos) { // if target to the left of fireman
                this.move("left");
            }
            else if (this.currentPos < this.targetPos) { // if fireman to the left of target
                this.move("right");
            }
        }
        catch (e) {
            console.log(e);
            this.targetPos = 0;
        }
    }

    goToWork (speed) {
        this.onWork = true;
        this.interval = setInterval(() => this.streetWatch(), speed);
    }

    goHome () {
        this.onWork = false;
        clearInterval(this.interval);
        console.log(this.name + ": go home");
    }

}