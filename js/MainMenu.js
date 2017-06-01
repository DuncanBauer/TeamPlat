var MainMenu = function(game) {};
MainMenu.prototype = {
	
	create: function() {
		console.log('MainMenu: create');
		
		// Set Main menu background and adjust size
		this.bkgd = this.game.add.sprite(0, 0, 'background00');
		this.bkgd.height = 600;
		this.bkgd.width = 1000;
		
		// Create buttons for main menu
		this.buttons = this.game.add.group();
		
		// Create start this.game button
		var button = this.game.add.button(this.game.world.centerX - 150, this.game.world.centerY, 'play_Button', this.playgame, this);
		this.buttons.create(button);
	},
	
	playgame: function() {
		console.log('MainMenu: playthis.game');
		
		// Start this.game state
		this.game.state.start('BossFight');
		//this.game.state.start('Game');
	}
}
