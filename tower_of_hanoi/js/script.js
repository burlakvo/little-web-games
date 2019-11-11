let $from_tower, start_tower;
const blocks_num = 3;
const nav = new Nav();
const notify = new Notify();
const night_mode = new NightMode();

const start_new_game = () => {
    const $game_section = document.getElementById("game_section");
    const $tower_blocks = $game_section.querySelectorAll(".tower_block");
    $tower_blocks.forEach($tower_block => {
        $tower_block.remove();
    });
    start_tower.create_blocks(blocks_num);
};

window.onload = () => {
    nav.init();
    notify.init();
    night_mode.init();

    const $towers = document.querySelectorAll(".tower");
    $towers.forEach($tower => {
        const tower = new Tower();
        tower.init($tower);
        if ($tower.classList.contains("tower_start")) {
            start_tower = tower;
        }
    });

    const $new_game_button = document.getElementById("new_game");
    $new_game_button.addEventListener("click", start_new_game);
};