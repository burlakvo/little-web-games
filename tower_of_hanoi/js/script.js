let $from_tower,
    start_tower,
    blocks_num = 3;
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

const start_comp_game = () => {
    const $game_section = document.getElementById("game_section");
    const $tower_blocks = $game_section.querySelectorAll(".tower_block");
    $tower_blocks.forEach($tower_block => {
        $tower_block.remove();
    });
    start_tower.create_blocks(blocks_num);

    const base = document.getElementsByClassName("tower_start")[0];
    const help = document.getElementsByClassName("tower_help")[0];
    const dest = document.getElementsByClassName("tower_target")[0];
    comp_solving(blocks_num, base, help, dest);
};

let delay = 500,
    step = 0,
    error = false;

const comp_solving = (num, b, h, d) => {
    if (num === 1) { // move from b to d
        setTimeout(() => {
        if (!error) {
            step++;
            console.log("step: " + step + "\nfrom: " + b.dataset.pos + "\nto: " + d.dataset.pos);
            b.click();
            d.click();
        }
        }, delay);
        delay += 500;
    }
    else if (num !== 0) {
        if (!comp_solving(num - 1, b, d, h)) {console.log("error on step #" + step); return false;}
        if (!comp_solving(1, b, h, d)) {console.log("error on step #" + step); return false;}
        if (!comp_solving(num - 1, h, b, d)) {console.log("error on step #" + step); return false;}
    }
    return true;
};

const set_blocks = () => {
    let new_num = document.getElementById("block_num_input").value;
    if (new_num < 1) new_num = 1;
    else if (new_num > 12) new_num = 12;
    blocks_num = parseInt(new_num);
    setTowersSize();
};

const setTowersSize = () => {
    const height = parseInt(blocks_num) + 2;
    const width = parseInt(blocks_num) + 3;
    document.querySelectorAll(".tower").forEach($tower => {
        $tower.style.height = height + "rem";
        $tower.style.width = width + "rem";
    });
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

    set_blocks();

    const $set_blocks_button = document.getElementById("set_blocks");
    $set_blocks_button.addEventListener("click", set_blocks);

    const $new_game_button = document.getElementById("new_game");
    $new_game_button.addEventListener("click", start_new_game);

    const $comp_game_button = document.getElementById("comp_game");
    $comp_game_button.addEventListener("click", start_comp_game);
};