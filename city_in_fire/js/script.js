const nav = new Nav();

const fireman = new Fireman;
const firetruck = new Fireman;
const fire = new Fire(5);
const street = new Street;

window.onload = () => {

	fireman.init("fireman", "fireman");
	firetruck.init("firetruck", "firetruck");
	street.init("street");
	
	for (let n = 0, buildingNum = 30; n < buildingNum; n++) { // create & add buildings to street
		street.build(n);
	}

	fireman.goToWork(50);
	fire.prometheus();

	nav.init();
};