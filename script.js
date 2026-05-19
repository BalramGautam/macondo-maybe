console.log("SimpleIdleJSGame.js has been linked!");

ShowDateTime();

const clockInterval = setInterval(ShowDateTime, 1000);

const player = new Player();

const autoclickerTimer = setInterval(() => {
	player.AutoClickerMakeMoney();
}, 100);

const updateAchievementsTimer = setInterval(() => {
	player.updateAchievements();
}, 1000);

const updateBoutiqueTimer = setInterval(() => {
	player.updateBoutique();
}, 2000);

const karuGemsGenerationTimer = setInterval(() => {
	player.generateKaruGem();
}, 600000);

function SaveGame() {

	Swal.fire({
		title: "Are you sure?",
		text: "This will overwrite any previously saved file!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Yes, save the game!"
	}).then((result) => {

		if (result.isConfirmed) {

			const savefile = JSON.stringify(player);

			localStorage.setItem(
				"SimpleIdleJSGame_savefile",
				savefile
			);

			Swal.fire(
				"Saved!",
				`Your game has been saved.
Money: $${Math.round(player.money)}
Autoclickers: ${player.autoclickers}`,
				"success"
			);

			const consoleElement =
				document.getElementById("console");

			consoleElement.value +=
				`\n>> ${player.name} saved the game.`;

			consoleElement.scrollTop =
				consoleElement.scrollHeight;
		}
	});
}

function LoadGame() {

	const loadedfile = localStorage.getItem(
		"SimpleIdleJSGame_savefile"
	);

	if (!loadedfile) {

		Swal.fire(
			"No Save Found",
			"There is no saved game available.",
			"error"
		);

		return;
	}

	const loadedplayer = JSON.parse(loadedfile);

	Swal.fire({
		title: "Are you sure?",
		text:
			`Loading game:
Money: $${Math.round(loadedplayer.money)}
Autoclickers: ${loadedplayer.autoclickers}`,
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Yes, load it!"
	}).then((result) => {

		if (result.isConfirmed) {

			Object.assign(player, loadedplayer);

			player.updateBoutique();
			player.updateAchievements();
			player.updateShop();
			player.UpdateAvatar();
			player.updateStats();
			player.updateTheme();
			player.updateMusicShop();

			document.getElementById("Shop_btn_newavatar").innerHTML =
				`Get New Avatar ($${loadedplayer.newavatarcost})`;

			document.getElementById("namediv").innerHTML =
				`Player: ${loadedplayer.name}`;

			document.getElementById("autoclickerscounter").innerHTML =
				`Autoclickers: ${loadedplayer.autoclickers}`;

			document.getElementById("Shop_btn_autoclicker").innerHTML =
				`Buy Autoclicker ($${Math.round(
					loadedplayer.autoclickercost
				)})`;

			document.getElementById("btn_makemoney").innerHTML =
				`Make Money! ($${loadedplayer.clickpower})`;

			document.getElementById("Shop_btn_clickpower").innerHTML =
				`Upgrade Click Power ($${loadedplayer.clickpowercost})`;

			const consoleElement =
				document.getElementById("console");

			consoleElement.value +=
				`\n>> ${player.name} loaded the game.`;

			consoleElement.scrollTop =
				consoleElement.scrollHeight;

			Swal.fire(
				"Loaded!",
				"Your game has been loaded.",
				"success"
			);
		}
	});
}