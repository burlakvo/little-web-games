class Street {
    init (id) {
        this.geo = document.getElementById(id);
        this.buildingsNum = 0;
    }

    build (n) { // create new building with number n, push it to array onStreet and add it to DOM
        let building = new Building;
        this.geo.appendChild(building.init(n));
        this.buildingsNum++;
    }
}