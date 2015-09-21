function addToRoster(element, classAdd, text, append) {
	$(document.createElement(element)).addClass(classAdd).text(text).appendTo(append);
}
var url = "http://bcw-getter.herokuapp.com/?url=";
var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
var apiUrl = url + encodeURIComponent(url2);
var players = {};
​
//pass True if you want to force a reload of the data from the API.
function loadPlayerData(forceReload) {
	var cache = JSON.parse(localStorage.getItem("playerData"));
	if (cache && !forceReload) {
		players = cache;
	} else {
		$.getJSON(apiUrl, function (data) {
			players = data.body.players;
			localStorage.setItem("playerData", JSON.stringify(players));
			$("#playerName").autocomplete({
				source: players.fullname
			});
		});
	}
}

loadPlayerData();
// Old code
// $.getJSON(apiUrl, function (data) {
// 	var players = data.body.players;
// 	players.forEach(function (player) {
// 		playerNames.push(player.fullname);
// 		playerPhotos.push(player.photo);
// 	});
// 	$("#playerName").autocomplete({
// 		source: playerNames
// 	});
// });

$('#buttonAdd').on('click', function () {
	var playerName = $('#playerName').val();
	$('<div></div>').appendTo('.player-roster').addClass('player-card').on('click', function () {
		$(this).toggleClass('selected');
	});
	for (var i = 0; i < players.length; i++) {
		if (players.fullname[i] === playerName) {
			addToRoster('h3', 'PlayerName', players.fullname[i], 'div .player-card:last-child')
			$(document.createElement('img')).attr('src', players.photo[i]).fadeIn('500').appendTo('div .player-card:last-child');
		}

	};
	$('#playerName, #playerPosition, #playerNumber').val('');
});

$('#buttonRemove').on('click', function () {
	$('.selected').fadeOut('slow');
});

// Old code
// $.getJSON(apiUrl, function (data) {
// 	var players = data.body.players;
// 	var playerArr = [];
// 	players.forEach(function (player) {
// 		playerArr.push(player.fullname);
// 	});
// 	$("#playerName").autocomplete({
// 		source: playerArr
// 	});
// });