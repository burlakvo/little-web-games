class NightMode {
    init () {
        const $night_mode_button = document.getElementById("night_mode");
        $night_mode_button.addEventListener("click", () => document.querySelector("body").classList.toggle("night"));
    }
}
