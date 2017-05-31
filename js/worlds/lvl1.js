var Game = function(game) {
};
Game.prototype = {	
	create: function() {
		console.log('Game: create');

		// Sets the physics system to arcade
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.setBoundsToWorld();
		this.game.time.advancedTiming = true;
		
		// Start music
		this.bg_music = this.game.add.audio('bg_music');
		this.bg_music.loopFull();
		this.game.sound.play(this.bg_music);
		
		// BACKGROUND FIRST BECAUSE LAYERS AND SHIT
		// Set Game background and adjust size
		this.bkgd = this.add.sprite(0, 0, 'background00');
		this.bkgd.height = 600;
		this.bkgd.width = 1000;	
		this.bkgd.fixedToCamera = true;

		// Set world bounds
		this.game.world.setBounds(0, 0, 3600, 3600);

		// Create world
		this.world = new World(this.game);
		
		//this.player = new Player(this.game, 'player_atlas', 'player_1', 32, 2300, this.world);
		this.player = new Player(this.game, 'player_atlas', 'player_1', this.game.width/2 - 100, this.game.height/2, this.world);
		this.game.add.existing(this.player);
		this.world.retreivePlayer(this.player);

		/* Create a checkpoint*/
		/*this.checktest = new Checkpoint(this.game, 'player_test', this.player, this.player.x-100, this.player.y+100);
		this.game.add.existing(this.checktest);*/

		// Create camera and lock it to the player with mario-esque deadzone
		this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.75, 0.75);		
		this.game.camera.deadzone = new Phaser.Rectangle(400, 250, 200, 70);
	},
	
	update:function() {	
	},
	
	// End the game and return to the main menu
	endGame: function(end) {
		console.log('Game: endGame');
		
		// Return to MainMenu state
		this.game.state.start('MainMenu');
	},

	render: function() {
		/*
		this.game.debug.cameraInfo(this.game.camera, 32, 32);
		this.game.debug.body(this.world.enemies.children[0]); 	
		this.game.debug.body(this.world.enemies.children[0].box); 	
		this.game.debug.body(this.world.enemies.children[0].killBox);
		this.game.debug.body(this.world.enemies.children[1]); 	
		this.game.debug.body(this.world.enemies.children[1].box); 	
		this.game.debug.body(this.world.enemies.children[1].killBox); 	
		this.game.debug.body(this.player);
		*/
	}
}
