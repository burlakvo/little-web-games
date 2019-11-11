class Building {
    init (i) {
        let element = document.createElement("div");
        element.classList.add("building");
        element.setAttribute("buildingNumber", i);
        return element;
    }
}