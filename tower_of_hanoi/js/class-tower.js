class Tower {
    constructor () {
        this.colors = [
            "#f1c40f",
            "#3498db",
            "#1abc9c",
            "#9b59b6",
            "#e67e22",
            "#2ecc71",
            "#e74c3c"
        ];
    }

    init ($obj) {
        this.$tower = $obj;
        this.$tower.addEventListener("click", () => this.towerClick());
    }

    towerClick () {
        if (!$from_tower) {
            $from_tower = this.$tower;
        }
        else {
            const $moving_block = $from_tower.querySelector(".tower_block"); // get tower block to move
            const $target_block = this.$tower.querySelector(".tower_block"); // get tower block of target tower

            if ($moving_block) { // if "from" tower has block
                const moving_block_size = parseInt($moving_block.dataset.size);
                const target_block_size =  $target_block ? parseInt($target_block.dataset.size) : 0;

                if (moving_block_size < target_block_size || target_block_size === 0) {
                    this.$tower.prepend($moving_block);

                    if (this.$tower.classList.contains("tower_target")
                        && this.$tower.querySelectorAll(".tower_block").length === blocks_num) {
                        notify.show_notify("success","you win!");
                    }
                }
                else {
                    notify.show_notify("error", "can't to move");
                }
            }
            else {
                notify.show_notify("error", "nothing to move");
            }
            $from_tower = "";
        }
    }

    create_blocks (num) {
        const colors_num = this.colors.length;

        for (let i = num, c = 0; i > 0; i--) {
            const $block = document.createElement("div");
            $block.classList.add("tower_block");
            $block.style.setProperty("--multiplayer", i);
            $block.dataset.size = i;

            $block.style.setProperty("--towerBlockColor", this.colors[c]);
            c = c < colors_num - 1 ? c + 1 : 0;

            this.$tower.prepend($block);
        }
    }
}