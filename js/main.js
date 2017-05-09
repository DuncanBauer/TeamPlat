var Game = function(game, score) {
};
Game.prototype = {	
	create: function() {
		console.log('Game: create');

		// Sets the physics system to arcade
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.setBoundsToWorld();
		this.game.time.advancedTiming = true;
		
		// Start music
		var bg_music = this.game.add.audio('bg_music');
		bg_music.loopFull();
		this.game.sound.play(bg_music);
		
		// BACKGROUND FIRST BECAUSE LAYERS AND SHIT
		// Set Game background and adjust size
		this.bkgd = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background00');
		this.bkgd.height = 600;
		this.bkgd.width = 1000;	
		
		this.world = new World(this.game);
		this.world.loadFloor();
		
		this.player = new Player(this.game, 'character_atlas', 'WalkLeft_MouthOpen_Purple3', this.game.width/2, this.game.height/2);
		this.game.add.existing(this.player);
	},
	
	update:function() {		
		if(this.game.physics.arcade.collide(this.player, this.world.floor.children)) {
			this.player.touchDown();
			// cancel dash when hitting floor
			if(this.player.dashingDown){
				this.player.dashCancel();
			}
		}
		// cancel dash when hitting world edges
		if((this.player.dashingUp && this.player.body.blocked.up)||
		(this.player.dashingLeft && this.player.body.blocked.left)||
		(this.player.dashingRight && this.player.body.blocked.right)){
			this.player.dashCancel();
		}
	},
	
	// End the this.game and return to the main menu
	endGame: function(end) {
		console.log('Game: endGame');
		this.speed = 5;
		score = 0;
		
		// Return to MainMenu state
		this.game.state.start('MainMenu');
	}
}
