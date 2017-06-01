function BossRoom(game) {
	Phaser.Group.call(this, game);
	this.game = game;

	this.ground = this.add(this.game.add.group());
	this.walls  = this.add(this.game.add.group());
	this.obstacles = this.add(this.game.add.group());
	this.enemies = this.add(this.game.add.group());
	this.checkpoints = this.add(this.game.add.group());
	this.minions = this.add(this.game.add.group());
	
	this.mobSpawnLocations = [];
	this.minionCount = 0;
};

BossRoom.prototype = Object.create(Phaser.Group.prototype);
BossRoom.prototype.constructor = BossRoom;

BossRoom.prototype.retreivePlayer = function(player) {
	this.thePlayer = player;
	this.init();
}

BossRoom.prototype.init = function() {
	this.mobSpawnLocations.push([172,2327]);
	this.mobSpawnLocations.push([525,2327]);
	this.mobSpawnLocations.push([942,2327]);
	this.mobSpawnLocations.push([1328,2327]);
	this.mobSpawnLocations.push([1738,2327]);
	this.mobSpawnLocations.push([1438,2327]);
	this.mobSpawnLocations.push([238,2327]);
	this.mobSpawnLocations.push([738,2327]);
	
	this.mobSpawnLocations.push([372,2008]);
	this.mobSpawnLocations.push([593,2008]);
	this.mobSpawnLocations.push([875,2008]);
	this.mobSpawnLocations.push([1172,2008]);
	this.mobSpawnLocations.push([1492,2008]);
	this.mobSpawnLocations.push([1700,2008]);
	this.mobSpawnLocations.push([1950,2008]);

	this.loadFloor('platform_atlas', 'platform0');
	this.loadEnemies();
}

BossRoom.prototype.loadChecks = function() {
	/*
	this.checkpoints.add(new Checkpoint(this.game, 'player_test', this.thePlayer, this.thePlayer.x-100, this.thePlayer.y+100));
	*/
}

BossRoom.prototype.loadFloor = function(atlas, frame) {
	let temp = this.ground.add(new PlatformA(this.game, atlas, frame, 63));
	temp.x = -32;
	temp.y = 1800;
	
	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 63));
	temp.x = -32;
	temp.y = 1400;
}

BossRoom.prototype.loadWalls = function(atlas, frame) {
}

BossRoom.prototype.loadEnemies = function() {
	this.enemies.add(new Boss(this.game, 'robobitch_atlas', 'robobitch0', this.game.width/2 + 200, 2000, this, this.thePlayer));
}

BossRoom.prototype.callMinions = function() {
	let temp = [];
	let taken = [];
	let rand = Math.floor(Math.random() * 10) + 5;
	console.log(rand);
	
	let i = 0
	while(i < rand) {
		let other = Math.floor(Math.random() * 14); 
		if(!taken.includes(other)) {
			temp.push(other);
			taken.push(other);
			i++;
		}
	}
	
	for(i = 0; i < rand; i++) {
		this.minionCount++;
		if(temp[i] < 8) {
			this.minions.add(new Mob(this.game, 'robobitch_atlas', 'robobitch0', this.mobSpawnLocations[temp[i]][0], this.mobSpawnLocations[temp[i]][1], this, this.thePlayer, false));
		}
		else {
			this.minions.add(new Mob(this.game, 'robobitch_atlas', 'robobitch0', this.mobSpawnLocations[temp[i]][0], this.mobSpawnLocations[temp[i]][1], this, this.thePlayer, true));	
		}
	}
}

BossRoom.prototype.killMinion = function() {
	this.minionCount--;
	if(this.minionCount == 0) {
		this.game.time.events.add(1, this.enemies.children[0].determineMove, this.enemies.children[0]);
	}
}

BossRoom.prototype.loadObstacles = function(atlas, frame) {
}
