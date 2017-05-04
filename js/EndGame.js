var EndGame = function(game, score, highscore) {};
EndGame.prototype = {
	
	create: function() {
		console.log('MainMenu: create');
		
		// Set Main menu background and adjust size
		this.bkgd = this.game.add.sprite(0, 0, 'background00');
		this.bkgd.height = 600;
		this.bkgd.width = 1000;
		
		// Create buttons for main menu
		this.buttons = this.game.add.group();
		
		// Create start this.game button
		var button = this.game.add.button(this.game.world.centerX - 150, this.game.world.centerY, 'play_Button', this.playthis.game, this);
		this.buttons.create(button);
		
		// Updates highscore
		if(score > highscore) {
			highscore = score;
		}
		
		// Displays scores at the this.game over screen
		var high = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, 'High Score: ' + Math.floor(highscore));
		high.position.x = 500 - (high.width/2)
		var s = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 50, 'Score: ' + Math.floor(score));
		s.position.x = 500 - (s.width/2);
	},
	
	playgame: function() {
		console.log('MainMenu: playthis.game');
		// Resets score
		score = 0;
		
		// Start this.game state
		this.game.state.start('Game');
	}
}
