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

$('#buttonAdd').on('click', function () {
	var playerName = $('#playerName').val();
	$('<div></div>').appendTo('.player-roster').addClass('player-card').on('click', function () {
		$(this).toggleClass('selected');
	});
	$.getJSON(apiUrl, function (data) {
		var players = data.body.players;
		players.forEach(function (player) {
			if (player.fullname === playerName) {
				addToRoster('h3','PlayerName',player.fullname,'div .player-card:last-child')
				$(document.createElement('img')).attr('src', player.photo).fadeIn('500').appendTo('div .player-card:last-child');
				addToRoster('h3', 'PlayerPosition', player.position, 'div .player-card:last-child');
				addToRoster('h3', 'PlayerNumber', '#' + player.jersey, 'div .player-card:last-child');
			}

		});
	})
	$('#playerName, #playerPosition, #playerNumber').val('');
});

$('#buttonRemove').on('click', function () {
	$('.selected').fadeOut('slow');
});

$.getJSON(apiUrl, function (data) {
	var players = data.body.players;
	var playerArr = [];
	players.forEach(function (player) {
		playerArr.push(player.fullname);
	});
	$("#playerName").autocomplete({
		source: playerArr
	});
});