var game = new Phaser.Game(1000, 600, Phaser.AUTO);
var score = 0;
var highscore = 0;

var Preloader = function(game) {
};
Preloader.prototype = {
	preload: function() {
		console.log('Preloader: preload');
		
		// Set assest path
		game.load.path = '/assets';
		
		// Load Images
		// Load MainMenu assets
		game.load.image('background00', '/img/background00.png');
		game.load.image('play_Button', '/img/play_button.png');
		game.load.image('power_Button', '/img/power_Button.png');
		
		// Load game assets
		game.load.atlas('character_atlas', '/img/characters.png', '/img/characters.json');
		game.load.atlas('tile_atlas', '/img/tiles.png', '/img/tiles.json');
		game.load.atlas('coin_atlas', '/img/coin.png', '/img/coin.json');
		game.load.atlas('star_atlas', '/img/star.png', '/img/star.json');
		game.load.image('spike0', '/img/spike0.png');
		
		// Load Sounds
		game.load.audio('bg_music', '/audio/bg_music.ogg');
		game.load.audio('player_jump', '/audio/player_jump.ogg');
		game.load.audio('pick_up', '/audio/pick_up.ogg');
	},
	
	create: function() {
		console.log('Preloader: create');
		
		// Starts MainMenu state
		game.state.start('MainMenu');
	}
}

var MainMenu = function(game) {};
MainMenu.prototype = {
	
	create: function() {
		console.log('MainMenu: create');
		
		// Set Main menu background and adjust size
		this.bkgd = game.add.sprite(0, 0, 'background00');
		this.bkgd.height = 600;
		this.bkgd.width = 1000;
		
		// Create buttons for main menu
		this.buttons = game.add.group();
		
		// Create start game button
		var button = game.add.button(game.world.centerX - 150, game.world.centerY, 'play_Button', this.playGame, this);
		this.buttons.create(button);
	},
	
	playGame: function() {
		console.log('MainMenu: playGame');
		
		// Start Game state
		game.state.start('Game');
	}
}

var EndGame = function(game, score, highscore) {};
EndGame.prototype = {
	
	create: function() {
		console.log('MainMenu: create');
		
		// Set Main menu background and adjust size
		this.bkgd = game.add.sprite(0, 0, 'background00');
		this.bkgd.height = 600;
		this.bkgd.width = 1000;
		
		// Create buttons for main menu
		this.buttons = game.add.group();
		
		// Create start game button
		var button = game.add.button(game.world.centerX - 150, game.world.centerY, 'play_Button', this.playGame, this);
		this.buttons.create(button);
		
		// Updates highscore
		if(score > highscore) {
			highscore = score;
		}
		
		// Displays scores at the game over screen
		var high = game.add.text(game.world.centerX, game.world.centerY - 100, 'High Score: ' + Math.floor(highscore));
		high.position.x = 500 - (high.width/2)
		var s = game.add.text(game.world.centerX, game.world.centerY - 50, 'Score: ' + Math.floor(score));
		s.position.x = 500 - (s.width/2);
	},
	
	playGame: function() {
		console.log('MainMenu: playGame');
		// Resets score
		score = 0;
		
		// Start Game state
		game.state.start('Game');
	}
}

var UIManager = function(game) {
	// Create group for UI text
	this.uiTextElements = game.add.group();
	this.textDict = {};
	this.textKeys = [];
	
	// Create group for UI buttons
	this.uiButtonElements = game.add.group();
	this.buttonDict = {};
	this.buttonKeys = [];
};
UIManager.prototype = {
	// Adds ui text element to the textElements group and displays on screen
	addTextElement: function(x, y, startText, style, key) {
		this.textDict[key] = [this.uiTextElements.children.length, startText];
		this.textKeys.push(key);
		game.add.text(x, y, startText, style, parent=this.uiTextElements);
	},
	
	// Adds ui button element to the buttonElements group and displays on screen
	addButtonElement: function(x, y, imgkey, img, func, key) {
		
	},
		
	// Updates the value for the text element
	updateTextElement: function(key, newVal) {
		if(this.textDict[key] != null) {
			this.uiTextElements.children[(this.textDict[key])[0]].text = this.textDict[key][1] + " " + newVal;
		}
	},
	
	// Return the text element requested
	getTextElement: function(i) {
		if(this.uiTextElements.children.length > i) {
			return this.uiTextElements.children[i];
		}
		return -1;
	},
	
	// Gets keys for the the UI text elements
	getTextKeys: function() {
		return this.textKeys;
	}
}

