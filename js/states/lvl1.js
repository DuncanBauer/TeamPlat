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
		
		this.player = new Player(this.game, 'player_atlas', 'player_1', 32, 2300, this.world);
		this.game.add.existing(this.player);
		this.world.retreivePlayer(this.player);

		// Create camera and lock it to the player with mario-esque deadzone
		this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.75, 0.75);		
		this.game.camera.deadzone = new Phaser.Rectangle(400, 250, 200, 70);

		/*		
		this.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.pause, this);
		this.pauseFollow = this.game.add.sprite(0,0,null);

		this.game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(this.pauseUp, this);
		this.game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(this.pauseRight, this);
		this.game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(this.pauseDown, this);
		this.game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(this.pauseLeft, this);
		*/
	},
	
	pause: function() {
		if(this.game.paused) {
			this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.75, 0.75);
			this.game.camera.deadzone = new Phaser.Rectangle(400, 250, 200, 70);
			this.game.paused = false;
		}
		else {
			this.pauseFollow.x = this.player.x;
			this.pauseFollow.y = this.player.y;
			this.game.camera.follow(this.pauseFollow, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.75, 0.75);
			this.game.camera.deadzone = new Phaser.Rectangle(400, 250, 200, 70);
			this.game.paused = true;
		}
	},
	
	pauseUp: function() {
		console.log("this");
		this.game.paused = false;
		this.pauseFollow.y -= 1;
		this.game.paused = true;
	},
	
	pauseDown: function() {
		console.log("this");
		this.game.paused = false;
		this.pauseFollow.y += 1;
		this.game.paused = true;
	},
	
	pauseRight: function() {
		console.log("this");
		this.game.paused = false;
		this.pauseFollow.x -= 1;
		this.game.paused = true;
	},
	
	pauseLeft: function() {
		console.log("this");
		this.game.paused = false;
		this.pauseFollow.x += 1;
		this.game.paused = true;
	},
	
	render: function() {
/*		this.game.debug.cameraInfo(this.game.camera, 32, 32);
		this.game.debug.body(this.player);
		
		for(let i = 0; i < this.world.enemies.length; i++) {
			this.game.debug.body(this.world.enemies.children[i].killBox);
			this.game.debug.body(this.world.enemies.children[i].hitBox1);
			this.game.debug.body(this.world.enemies.children[i].hitBox2);
		}
		
		this.game.debug.body(this.world.absBottom);
*/
	},
	
	update:function() {	
		this.game.physics.arcade.overlap(this.player, this.world.absBottom, null, this.player.respawn, this.player);
	},
	
	// End the game and return to the main menu
	endGame: function(end) {
		console.log('Game: endGame');
		
		// Return to MainMenu state
		this.game.state.start('MainMenu');
	}
}
