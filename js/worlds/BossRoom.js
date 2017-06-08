function BossRoom(game) {
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
		
	// Start music
	this.bg_music = this.game.add.audio('Armless_bg');
	this.bg_music.loop = true;
	this.bg_music.volume = 0.3;
};

BossRoom.prototype = Object.create(Phaser.Group.prototype);
BossRoom.prototype.constructor = BossRoom;

BossRoom.prototype.retreivePlayer = function(player) {
	this.thePlayer = player;
	this.init();
}

BossRoom.prototype.resetFight = function() {
	this.bg_music.stop();
	this.minions.forEach(function(minion) {
		minion.stopMusic();
	}, Mob2);
	this.game.state.restart();
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
	
	this.loadStartLine();
}

BossRoom.prototype.loadFloor = function(atlas, frame) {
	let temp = this.ground.add(new PlatformA(this.game, atlas, frame, 63));
	temp.x = -32;
	temp.y = 1800;
	
	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 63));
	temp.x = -32;
	temp.y = 1400;
}

BossRoom.prototype.loadEnemies = function() {
	this.boss.add(new Boss(this.game, 'bossbot_atlas', 'bossbot0', 1600, 2000, this, this.thePlayer));
}

BossRoom.prototype.callMinions = function() {
	let temp = [];
	let taken = [];
	let rand = Math.floor(Math.random() * 10) + 5;
	
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

BossRoom.prototype.killMinion = function() {
	this.minionCount--;
	if(this.minionCount == 0) {	
		this.boss.children[0].inControl = false;
		this.game.time.events.add(Phaser.Timer.SECOND*.9, this.boss.children[0].jump, this.boss.children[0]);
	}
}

BossRoom.prototype.loadStartLine = function() {
	this.startLine = this.game.add.sprite(1000, 0, null);
	this.game.physics.enable(this.startLine, Phaser.Physics.ARCADE);
	this.startLine.body.setSize(5, this.game.world.height);
}

BossRoom.prototype.resetWorld = function() {	
	this.game.input.keyboard.start();
	this.game.sound.stopAll();
	this.game.state.restart();
}

BossRoom.prototype.shakeCamera = function() {
	this.game.camera.shake(.02, 3600);
}
	
BossRoom.prototype.shakeCameraLite = function() {
	this.game.camera.shake(.005, 200);
}
	
BossRoom.prototype.shakeCameraMed = function() {
	this.game.camera.shake(.01, 500);
}
	
BossRoom.prototype.shakeCameraMed2 = function() {
	this.game.camera.shake(.015, 1500);
}
	
