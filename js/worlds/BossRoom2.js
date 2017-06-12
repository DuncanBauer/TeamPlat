function BossRoom2(game) {
	Phaser.Group.call(this, game);
	this.game = game;

	// Creates groups for the world objects
	this.ground = this.add(this.game.add.group());
	this.walls  = this.add(this.game.add.group());
	this.caps = this.add(this.game.add.group());
	this.obstacles = this.add(this.game.add.group());
	this.checkpoints = this.add(this.game.add.group());
	this.minions = this.add(this.game.add.group());
	this.enemies = this.add(this.game.add.group());
	this.boss = this.add(this.game.add.group());
	
	this.startLine = null;
	
	this.mobSpawnLocations = [];
	this.minionCount = 0;
	
	this.type = "boss";
		
	// Start music
	this.bg_music = this.game.add.audio('Armless_bg');
	this.bg_music.loop = true;
};

BossRoom2.prototype = Object.create(Phaser.Group.prototype);
BossRoom2.prototype.constructor = BossRoom2;

// Gives a reference of the player to the world map
BossRoom.prototype.retreivePlayer = function(player) {
	this.thePlayer = player;
	this.init();
}

// Resets the fighht if the player dies
BossRoom.prototype.resetFight = function() {
	this.bg_music.stop();
	this.minions.forEach(function(minion) {
		minion.stopMusic();
	}, Mob2);
	this.game.state.restart();
}

//Initializes world and gives locations for enemies to be spawned in
BossRoom2.prototype.init = function() {
	this.mobSpawnLocations.push([172,2327]);
	this.mobSpawnLocations.push([525,2327]);
	this.mobSpawnLocations.push([942,2327]);
	this.mobSpawnLocations.push([1328,2327]);
	this.mobSpawnLocations.push([1738,2327]);
	this.mobSpawnLocations.push([1438,2327]);
	this.mobSpawnLocations.push([338,2327]);
	this.mobSpawnLocations.push([738,2327]);
	
	this.mobSpawnLocations.push([372,2008]);
	this.mobSpawnLocations.push([593,2008]);
	this.mobSpawnLocations.push([875,2008]);
	this.mobSpawnLocations.push([1172,2008]);
	this.mobSpawnLocations.push([1492,2008]);
	this.mobSpawnLocations.push([1700,2008]);
	this.mobSpawnLocations.push([1950,2008]);

	this.loadFloor('platform_atlas', 'platform0');
	this.loadWalls('platform_atlas', 'platform0');
	this.loadEnemies();
	this.loadPortal();
	
	this.loadStartLine();
}

// Loads portal to be used after victory
BossRoom.prototype.loadPortal = function() {
	let temp = this.checkpoints.add(new Portal(this.game, 'checkpoint', 'portal0', this.thePlayer, 1800, 2110, 'LevelSelect', 2));
	temp.kills();
}

// Shows portal after boss death
BossRoom.prototype.revivePortal = function() {
	this.checkpoints.children[0].revive();
}

// Loads the floor and ceiling
BossRoom2.prototype.loadFloor = function(atlas, frame) {
	let temp = this.ground.add(new PlatformA(this.game, atlas, frame, 63));
	temp.x = -32;
	temp.y = 1800;
	
	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 63));
	temp.x = -32;
	temp.y = 1400;
}

// Loads walls in the boss room
BossRoom2.prototype.loadWalls = function(atlas, frame) {
	let temp = this.walls.add(new WallA(this.game, atlas, frame, 5));
	temp.x = this.game.world.width/4;
	temp.y = 1540;

	temp = this.caps.add(new PlatformA(this.game, atlas, frame, 1));
	temp.x = this.game.world.width/4;
	temp.y = 1540;

	temp = this.caps.add(new PlatformA(this.game, atlas, frame, 1));
	temp.x = this.game.world.width/4;
	temp.y = 1540 + 4*32;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 5));
	temp.x = this.game.world.width/2;
	temp.y = 1540;

	temp = this.caps.add(new PlatformA(this.game, atlas, frame, 1));
	temp.x = this.game.world.width/2;
	temp.y = 1540;

	temp = this.caps.add(new PlatformA(this.game, atlas, frame, 1));
	temp.x = this.game.world.width/2;
	temp.y = 1540 + 4*32;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 5));
	temp.x = (this.game.world.width/4)*3;
	temp.y = 1540;

	temp = this.caps.add(new PlatformA(this.game, atlas, frame, 1));
	temp.x = (this.game.world.width/4)*3;
	temp.y = 1540;

	temp = this.caps.add(new PlatformA(this.game, atlas, frame, 1));
	temp.x = (this.game.world.width/4)*3;
	temp.y = 1540 + 4*32;
}

