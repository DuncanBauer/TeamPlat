var MainMenu = function(game) {};
MainMenu.prototype = {
	init: function() {
		this.game.sound.boot();
	},
	
	create: function() {
		console.log('MainMenu: create');
		
		// Set Main menu background and adjust size
		this.bkgd = this.game.add.sprite(0, 0, 'background00');
		this.bkgd.height = 600;
		this.bkgd.width = 1000;
		
		// Create buttons for main menu
		this.buttons = this.game.add.group();
		
		// Create start this.game button
		var button = this.game.add.button(this.game.world.centerX - 290, this.game.world.centerY - 300, 'title_button', null, this);
		this.buttons.create(button);


		var button = this.game.add.button(this.game.world.centerX - 150, this.game.world.centerY, 'play_Button', this.playgame, this);
		this.buttons.create(button);
		
		this.bg_music = this.game.add.audio('GearUp_bg');
		this.bg_music.loop = true;
		this.bg_music.play();
	},
	
	playgame: function() {
		this.game.state.start('LevelSelect');
	}
}
