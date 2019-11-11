const notify = new Notify();
const nav = new Nav();
const bac = new BAC();
const night_mode = new NightMode();

window.onload = () => {
    nav.init();
    notify.init();
    bac.init();
    night_mode.init();

    let welcome_text = "<h2>Hello!</h2>";
    welcome_text += "<p>Choose what you are want in menu, play and get fun!</p>";
    welcome_text += "<p>If you dont know how to play, just read the rules</p>";
    notify.show_notify("info", welcome_text);
};