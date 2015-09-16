var Player = function (name, position, num) {
	this.name = name;
	this.position = position;
	this.num = num;
}

function addToRoster(element, classAdd, text, append) {
	$(document.createElement(element)).addClass(classAdd).text(text).appendTo(append);
}



$('#buttonAdd').attr('disabled', true);
$(document).ready(function () {
	if ($(this).val().length != 0)
		$('#buttonAdd').attr('disabled', false);
	else
		$('#buttonAdd').attr('disabled', true);
});


$('#buttonAdd').on('click', function () {
	var playerName = $('#playerName').val();
	var playerPosition = $('#playerPosition').val();
	var playerNumber = $('#playerNumber').val();
	var newPlayer = new Player(playerName, playerPosition, playerNumber);
	$('<div></div>').appendTo('.player-roster').addClass('player-card').on('click', function () {
		$(this).toggleClass('selected').animate({ top: '10px' }, 300);
	});
	var dropdownSelector = $('.dropdown-selector').val();
	$(document.createElement('img')).attr('src', 'http://2f13yq12csmv2yraq925m73i.wpengine.netdna-cdn.com/wp-content/uploads/2011/08/boise-state-uga-game.jpg').fadeIn('500').appendTo('div .player-card:last-child');
	addToRoster('h3', 'PlayerName', newPlayer.name, 'div .player-card:last-child')
	$(document.createElement('h3')).addClass('PlayerPosition').appendTo('div .player-card:last-child').append(dropdownSelector)
	addToRoster('h3', 'PlayerNumber', newPlayer.num, 'div .player-card:last-child');
	$('#playerName, #playerPosition, #playerNumber').val('');
});

$('#buttonRemove').on('click', function () {
	$('.selected').fadeOut();
});