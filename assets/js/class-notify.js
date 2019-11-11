class Notify {
    init = () => {
        this.$window = document.getElementById("notify_window");
        this.$notify = document.getElementById("notify");

        this.$notify.addEventListener("click", () => this.close_notify());
    }

    show_notify = (type, message) => {
        this.$notify.style.display = "flex";

        this.$window.className = "notify_" + type;
        this.$window.innerHTML = `${message}`;
    }

    close_notify = () => {
        this.$notify.style.display = "none";
    }
}