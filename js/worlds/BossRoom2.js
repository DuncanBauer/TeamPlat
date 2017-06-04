function BossRoom2(game) {
	Phaser.Group.call(this, game);
	this.game = game;

	this.ground = this.add(this.game.add.group());
	this.walls  = this.add(this.game.add.group());
	this.obstacles = this.add(this.game.add.group());
	this.checkpoints = this.add(this.game.add.group());
	this.minions = this.add(this.game.add.group());
	this.enemies = this.add(this.game.add.group());
	this.boss = this.add(this.game.add.group());
	
	this.startLine = null;
	
	this.mobSpawnLocations = [];
	this.minionCount = 0;
	
	this.type = "boss";
};

BossRoom2.prototype = Object.create(Phaser.Group.prototype);
BossRoom2.prototype.constructor = BossRoom2;

BossRoom2.prototype.retreivePlayer = function(player) {
	this.thePlayer = player;
	this.init();
}

BossRoom2.prototype.init = function() {
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
	
	this.loadStartLine();
}

BossRoom2.prototype.loadFloor = function(atlas, frame) {
	let temp = this.ground.add(new PlatformA(this.game, atlas, frame, 63));
	temp.x = -32;
	temp.y = 1800;
	
	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 63));
	temp.x = -32;
	temp.y = 1400;
}

BossRoom2.prototype.loadEnemies = function() {
	this.boss.add(new Boss(this.game, 'robobitch_atlas', 'robobitch0', 1600, 2000, this, this.thePlayer));
}

BossRoom2.prototype.callMinions = function() {
	let temp = [];
	let taken = [];
	let rand = Math.floor(Math.random() * 10) + 5;
	console.log(rand);
	
	let tempConst = 5;
	
	let i = 0
	while(i < tempConst) {
		let other = Math.floor(Math.random() * 14); 
		if(!taken.includes(other)) {
			temp.push(other);
			taken.push(other);
			i++;
		}
	}
	
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

BossRoom2.prototype.killMinion = function() {
	this.minionCount--;
	if(this.minionCount == 0) {
		this.game.time.events.add(1, this.boss.children[0].determineMove, this.boss.children[0]);
	}
}

BossRoom2.prototype.loadStartLine = function() {
	this.startLine = this.game.add.sprite(1000, 0, null);
	this.game.physics.enable(this.startLine, Phaser.Physics.ARCADE);
	this.startLine.body.setSize(5, this.game.world.height);

}

BossRoom2.prototype.resetWorld = function() {
	this.game.state.restart();
}

BossRoom2.prototype.shakeCamera = function() {
	this.game.camera.shake(.02, 1100);
}
	
BossRoom2.prototype.shakeCameraLite = function() {
	this.game.camera.shake(.005, 200);
}
	