var ObstacleManager = function(game, score) {
	this.offset = 63.4;
	// Creates group for obstacles
	this.obstacles = game.add.group();
	// Creates group for the floor
	this.floor = game.add.group();
	this.floor.enableBody = true;
	// Creates group for mobs
	this.mobs = game.add.group();
	this.mobs.enableBody = true;
};
ObstacleManager.prototype = {	
	// Destroy objects when they go off-screen to the left
	obstOut: function(obst) {
		if(obst.position.x < -(obst.width/2)) {
			let par = obst.parent;
			obst.destroy();
			if (par.length == 0) {
				par.destroy();
			}
		}
	},
	
	// Destroys out of bounds floor sprite and spawns another
	floorOut: function(temp) {
		if(temp.position.x  + 31 < 0) {
			temp.destroy();
			this.generateFloor(this.floor.children[this.floor.children.length-1].position.x + 63.4, 600-32, 'WaveCandy_', 'tile_atlas');
		}
	},
	
	// Destroys out of bounds mobs
	mobOut: function(temp) {
		if(temp.position.x + temp.width / 2 < 0) {
			temp.destroy();
		}
	},
	
	// Generates a floor sprite and sets its physics
	generateFloor: function(x, y, style, type) {
		var rand = 100;
		if(score > 400 && score < 700) {
			rand = game.rnd.integerInRange(0, 20);
		}
		else if(score > 700 && score < 1000) {
			rand = game.rnd.integerInRange(0, 12);
		}
		else if(score > 1000 && score < 1500) {
			rand = game.rnd.integerInRange(0, 9);
		}
		else if(score > 1500) {
			rand = game.rnd.integerInRange(0, 7);
		}
		
		if(rand <= 1) {
			newObst = this.mobs.create(x, y - 50, 'spike0');
			newObst.scale.x = 0.2;
			newObst.scale.y = 0.2;
			newObst.enableBody = true;
			newObst.anchor.setTo(.5, .5);
			newObst.body.immovable = true;
			newObst.checkWorldBounds = true;
			newObst.events.onOutOfBounds.add(this.mobOut, this);
		}
		
		newType = this.floor.create(x, y, type, style + 'Square');
		newType.enableBody = true;
		game.physics.enable(newType, Phaser.Physics.ARCADE);
		newType.typeName = 'square';
		newType.anchor.setTo(.5, .5);
		newType.body.immovable = true;
		newType.checkWorldBounds = true;
		newType.events.onOutOfBounds.add(this.floorOut, this);
	},
	
	// Generates an obstacle, collectible and sets physics
	generateObstacle: function(x, y, style, type, CollectibleManager) {
		// Creates new obstacle group and adds it to the obstacles group
		var obst = game.add.group(parent=this.obstacles);
		obst.enableBody = true;
		game.physics.enable(obst, Phaser.Physics.ARCADE);
		
		// Rolls to determine collectible
		var rand = game.rnd.integerInRange(0, 10);
		if(rand < 10) {
			typeC = 'coin_atlas';
		}
		else {
			typeC = 'star_atlas';
		}
		
		// Spawns flat platform
		if(type == "plat") {
			var newType = obst.create(x, y, 'tile_atlas', style + '2RoundLeft');
			newType.typeName = 'round';
			newType = obst.create(x + this.offset, y, 'tile_atlas', style + 'Square');
			newType.typeName = 'square';
			newType = obst.create(x + (2 * this.offset), y, 'tile_atlas', style + '2RoundRight');
			newType.typeName = 'round';
			CollectibleManager.generateCollectible(x + this.offset, y - 100, typeC);
		}
		// Spawns sloped platform
		else if (type == "slope") {
			var newType = obst.create(x, y, 'tile_atlas', style + 'SlopeLeft');
			newType.typeName = 'slopeLeft';
			newType = obst.create(x + this.offset, y, 'tile_atlas', style + 'Square');
			newType.typeName = 'square';
			newType = obst.create(x + (2 * this.offset), y, 'tile_atlas', style + 'SlopeRight');
			newType.typeName = 'slopeRight';
			newType = obst.create(x, y + this.offset, 'tile_atlas', style + 'SlopeCorner_Left');
			newType.typeName = 'slope';
			newType = obst.create(x - this.offset, y + this.offset, 'tile_atlas', style + '2RoundLeft');
			newType.typeName = 'round';
			newType = obst.create(x + this.offset, y + this.offset, 'tile_atlas', style + 'MudSquare');
			newType.typeName = 'mud';
			newType = obst.create(x + (2 * this.offset), y + this.offset, 'tile_atlas', style + 'SlopeCorner_Right');
			newType.typeName = 'slope'
			newType = obst.create(x + (3 * this.offset), y + this.offset, 'tile_atlas', style + '2RoundRight');
			newType.typeName = 'round';
			CollectibleManager.generateCollectible(x + this.offset, y - 100, typeC);
		}
		// Spawns half platform
		else if (type == "halfPlat") {
			var newType = obst.create(x, y, 'tile_atlas', style + 'Half_2RoundLeft');
			newType.typeName = 'halfRound';
			newType = obst.create(x + this.offset, y, 'tile_atlas', style + 'HalfSquare');
			newType.typeName = 'halfSquare';
			newType = obst.create(x + (2 * this.offset), y, 'tile_atlas', style + 'Half_2RoundRight');
			newType.typeName = 'halfRound';
			CollectibleManager.generateCollectible(x + this.offset, y - 100, typeC);
		}
		// Spawns single platform
		else if (type == "solo") {
			var newType = obst.create(x, y, 'tile_atlas', style + 'Half_Round');
			newType.typeName = 'halfRound';
			CollectibleManager.generateCollectible(x, y - 100, typeC);
		}
		// Spawns stairs obstacle
		else if (type == "stairs") {
			var newType = obst.create(x, y, 'tile_atlas', style + 'Round');
			newType.typeName = 'round';
			newType = obst.create(x + (1.5 * this.offset), y - this.offset, 'tile_atlas', style + 'Round');
			newType.typeName = 'round';
			newType = obst.create(x + (3 * this.offset), y - (2 * this.offset), 'tile_atlas', style + 'Round');
			newType.typeName = 'round';
			newType = obst.create(x + (4.5 * this.offset), y - (3 * this.offset), 'tile_atlas', style + 'Round');
			newType.typeName = 'round';
			CollectibleManager.generateCollectible(x, y - 100, typeC);
		}
			
		obst.len = 0;
		// Sets physics for obstacle
		for(i = 0; i < obst.children.length; i+=1) {
			game.physics.enable(obst.children[i], Phaser.Physics.ARCADE);
			obst.children[i].anchor.setTo(.5, .5);
			obst.children[i].body.immovable = true;
			obst.children[i].checkWorldBounds = true;
			obst.children[i].events.onOutOfBounds.add(this.obstOut, this);
			
			if(obst.children[i].typeName == 'round' || obst.children[i].typeName == 'halfRound' 
			   || obst.children[i].typeName == 'square' || obst.children[i].typeName == 'halfSquare') {
				obst.len += 64;
			}
		}
		// Return length of obstacle
		return obst.len;
	},
	
	// Moves game obstacles across the screen
	updateObstacles: function(offset) {
		for(i = 0; i < this.getLength(); i+=1) {
			for(j = 0; j < this.obstacles.children[i].children.length; j+=1) {
				this.obstacles.children[i].children[j].position.x -= offset;	
			}
		}
	},
	
	// Moves floor across the screen
	updateFloor: function(offset) {
		for(i = 0; i < this.floor.children.length; i+=1) {
			this.floor.children[i].position.x -= offset;	
		}		
	},
	
	// Moves mobs across screen
	updateMobs: function(offset) {
		for(i = 0; i < this.mobs.children.length; i+=1) {
			this.mobs.children[i].position.x -= offset;
		}
	},
	
	// Returns length of obstacles
	getLength: function() {
		return this.obstacles.children.length;
	},
	
	getChildLength: function(i) {
		if(this.getLength() > i) {
			return this.obstacles.children[i].children.length;
		}
		return -1;
	}
}

