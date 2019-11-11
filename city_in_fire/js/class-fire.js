class Fire {
    constructor (time = 5) {
        this.time = time; // max time to make fire in next building
    }

    prometheus () { // bring fire to a random building
        let buildings = document.querySelectorAll(".building:not(.fire)"); // buildings that not in flame
        let buildingsNum = buildings.length;
        if (buildingsNum !== 0) { // if exist buildings without fire
            if (buildingsNum <= street.buildingsNum - 1 && firetruck.onWork === false) { // if 2 or more buildings in fire call to help
                firetruck.goToWork(40);
            }
            else if (buildingsNum > street.buildingsNum - 1) { // when no one house in fire send help to home
                firetruck.goHome();
            }
            let whosNext = Math.ceil(Math.random() * buildingsNum - 1); // -1 for include zero element in array of buildings
            buildings[whosNext].classList.add("fire");
        }
        let whenNext = Math.ceil(Math.random() * this.time) * 1000; // time is max time to make fire in next building
        setTimeout(() => this.prometheus(), whenNext);
    }
}