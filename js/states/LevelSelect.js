var LevelSelect = function(game) {};
LevelSelect.prototype = {
	
	create: function() {
		console.log('MainMenu: create');
		
		// Set Main menu background and adjust size
		this.bkgd = this.game.add.sprite(0, 0, 'background00');
		this.bkgd.height = 600;
		this.bkgd.width = 1000;
		
		// Create buttons for main menu
		this.buttons = this.game.add.group();
		
		// Create start this.game button
		var button = this.game.add.button(this.game.world.centerX - 100, 10, 'lvlbutton', this.playgame, this);
		var btext = this.game.add.text(this.game.world.centerX + 10, 90, "Level 1", {fontSize: '32px', fill: '#fff'});
		this.buttons.create(button);
	},
	
	playgame: function() {
		console.log('LevelSelect: playthis.game');
		
		// Start game state
		//this.game.state.start('BossFight');
		this.game.state.start('Game');
	}
}