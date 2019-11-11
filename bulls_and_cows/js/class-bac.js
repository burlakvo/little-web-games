class BAC {
    init = () => {
        this.numbers = {};

        this.new_buttons = {
            "guess": {"$object": document.getElementById("guess_new_button")},
            "self": {"$object": document.getElementById("self_new_button")}
        };

        this.try_buttons = {
            "guess": {"$object": document.getElementById("guess_try_button")},
            "self": {"$object": document.getElementById("self_try_button")}
        };

        this.try_inputs = {
            "guess": {"$object": document.getElementById("guess_try_input")},
            "self": {"$object": document.getElementById("self_try_input")}
        };

        this.views = {
            "guess": {"$object": document.querySelector("#guess_section .game_space .game_view")},
            "self": {"$object": document.querySelector("#self_section .game_space .game_view")}
        };

        this.step_objects = {};

        this.step_objects.$wrap = document.createElement("div");
        this.step_objects.$wrap.classList.add("game_step");

        this.step_objects.$images = document.createElement("div");
        this.step_objects.$images.classList.add("game_images");

        this.step_objects.$number = document.createElement("div");
        this.step_objects.$number.classList.add("game_number");

        ["cow", "bull"].forEach(img_name => {
            this.step_objects["$" + img_name] = document.createElement("img");
            this.step_objects["$" + img_name].setAttribute("src", "./images/" + img_name + ".png");
            this.step_objects["$" + img_name].setAttribute("title", img_name);
            this.step_objects["$" + img_name].classList.add("game_image");
        });

        this.new_buttons.guess.$object.addEventListener("click", this.new_buttons.guess.listener = this.start_this.bind(this, "guess"));
        this.new_buttons.self.$object.addEventListener("click", this.new_buttons.self.listener = this.make_this.bind(this, "self"));
    };

    create_step = (bulls, cows, try_number) => {
        const $step = this.step_objects.$wrap.cloneNode(),
            $images = this.step_objects.$images.cloneNode(),
            $number = this.step_objects.$number.cloneNode();

        for (const [key, value] of Object.entries({"bull": bulls, "cow": cows})) {
            for (let i = 0; i < value; i++) {
                $images.append(this.step_objects["$" + key].cloneNode());
            }
        }

        $step.append($images);

        $number.append(try_number);
        $step.append($number);

        return $step;
    };

    check_value = (value) => {
        let error = false;

        if (!/^[0-9]{4}$/.test(value)) {
            error = "put 4 numbers";
        }

        return error;
    };

    do_this = (target) => this.do_step(target);
    make_this = (target) => this.make_number(target);
    start_this = (target) => this.start_new_game(target);

    start_new_game = (target) => {
        this.views[target].$object.innerHTML = "";
        this.try_inputs[target].$object.value = "";

        this.try_buttons[target].$object.removeAttribute("disabled");

        switch (target) {
            case "guess":
                this.try_buttons[target].$object.addEventListener("click", this.try_buttons[target].listener = this.do_this.bind(this, target));
                this.make_number("guess");
                break;
            case "self":
                this.try_buttons[target].$object.classList.add("hidden");
                this.try_buttons[target].$object.removeEventListener("click", this.try_buttons[target].listener);

                this.new_buttons[target].$object.innerText = "Make!";
                this.new_buttons[target].$object.removeEventListener("click", this.new_buttons[target].listener);
                this.new_buttons[target].$object.addEventListener("click", this.new_buttons[target].listener = this.make_this.bind(this, target));

                break;
        }
    };

    do_step = (target) => {
        const try_number = this.try_inputs[target].$object.value;
        const true_number = this.numbers[target];

        const error = this.check_value(try_number);

        if (!error) {
            let cows = 0,
                bulls = 0;
            for (let i = 0; i < 4; i++) {
                let try_digit = try_number[i];
                for (let j = 0; j < 4; j++) {
                    let true_digit = true_number[j];

                    if (try_digit === true_digit && i === j) {
                        bulls++;
                        break;
                    }
                    else if (try_digit === true_digit) {
                        cows++;
                        break;
                    }
                }
            }

            this.views[target].$object.append(this.create_step(bulls, cows, try_number));

            if (bulls === 4) {
                notify.show_notify("success", "you are win!");
                this.try_buttons[target].$object.setAttribute("disabled", "disabled");
                this.try_buttons[target].$object.removeEventListener("click", this.try_buttons[target].listener);
            }
        }
        else {
            notify.show_notify("error", error);
        }

        this.try_inputs[target].$object.value = "";
    };

    make_number = (target) => {
        switch (target) {
            case "guess":
                this.numbers["guess"] = "";
                let i = 0;
                while (i < 4) {
                    const digit = Math.ceil(Math.random() * 9);

                    if (this.numbers["guess"].indexOf(digit) === -1) {
                        this.numbers["guess"] += digit;
                        i++;
                    }
                }
                // console.log("info: " + this.numbers["guess"]);
                break;
            case "self":
                this.try_buttons[target].$object.removeAttribute("disabled");

                this.numbers["self"] = this.try_inputs[target].$object.value;

                const error = this.check_value(this.numbers["self"]);

                if (!error) {
                    this.try_buttons[target].$object.classList.remove("hidden");
                    this.try_buttons[target].$object.addEventListener("click", this.try_buttons[target].listener = this.do_this.bind(this, target));

                    this.new_buttons[target].$object.innerText = "New this";
                    this.new_buttons[target].$object.removeEventListener("click", this.new_buttons[target].listener);
                    this.new_buttons[target].$object.addEventListener("click", this.new_buttons[target].listener = this.start_this.bind(this, target));

                    notify.show_notify("info", "call your friends and let them try to guess your number!");
                }
                else {
                    this.numbers["self"] = "";
                    notify.show_notify("error", error);
                }

                this.try_inputs[target].$object.value = "";

                break;
        }
    };
}