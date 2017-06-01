var Preloader = function(game) {
};
Preloader.prototype = {
	preload: function() {
		console.log('Preloader: preload');
		
		// Set assest path
		this.game.load.path = 'assets';
		
		// Load Images
		// Load MainMenu assets
		this.game.load.image('background00', '/img/background01.png');
		this.game.load.image('play_Button', '/img/play_button.png');
		this.game.load.image('power_Button', '/img/power_Button.png');
		
		// Load this.game assets
		this.game.load.atlas('player_atlas', '/img/player.png', '/img/sprites.json');
		this.game.load.atlas('robobitch_atlas', '/img/robobitch.png', '/img/robobitch.json');
		this.game.load.atlas('tile_atlas', '/img/tiles.png', '/img/tiles.json');
		this.game.load.atlas('coin_atlas', '/img/Coin.png', '/img/coin.json');
		this.game.load.atlas('star_atlas', '/img/star.png', '/img/star.json');
		this.game.load.atlas('platform_atlas', '/img/platforms.png', '/img/platforms.json');
		this.game.load.image('lemon', '/img/lemon.png');
		this.game.load.image('tileShade', '/img/tile_shadow.png');
		this.game.load.spritesheet('checkpoint', '', 100, 100);
		this.game.load.spritesheet('player_test', '/img/Player.png', 123, 164);
		
		// Load Sounds
		this.game.load.audio('bg_music', '/audio/bg_music.ogg');
		this.game.load.audio('player_jump', '/audio/player_jump.ogg');
		this.game.load.audio('pick_up', '/audio/pick_up.ogg');
	},
	
	create: function() {
		console.log('Preloader: create');
		
		// Starts MainMenu state
		this.game.state.start('MainMenu');
	}
}
