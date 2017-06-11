function World2(game) {
	Phaser.Group.call(this, game);
	this.game = game;

	this.ground = this.add(this.game.add.group());
	this.ground.x = 0;
	this.ground.y = 0;
	this.walls  = this.add(this.game.add.group());
	this.walls.x = 0;
	this.walls.y = 0;
	this.obstacles = this.add(this.game.add.group());
	this.obstacles.x = 0;
	this.obstacles.y = 0;
	this.enemies = this.add(this.game.add.group());
	this.enemies.x = 0;
	this.enemies.y = 0;
	this.checkpoints = this.add(this.game.add.group());
	this.checkpoints.x = 0;
	this.checkpoints.y = 0;
	this.legs = this.add(this.game.add.group());
	this.legs.x = 0;
	this.legs.y = 0;
			
	this.runTime = this.game.time.now;

	this.absBottom = null;
	this.thePlayer = null;

	// Start music
	this.bg_music = this.game.add.audio('bg_music');
	this.bg_music.loop = true;
	this.bg_music.volume = 1;
	this.bg_music.play();
};

World2.prototype = Object.create(Phaser.Group.prototype);
World2.prototype.constructor = World2;

World2.prototype.retreivePlayer = function(player) {
	this.thePlayer = player;
	this.init();
}

World2.prototype.stopMusic = function() {
	this.bg_music.stop();
}

World2.prototype.init = function() {
	this.loadWalls('platform_atlas', 'platform0');
	this.loadFloor('platform_atlas', 'platform0');
	this.loadChecks();
	this.loadEnemies();
	this.loadObstacles('platform_atlas', 'bigspike');
	this.loadLegs();
	
	this.loadAbsBottom();
}

World2.prototype.loadLegs = function() {
	var newLeg = this.legs.add(new Leg(this.game, 'leg', 264, 2270, this.thePlayer));
	var tween = this.game.add.tween(newLeg);
	tween.to({y: newLeg.y - 10}, 1000, 'Linear', true, 200, false, true);
	
	//newLeg = this.legs.add(new Leg(this.game, 'leg', 464, 2270, this.thePlayer));
	//var tween = this.game.add.tween(newLeg);
	//tween.to({y: newLeg.y - 10}, 1000, 'Linear', true, 200, false, true);
}

World2.prototype.loadChecks = function() {
	this.checkpoints.add(new Checkpoint(this.game, 'checkpoint', 'portal0', this.thePlayer, this.thePlayer.x, this.thePlayer.y+100));

	this.checkpoints.add(new Checkpoint(this.game, 'checkpoint', 'portal0', this.thePlayer, 1536, 1870));

	this.checkpoints.add(new Checkpoint(this.game, 'checkpoint', 'portal0', this.thePlayer, 230, 1200));

	this.checkpoints.add(new Checkpoint(this.game, 'checkpoint', 'portal0', this.thePlayer, 1810, 1050));

	this.checkpoints.add(new Checkpoint(this.game, 'checkpoint', 'portal0', this.thePlayer, 2600, 1900));

	this.checkpoints.add(new Checkpoint(this.game, 'checkpoint', 'portal0', this.thePlayer, 3850, 1220));

	this.checkpoints.add(new Portal(this.game, 'checkpoint', 'portal0', this.thePlayer, 4010, 1415, 'LevelSelect', 0));
}

World2.prototype.loadFloor = function(atlas, frame) {
	let temp = this.ground.add(new PlatformA(this.game, atlas, frame, 50));
	temp.x = -32;
	temp.y = 2000;
	
	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 16));
	temp.x = 1000;
	temp.y = 1660;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 9));
	temp.x = 1536;
	temp.y = 1904;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 4));
	temp.x = 1000 + 15*32;
	temp.y = 1470;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 1));
	temp.x = 1250;
	temp.y = 1500;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 6));
	temp.x = 800;
	temp.y = 1150;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 1));
	temp.x = 650 - 32;
	temp.y = 1170 + 32;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 6));
	temp.x = 200;
	temp.y = 832;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 45));
	temp.x = 400;
	temp.y = 700;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 40));
	temp.x = 496;
	temp.y = 360;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 5));
	temp.x = 0;
	temp.y = 360;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 5));
	temp.x = 2160;
	temp.y = 700;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 1));
	temp.x = 2502;
	temp.y = 732;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 5));
	temp.x = 2764;
	temp.y = 380;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 25));
	temp.x = 2288;
	temp.y = 1184;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 8));
	temp.x = 2544;
	temp.y = 1472;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 50));
	temp.x = 2960;
	temp.y = 1472;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 43));
	temp.x = 3056;
	temp.y = 1152;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 30));
	temp.x = 3622;
	temp.y = 544;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 20));
	temp.x = 3782;
	temp.y = 768;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 5));
	temp.x = 3942;
	temp.y = 928;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 11));
	temp.x = 1824;
	temp.y = 1486;
}

