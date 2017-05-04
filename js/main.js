var Game = function(game, score) {	
	this.newVals = [];
	// Initialize speed and score and platform spawn delay timer
	this.speed = 5;
	this.platTimer = 0;
	this.frameCount = 0;
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
		
		this.player = new Player(this.game, 'character_atlas', 'WalkLeft_MouthOpen_Purple3', this.game.width/2, this.game.height/2);
		this.game.add.existing(this.player);
		
		/*
		// THEN THE CollectibleManager
		this.CollectibleManager = new CollectibleManager(this.game);
		// THEN THE OBSTACLE MANAGE
		this.ObstacleManager = new ObstacleManager(this.game);
		
		var x = 0;
		var y = 600;
		for(i = 0; i < 17; i+=1) {
			this.ObstacleManager.generateFloor(x + (i * 63.4), y-32, 'WaveCandy_', 'tile_atlas');	
		}
		// THEN THE UI MANAGER BECAUSE THAT GOES ON TOP
		this.UIManager = new UIManager(this.game);
		this.UIManager.addTextElement(16,16,'Score:',{fontSize: '32px', fill: '#000'},'score');
		this.UIManager.addTextElement(16,48,'FPS:',{ fontSize: '32px', fill: '#000' },'fps');
		
		// Creates ingame button group
		this.buttons = this.game.add.group();
		// Sets end this.game button
		var button = this.game.add.button(this.game.world.centerX + 350, 0, 'power_Button', this.endGame, this);
		button.scale.setTo(.5,.5);
		this.buttons.create(button);


		
		// Create character, enable physics, and add animations
		this.character = this.game.add.sprite(this.world.centerX - 300, this.world.centerY + 150, 'character_atlas', 'WalkLeft_MouthOpen_Purple3');
		this.game.physics.arcade.enable(this.character);
		this.character.animations.add('walk', Phaser.Animation.generateFrameNames('WalkLeft_MouthOpen_Purple', 1, 3, '', 1), 23, true);
		this.character.animations.add('idle', ['WalkLeft_MouthOpen_Purple3'], 30, false);
		
		// Set scale and physics for character
		this.character.body.collideWorldBounds = true;
		this.character.body.gravity.y = 1000;
		this.character.body.bounce.y = 0.4;
		this.character.anchor.setTo(.5, .5);
		this.character.scale.x = -1;
		this.character.scale.x = this.character.scale.x / 2;
		this.character.scale.y = this.character.scale.y / 2;
		this.character.animations.play('walk');
		
		// Set Character variables
		this.character.jumper = 0;
		this.game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.jump, this);
*/

	},
	
	update:function() {		
/*
		// Scrolls obstacles/collectibles across screen
		this.ObstacleManager.updateObstacles(this.speed);
		this.ObstacleManager.updateFloor(this.speed);
		this.ObstacleManager.updateMobs(this.speed);
		this.CollectibleManager.updateCollectibles(this.speed);

		// CHECK COLLLISION WITH FLOOR
		var hitPlatform = this.game.physics.arcade.collide(this.character, this.ObstacleManager.floor.children);

		// CHECK COLLISION WITH OBSTACLES
		var i = 0;
		var j = 0;
		while(i < this.ObstacleManager.obstacles.children.length) {
			let themp = this.ObstacleManager.obstacles.children[i];
			while(j < themp.children.length) {
				// Checks if the player is above the object
				if(this.game.physics.arcade.overlap(this.character, themp.children[j]) &&
   				 ((this.character.y + this.character.height/2) <= (themp.children[j].y - themp.children[j].height/2) + 5)) {
					if(themp.children[j].typeName != "mud") {
						this.game.physics.arcade.collide(this.character, themp.children[j])	
						hitPlatform = 1;
					}
				}
				j+=1;
			}
			i+=1;
		}
		if(hitPlatform) { 
			this.character.jumper = 0;
		}
	
		var minY = 450;
		var minX = 1100;
		if(this.frameCount >= 120) {
			let rand = this.game.rnd.integerInRange(0,6);
			if(rand == 0) {
				this.ObstacleManager.generateObstacle(minX, minY, 'WaveCandy_', 'plat', this.CollectibleManager);
				this.ObstacleManager.generateObstacle(minX + 300, minY - 100, 'WaveCandy_', 'halfPlat', this.CollectibleManager);
			}
			else if (rand == 1){
				this.ObstacleManager.generateObstacle(minX, minY, 'WaveCandy_', 'solo', this.CollectibleManager);
				this.ObstacleManager.generateObstacle(minX + 300, minY - 100, 'WaveCandy_', 'slope', this.CollectibleManager);
			}
			else if (rand == 2) {
				this.ObstacleManager.generateObstacle(minX, minY, 'WaveCandy_', 'stairs', this.CollectibleManager);
				this.ObstacleManager.generateObstacle(minX + 300, minY - 300, 'WaveCandy_', 'solo', this.CollectibleManager);
			}
			else if (rand == 3) {
				this.ObstacleManager.generateObstacle(minX, minY, 'WaveCandy_', 'stairs', this.CollectibleManager);
			}
			else if (rand == 4){
				this.ObstacleManager.generateObstacle(minX, minY, 'WaveCandy_', 'solo', this.CollectibleManager);
			}
			else if(rand == 5) {
				this.ObstacleManager.generateObstacle(minX, minY, 'WaveCandy_', 'plat', this.CollectibleManager);
			}
			else if(rand == 6) {
				this.ObstacleManager.generateObstacle(minX + 300, minY - 100, 'WaveCandy_', 'halfPlat', this.CollectibleManager);
			}
			this.frameCount = 0;
		}

		// Check Collectibles
		this.game.physics.arcade.overlap(this.character, this.CollectibleManager.collectibles.children, this.collect, null, this);
		
		// Check mobs
		this.game.physics.arcade.overlap(this.character, this.ObstacleManager.mobs.children, this.hit, null, this);

		
		// Sets keyboard listener, listens for arrow keys
		cursors = this.game.input.keyboard.createCursorKeys();
		
		//  Reset the players velocity
		this.character.body.velocity.x = 0;

		// Checks if left arrow key is pressed
		if (cursors.left.isDown) {
			//  Move to the left
			this.character.body.velocity.x = -300;
		}
		// Checks if right arrow key is pressed
		else if (cursors.right.isDown) {
			//  Move to the right
			this.character.body.velocity.x = 300;
		}
		
		score += 0.05;
		this.newVals[0] = (Math.floor(score));
		this.newVals[1] = (Math.floor(this.game.time.fps));
		var keys = this.UIManager.getTextKeys();
		for(i=0; i < this.UIManager.uiTextElements.children.length; i+=1) {
			this.UIManager.updateTextElement(keys[i], this.newVals[i]);
		}
		for(i=0; i < this.newVals.length; i+=1) {
			this.newVals.pop();
		}
	},
	
	jump: function() {
		if(this.character.jumper < 2) {
			// Play jump sound
			this.game.sound.play('player_jump');
			// Jumps
			this.character.body.velocity.y = -500;
			this.character.jumper += 1;
		}
	},
	
	collect: function(player, collectible) {
		if(collectible.typeName == 'coin') {
			score += 20;
		}
		else if(collectible.typeName == 'star') {
			this.speed += .5;
		}
		this.game.sound.play('pick_up');
		collectible.destroy();
	},
	
	hit: function(player, mob) {
		this.speed = 5;
		this.game.state.start('EndGame');
	},
*/
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