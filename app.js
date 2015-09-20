var Player = function (name, position, num) {
	this.name = name;
	this.position = position;
	this.num = num;
}
function addToRoster(element, classAdd, text, append) {
	$(document.createElement(element)).addClass(classAdd).text(text).appendTo(append);
}
var url = "http://bcw-getter.herokuapp.com/?url=";
var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
var apiUrl = url + encodeURIComponent(url2);
var playerPhotos = [];
var playerNames = [];
$.getJSON(apiUrl, function (data) {
	var players = data.body.players;
	players.forEach(function (player) {
		playerNames.push(player.fullname);
		playerPhotos.push(players.photo);
	});
	$("#playerName").autocomplete({
		source: playerNames
	});
});

$('#buttonAdd').on('click', function () {
	var playerName = $('#playerName').val();
	$('<div></div>').appendTo('.player-roster').addClass('player-card').on('click', function () {
		$(this).toggleClass('selected');
	});
	for (var i = 0; i < playerNames.length; i++) {
		if (playerNames[i] === playerName) {
			addToRoster('h3', 'PlayerName', playerNames[i], 'div .player-card:last-child')
			$(document.createElement('img')).attr('src', playerPhotos[i]).fadeIn('500').appendTo('div .player-card:last-child');
		}

	};
	$('#playerName, #playerPosition, #playerNumber').val('');
});

$('#buttonRemove').on('click', function () {
	$('.selected').fadeOut('slow');
});

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