World2.prototype.loadWalls = function(atlas, frame) {
	let temp = this.walls.add(new WallA(this.game, atlas, frame, 3));
	temp.x = 1464 + 3*32 - 24;
	temp.y = 2000 - 3*32;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 5));
	temp.x = 1464 + 3*32 - 24 + 4*32;
	temp.y = 1550 + 2*32;
	temp = this.ground.add(new PlatformA(this.game, 'platform_atlas', 'platform0', 1));
	temp.x = 1464 + 3*32 - 24 + 4*32;
	temp.y = 1550 + 2*32;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 14));
	temp.x = 1464 + 3*32 - 24 + 9*32;
	temp.y = 1486;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 10));
	temp.x = 1808;
	temp.y = 700;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 33));
	temp.x = 2160;
	temp.y = 700;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 6));
	temp.x = 2288;
	temp.y = 700;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 16));
	temp.x = 2892;
	temp.y = 380;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 56));
	temp.x = 3052;
	temp.y = -600;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 10));
	temp.x = 2288;
	temp.y = 1184;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 10));
	temp.x = 2768;
	temp.y = 1472;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 10));
	temp.x = 2960;
	temp.y = 1472;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 30));
	temp.x = 4560;
	temp.y = 544;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 30));
	temp.x = 4560;
	temp.y = 544;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 12));
	temp.x = 4390;
	temp.y = 768;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 4));
	temp.x = 3782;
	temp.y = 768;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 19));
	temp.x = 3622;
	temp.y = 544;
}

World2.prototype.loadEnemies = function() {
	let temp = this.enemies.add(new Mob(this.game, 'robobitch_atlas', 'robobitch0', 1250, 1500, this, this.thePlayer, 0));
	temp.x = 1282;
	temp.y = 2027;

	temp = this.enemies.add(new Mob(this.game, 'robobitch_atlas', 'robobitch0', 1250, 1500, this, this.thePlayer, 0));
	temp.x = 650;
	temp.y = 1725;

	temp = this.enemies.add(new Mob(this.game, 'robobitch_atlas', 'robobitch0', 1250, 1500, this, this.thePlayer, 0));
	temp.x = 432;
	temp.y = 1226;

	temp = this.enemies.add(new Mob(this.game, 'robobitch_atlas', 'robobitch0', 1250, 1500, this, this.thePlayer, 0));
	temp.x = 2534;
	temp.y = 1260;

	temp = this.enemies.add(new Mob(this.game, 'robobitch_atlas', 'robobitch0', 1250, 1500, this, this.thePlayer, 0));
	temp.x = 2320;
	temp.y = 2256;

	temp = this.enemies.add(new Mob(this.game, 'robobitch_atlas', 'robobitch0', 1250, 1500, this, this.thePlayer, 0));
	temp.x = 3804;
	temp.y = 1640;
}

World2.prototype.loadObstacles = function(atlas, frame) {
	let temp = this.obstacles.add(new Obstacle(this.game, atlas, frame, 0, 0, 0.5, 0.5, 0, 16));
	temp.x = 1000;
	temp.y = 1660 - 32;

	temp = this.obstacles.add(new Obstacle(this.game, atlas, frame, 0, 0, 0.5, 0.5, 0, 40));
	temp.x = 496;
	temp.y = 328;

	temp = this.obstacles.add(new Obstacle(this.game, atlas, frame, 0, 0, 0.5, 0.5, 0, 10));
	temp.x = 1840;
	temp.y = 924;

	temp = this.obstacles.add(new Obstacle(this.game, atlas, frame, 0, 0, 0.5, 0.5, 0, 18));
	temp.x = 2320;
	temp.y = 860;

	temp = this.obstacles.add(new Obstacle(this.game, atlas, frame, 0, 0, 0.5, 0.5, 0, 18));
	temp.x = 2192;
	temp.y = 1724;

	temp = this.obstacles.add(new Obstacle(this.game, atlas, frame, 0, 0, 0.5, 0.5, 0, 23));
	temp.x = 3654;
	temp.y = 1120;
}

World2.prototype.loadAbsBottom = function() {
	this.absBottom = this.game.add.sprite(0, 3000, null);
	this.game.physics.enable(this.absBottom, Phaser.Physics.ARCADE);
	this.absBottom.body.setSize(this.game.world.width, 5);

}

World2.prototype.resetWorld = function() {
	this.enemies.forEach(function(enemy) {
		enemy.stopMusic();
		enemy.reinitialize();
	}, Mob);

	//this.legs.forEach(function(leg) {
	//	leg.reinitialize();
	//}, Leg);
}
