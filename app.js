	function addToRoster(element, classAdd, text, append) {
	$(document.createElement(element)).addClass(classAdd).text(text).appendTo(append);
}
var url = "http://bcw-getter.herokuapp.com/?url=";
var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
var apiUrl = url + encodeURIComponent(url2);
var players = {};
var playerNames = [];

function loadPlayerData(forceReload) {
	var cache = JSON.parse(localStorage.getItem("playerData"));
	if (cache && !forceReload) {
		players = cache;
		players.forEach(function (player) {
			playerNames.push(player.fullname);
		})
		$("#playerName").autocomplete({ source: playerNames });
	} else {
		$.getJSON(apiUrl, function (data) {
			players = data.body.players;
			localStorage.setItem("playerData", JSON.stringify(players));
			players.forEach(function (player) {
				playerNames.push(player.fullname);
			})
			$("#playerName").autocomplete({ source: playerNames });
		});
	}
}

loadPlayerData();

$('#buttonAdd').on('click', function () {
	var playerName = $('#playerName').val();
	$('<div></div>').appendTo('.player-roster').addClass('player-card').on('click', function () {
		$(this).toggleClass('selected');
	});

	players.forEach(function (player) {
		if (playerName === player.fullname) {
			addToRoster('h3', 'PlayerName', player.fullname, 'div .player-card:last-child')
			$(document.createElement('img')).attr('src', player.photo).fadeIn('500').appendTo('div .player-card:last-child');
			addToRoster('h3', 'PlayerNumber', '#' + player.jersey, 'div .player-card:last-child');
			addToRoster('h3', 'PlayerPosition', player.position, 'div .player-card:last-child');
		}

	});
	$('#playerName, #playerPosition, #playerNumber').val('');
});

$('#buttonRemove').on('click', function () {
	$('.selected').effect('explode').remove();
});