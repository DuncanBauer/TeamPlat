var BossFight = function(game) {
};
BossFight.prototype = {	
	create: function() {
		console.log('Game: create');

		// Sets the physics system to arcade
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.setBoundsToWorld();
		this.game.time.advancedTiming = true;
		
		// BACKGROUND FIRST BECAUSE LAYERS AND SHIT
		// Set Game background and adjust size
		this.bkgd = this.add.sprite(0, 0, 'background01');
		this.bkgd.height = 600;
		this.bkgd.width = 1000;	
		this.bkgd.fixedToCamera = true;

		// Set world bounds
		this.game.world.setBounds(0, 0, 2000, 2600);

		// Create world
		this.world = new BossRoom(this.game);
		
		this.player = new Player(this.game, 'player_atlas', 'player_1', 32, 2300, this.world);
		this.player.setLegs(3);
		this.game.add.existing(this.player);

		this.world.retreivePlayer(this.player);

		// Create camera and lock it to the player with mario-esque deadzone
		this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.75, 0.75);		
		this.game.camera.deadzone = new Phaser.Rectangle(400, 400, 200, 70);
		
		this.fightStarted = false;
		this.panning = false;
	},
	
	update:function() {
		
		this.game.physics.arcade.overlap(this.player.weapon.bullets, this.world.minions, this.minionHit, null, this);
		//this.game.physics.arcade.overlap(this.player, this.world.minions, this.contest, null, this);	
		
		if(!this.fightStarted) {
			if(this.game.physics.arcade.overlap(this.player, this.world.startLine) && !this.panning) {
				this.world.bg_music.play();
				this.world.startLine.kill();
				this.panning = true;
				this.game.camera.unfollow();
				
				this.player.animations.play('idle');
				this.player.stopMovement();
				this.player.dashCancel();
				this.game.input.keyboard.enabled = false;
				this.player.leftKey.reset(false);
				this.player.rightKey.reset(false);
				this.player.jumpKey.reset(false);
				this.player.dashKey.reset(false);
				this.player.attackKey.reset(false);
				this.game.input.keyboard.stop();
			}
		}
		
		if(this.panning) {
			this.game.camera.x += 5;
			if(this.game.camera.x >= 990) {
				this.panning = false;
				this.game.time.events.add(Phaser.Timer.SECOND*1, this.world.shakeCamera, this.world);
				this.game.time.events.add(Phaser.Timer.SECOND*1, this.world.boss.children[0].scream, this.world.boss.children[0]);
				this.game.time.events.add(Phaser.Timer.SECOND*1, this.bobbleHead, this);
				this.game.time.events.add(Phaser.Timer.SECOND*4.5, this.stopHead, this);
				this.game.time.events.add(Phaser.Timer.SECOND*6.5, this.startPanBack, this);
			}
		}
		
		if(this.panningBack) {
			this.game.camera.x -= 5;
			if(this.game.camera.x + this.camera.width / 2 <= this.player.x) {
				this.panningBack = false;
				this.game.time.events.add(Phaser.Timer.SECOND*0.1, this.resetCamera, this);
				this.game.time.events.add(Phaser.Timer.SECOND*0.1, function() {
					this.world.boss.children[0].animations.play('idle');
				}, this);
			}
			
			/*
			if(Math.abs(this.game.camera.y - this.player.y) > 5) {
				if(this.game.camera.y > this.player.y) {
					this.game.camera.y -= 5;
				}
				else {
					this.game.camera.y += 5;
				}
			}
			*/
		}
	},
	
	bobbleHead: function() {
		this.world.boss.children[0].animations.play('bobble');
	},

	stopHead: function() {
		this.world.boss.children[0].animations.play('idle');
	},
	
	startPanBack: function() {
		this.panningBack = true;
	},
	
	resetCamera: function() {
		// Create camera and lock it to the player with mario-esque deadzone
		this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.75, 0.75);
		this.game.camera.deadzone = new Phaser.Rectangle(400, 400, 200, 70);

		this.fightStarted = true;
		this.game.input.keyboard.start();
		this.game.input.keyboard.enabled = true;
		this.game.time.events.add(Phaser.Timer.SECOND*1, this.world.boss.children[0].deathAnim, this.world.boss.children[0]);
		//this.game.time.events.add(Phaser.Timer.SECOND*1.7, this.world.boss.children[0].charge, this.world.boss.children[0]);
	},
	
	minionHit: function(bullet, minion) {
		if(this.game.physics.arcade.overlap(bullet, minion.killBox)) {
			if(!minion.spawning){
				this.world.killMinion();
				minion.kills();
				bullet.kill();
		console.log(this.world.minionCount);
			}
		}
	},
	
	contest: function(player, minion) {
		if(player.dashing && minion.alive && !minion.spawning) {
			minion.kills();
			this.world.killMinion();
			console.log(this.world.minionCount);
		}
	},
	
	render: function() {
/*
		this.game.debug.cameraInfo(this.game.camera, 32, 32);
		
		this.game.debug.body(this.player);
		this.game.debug.body(this.player.weapon.bullets);
		
		
		this.game.debug.body(this.world.boss.children[0].chargeBox1);
		this.game.debug.body(this.world.boss.children[0].chargeBox2);
		this.game.debug.body(this.world.boss.children[0].killBox1);
		this.game.debug.body(this.world.boss.children[0].killBox2);
		this.game.debug.body(this.world.boss.children[0].killBox3);
		
		
		this.game.debug.body(this.world.startLine);
		
		this.game.debug.body(this.world.boss.children[0].killBox);
		for(let i = 0; i < this.world.minions.length; i++) {
			//this.game.debug.body(this.world.minions.children[i].weapon);
			this.game.debug.body(this.world.minions.children[i].hitBox1);
			this.game.debug.body(this.world.minions.children[i].hitBox2);
		}
*/	},
	
	// End the game and return to the main menu
	endGame: function(end) {
		console.log('Game: endGame');
		
		// Return to MainMenu state
		this.game.state.start('MainMenu');
	}
}