var CollectibleManager = function(game) {
	// Creates collectibles group
	this.collectibles = game.add.group();
	this.collectibles.enableBody = true;
};
CollectibleManager.prototype = {
	// Destroys collectible if out of bounds
	collectOut: function(collect) {
		if(collect.position.x - (collect.width/2) < 0) {
			collect.destroy();
		}
	},
	
	// Moves collectibles across the screen
	updateCollectibles: function(offset) {
		for(i = 0; i < this.collectibles.children.length; i+=1) {
			this.collectibles.children[i].position.x -= offset;
		}
	},
	
	// Spawns collectible based on type
	generateCollectible: function(x, y, type) {
		// Spawn coin
		if(type == 'coin_atlas') {
			var temp = this.collectibles.create(x, y, type, 'coin0');
			temp.animations.add('float', ['coin0', 'coin1', 'coin2', 'coin3', 'coin2', 'coin1'], 7, true);
			temp.typeName = 'coin';
		}
		// Spawn star
		else if(type == 'star_atlas') {
			var temp = this.collectibles.create(x, y, type, 'star0');
			temp.animations.add('float', ['star0', 'star1', 'star2', 'star3', 'star2', 'star1'], 7, true);
			temp.typeName = 'star';
			temp.scale.x = .5;
			temp.scale.y = .5;
		}
		// Sets physics
		temp.anchor.setTo(.5, .5);
		temp.body.immovable = true;
		temp.checkWorldBounds = true;
		temp.events.onOutOfBounds.add(this.collectOut, this);
		temp.animations.play('float');
	}
}
	
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
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.setBoundsToWorld();
		game.time.advancedTiming = true;
		
		// Start music
		var bg_music = game.add.audio('bg_music');
		bg_music.loopFull();
		game.sound.play(bg_music);
		
		// BACKGROUND FIRST BECAUSE LAYERS AND SHIT
		// Set Game background and adjust size
		this.bkgd = this.add.tileSprite(0, 0, game.width, game.height, 'background00');
		this.bkgd.height = 600;
		this.bkgd.width = 1000;	

		// THEN THE CollectibleManager
		this.CollectibleManager = new CollectibleManager(game);
		// THEN THE OBSTACLE MANAGE
		this.ObstacleManager = new ObstacleManager(game);
		
		var x = 0;
		var y = 600;
		for(i = 0; i < 17; i+=1) {
			this.ObstacleManager.generateFloor(x + (i * 63.4), y-32, 'WaveCandy_', 'tile_atlas');	
		}
		// THEN THE UI MANAGER BECAUSE THAT GOES ON TOP
		this.UIManager = new UIManager(game);
		this.UIManager.addTextElement(16,16,'Score:',{fontSize: '32px', fill: '#000'},'score');
		this.UIManager.addTextElement(16,48,'FPS:',{ fontSize: '32px', fill: '#000' },'fps');
		
		// Creates ingame button group
		this.buttons = game.add.group();
		// Sets end game button
		var button = game.add.button(game.world.centerX + 350, 0, 'power_Button', this.endGame, this);
		button.scale.setTo(.5,.5);
		this.buttons.create(button);
		
		// Create character, enable physics, and add animations
		this.character = game.add.sprite(this.world.centerX - 300, this.world.centerY + 150, 'character_atlas', 'WalkLeft_MouthOpen_Purple3');
		game.physics.arcade.enable(this.character);
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
		game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.jump, this);
	},
	
	update:function() {		
		this.frameCount+=1;
		
		// Scrolls obstacles/collectibles across screen
		this.ObstacleManager.updateObstacles(this.speed);
		this.ObstacleManager.updateFloor(this.speed);
		this.ObstacleManager.updateMobs(this.speed);
		this.CollectibleManager.updateCollectibles(this.speed);
		// Scrolls background
		this.bkgd.tilePosition.x -= this.speed;

		// CHECK COLLLISION WITH FLOOR
		var hitPlatform = game.physics.arcade.collide(this.character, this.ObstacleManager.floor.children);

		// CHECK COLLISION WITH OBSTACLES
		var i = 0;
		var j = 0;
		while(i < this.ObstacleManager.obstacles.children.length) {
			let themp = this.ObstacleManager.obstacles.children[i];
			while(j < themp.children.length) {
				// Checks if the player is above the object
				if(game.physics.arcade.overlap(this.character, themp.children[j]) &&
   				 ((this.character.y + this.character.height/2) <= (themp.children[j].y - themp.children[j].height/2) + 5)) {
					if(themp.children[j].typeName != "mud") {
						game.physics.arcade.collide(this.character, themp.children[j])	
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
	
		/*
		 *
		 * GENERATE OBSTACLES
		 *
		 */
		var minY = 450;
		var minX = 1100;
		if(this.frameCount >= 120) {
			let rand = game.rnd.integerInRange(0,6);
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
		game.physics.arcade.overlap(this.character, this.CollectibleManager.collectibles.children, this.collect, null, this);
		
		// Check mobs
		game.physics.arcade.overlap(this.character, this.ObstacleManager.mobs.children, this.hit, null, this);
		
		// Sets keyboard listener, listens for arrow keys
		cursors = game.input.keyboard.createCursorKeys();
		
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
		this.newVals[1] = (Math.floor(game.time.fps));
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
			game.sound.play('player_jump');
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
		game.sound.play('pick_up');
		collectible.destroy();
	},
	
	hit: function(player, mob) {
		this.speed = 5;
		game.state.start('EndGame');
	},
	
	// End the game and return to the main menu
	endGame: function(end) {
		console.log('Game: endGame');
		this.speed = 5;
		score = 0;
		
		// Return to MainMenu state
		game.state.start('MainMenu');
	}
}

game.state.add('Preloader', Preloader);
game.state.add('MainMenu', MainMenu);
game.state.add('Game', Game);
game.state.add('EndGame', EndGame);
game.state.start('Preloader');