// Spawns the boss
BossRoom.prototype.loadEnemies = function() {
	this.boss.add(new Boss(this.game, 'bossbot_atlas', 'bossbot0', 1600, 2000, this, this.thePlayer, false));
}

// Spawns minions called by the boss based on health
BossRoom.prototype.callMinions = function() {
	let temp = [];
	let taken = [];
	let tempConst = 6;
	
	// Determines number of enemies to spawn
	if(this.boss.children[0].health == 75) {
		tempConst = 6;
	}
	else if(this.boss.children[0].health == 50) {
		tempConst = 9;
	}
	else if(this.boss.children[0].health == 25) {
		tempConst = 12;
	}
	
	// Grabs random locations for the enemies to be spawned in
	let i = 0
	while(i < tempConst) {
		let other = Math.floor(Math.random() * 14); 

		// Only one enemy in one place
		if(!taken.includes(other)) {
			temp.push(other);
			taken.push(other);
			i++;
		}
	}
	
	// Spawns enemies
	for(i = 0; i < tempConst; i++) {
		this.minionCount++;
		if(temp[i] < 8) {
			this.minions.add(new Mob2(this.game, 'robobitch_atlas', 'robobitch0', this.mobSpawnLocations[temp[i]][0], this.mobSpawnLocations[temp[i]][1], this, this.thePlayer, 0));
		}
		else {
			this.minions.add(new Mob2(this.game, 'robobitch_atlas', 'robobitch0', this.mobSpawnLocations[temp[i]][0], this.mobSpawnLocations[temp[i]][1], this, this.thePlayer, 180));	
		}
	}
	
	for(i = 0; i < temp.length; i++) {
		temp.pop();
		taken.pop();
	}
}

// Called when the player kills one of the bosses minion
BossRoom.prototype.killMinion = function() {
	this.minionCount--;

	// If no more minions exist restart boss movement and attacking
	if(this.minionCount == 0) {	
		this.boss.children[0].inControl = false;
		this.boss.children[0].timer.add(Phaser.Timer.SECOND*.9, this.boss.children[0].determineMove, this.boss.children[0]);
		this.boss.children[0].invuln = false;
	}
}

// Loads the line that triggers the boss fight
BossRoom.prototype.loadStartLine = function() {
	this.startLine = this.game.add.sprite(1000, 0, null);
	this.game.physics.enable(this.startLine, Phaser.Physics.ARCADE);
	this.startLine.body.setSize(5, this.game.world.height);
}

// Resets boss fight
BossRoom.prototype.resetWorld = function() {	
	this.game.input.keyboard.start();
	this.game.sound.stopAll();
	this.game.state.restart();
}

// Shakes camera hard
BossRoom.prototype.shakeCamera = function() {
	this.game.camera.shake(.02, 3600);
}
	
// Shakes camera just a wee bit
BossRoom.prototype.shakeCameraLite = function() {
	this.game.camera.shake(.005, 200);
}

// Shakes camera for a little longer
BossRoom.prototype.shakeCameraLong = function() {
	this.game.camera.shake(.01, 4000);
}
	
// Not too short of a camera shake
BossRoom.prototype.shakeCameraMed = function() {
	this.game.camera.shake(.01, 500);
}
	
// A little longer of a shake
BossRoom.prototype.shakeCameraMed2 = function() {
	this.game.camera.shake(.015, 1500);
}