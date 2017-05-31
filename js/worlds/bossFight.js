var BossFight = function(game) {
};
BossFight.prototype = {	
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
		this.game.world.setBounds(0, 0, 2000, 2600);

		// Create world
		this.world = new BossRoom(this.game);
		
		this.player = new Player(this.game, 'player_atlas', 'player_1', 32, 2000, this.world);
		this.game.add.existing(this.player);
		this.world.retreivePlayer(this.player);

		// Create camera and lock it to the player with mario-esque deadzone
		this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.75, 0.75);		
		this.game.camera.deadzone = new Phaser.Rectangle(400, 250, 200, 70);
	},
	
	update:function() {	
		this.game.physics.arcade.overlap(this.player.weapon.bullets, this.world.minions, this.minionHit, null, this)
	},
	
	minionHit: function(bullet, minion) {
		if(this.game.physics.arcade.overlap(bullet, minion.killBox)) {
			minion.kills();
			bullet.kill();
			this.game.time.events.add(1, this.world.killMinion, this.world);
		}
	},
	
	render: function() {
		this.game.debug.cameraInfo(this.game.camera, 32, 32);
		/*
		var i = null;
		for(i = 0; i < this.world.enemies.children.length; i+=1) {
			this.game.debug.body(this.world.enemies.children[i]); 	
			this.game.debug.body(this.world.enemies.children[i].box);
			this.game.debug.body(this.world.enemies.children[i].killBox);
		}
		for(i = 0; i < this.world.minions.children.length; i+=1) {
			this.game.debug.body(this.world.minions.children[i]); 	
			this.game.debug.body(this.world.minions.children[i].box);
			this.game.debug.body(this.world.minions.children[i].killBox);
		}
		this.game.debug.body(this.player);
		*/
	},
	
	// End the game and return to the main menu
	endGame: function(end) {
		console.log('Game: endGame');
		
		// Return to MainMenu state
		this.game.state.start('MainMenu');
	}
}
