class Nav {
    init () {
        this.$nav_elems = document.querySelectorAll(".nav_elem");
        this.$nav_elems.forEach((elem) => {
            elem.addEventListener("click", () => this.nav_elem_click(elem));
        });
    }

    nav_elem_click (e) {
        const $active_sections = document.querySelectorAll(".section_active");
        $active_sections.forEach(function (elem) {
            elem.classList.remove("section_active");
        });

        const $active_nav = document.querySelectorAll(".nav_elem_active");
        $active_nav.forEach(function (elem) {
            elem.classList.remove("nav_elem_active");
        });

        e.classList.add("nav_elem_active");

        const target = e.dataset["target"];
        document.getElementById(target).classList.add("section_active");
    };
}