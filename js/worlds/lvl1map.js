function World(game) {
	Phaser.Group.call(this, game);
	this.game = game;

	this.ground = this.add(this.game.add.group());
	this.walls  = this.add(this.game.add.group());
	this.obstacles = this.add(this.game.add.group());
	this.enemies = this.add(this.game.add.group());
	this.checkpoints = this.add(this.game.add.group());
};

World.prototype = Object.create(Phaser.Group.prototype);
World.prototype.constructor = World;

World.prototype.retreivePlayer = function(player) {
	this.thePlayer = player;
	this.init();
}

World.prototype.init = function() {
	this.loadWalls('platform_atlas', 'platform0');
	this.loadFloor('platform_atlas', 'platform0');
	this.loadChecks();
	this.loadEnemies();
	this.loadObstacles('platform_atlas', 'bigspike');
}

World.prototype.loadChecks = function() {
	this.checkpoints.add(new Checkpoint(this.game, 'checkpoint', 'portal0', this.thePlayer, this.thePlayer.x-100, this.thePlayer.y+100));

	this.checkpoints.add(new Checkpoint(this.game, 'checkpoint', 'portal0', this.thePlayer, 1265, 2300));

	this.checkpoints.add(new Checkpoint(this.game, 'checkpoint', 'portal0', this.thePlayer, 500, 1800));

	this.checkpoints.add(new Checkpoint(this.game, 'checkpoint', 'portal0', this.thePlayer, 110, 900));

	this.checkpoints.add(new Checkpoint(this.game, 'checkpoint', 'portal0', this.thePlayer, 1850, 1550));
	
	this.checkpoints.add(new Portal(this.game, 'checkpoint', 'portal0', this.thePlayer, 1950, 1850, 'LevelSelect', 0));
}

World.prototype.loadFloor = function(atlas, frame) {
	let temp = this.ground.add(new PlatformA(this.game, atlas, frame, 32));
	temp.x = -32;
	temp.y = 2000;
	
	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 6));
	temp.x = 1205;
	temp.y = 1900;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 4));
	temp.x = 1365;
	temp.y = 1804;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 7));
	temp.x = 688 + 224;
	temp.y = 1718;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 5));
	temp.x = 664;
	temp.y = 1504;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 7));
	temp.x = 470;
	temp.y = 1408;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 6));
	temp.x = 16;
	temp.y = 504;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 6));
	temp.x = 408;
	temp.y = 448;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 13));
	temp.x = 1308;
	temp.y = 648;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 6));
	temp.x = 1308 + (5*32);
	temp.y = 348;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 7));
	temp.x = 1308 - (15*32);
	temp.y = 98;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 4));
	temp.x = 1308 + (16 * 32);
	temp.y = 448;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 7));
	temp.x = 1820;
	temp.y = 1148;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 7));
	temp.x = 1948;
	temp.y = 1348;
}

World.prototype.loadWalls = function(atlas, frame) {
	let temp = this.walls.add(new WallA(this.game, atlas, frame, 3));
	temp.x = 1365;
	temp.y = 1804;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 7));
	temp.x = 812;
	temp.y = 1504;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 3));
	temp.x = 664;
	temp.y = 1408;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 23));
	temp.x = 280;
	temp.y = 704;
	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 1));
	temp.x = 280;
	temp.y = 704

	temp = this.walls.add(new WallA(this.game, atlas, frame, 20));
	temp.x = 408;
	temp.y = 576;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 30));
	temp.x = 1493;
	temp.y = 876;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 1));
	temp.x = 408;
	temp.y = 576;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 17));
	temp.x = 1308 + (12 * 32);
	temp.y = 648;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 15));
	temp.x = 1308 + (16 * 32);
	temp.y = 448;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 20));
	temp.x = 1308 + (19 * 32);
	temp.y = 448 - (19 * 32);
	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 1));
	temp.x = 1308 + (19 * 32);
	temp.y = 448 - (19 * 32);

	temp = this.walls.add(new WallA(this.game, atlas, frame, 18));
	temp.x = 2044;
	temp.y = 416;
	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 1));
	temp.x = 2044;
	temp.y = 416;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 23));
	temp.x = 2172;
	temp.y = 480;
	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 1));
	temp.x = 2172;
	temp.y = 480;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 28));
	temp.x = 2332;
	temp.y = 480;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 1));
	temp.x = 2332;
	temp.y = 480;

}

World.prototype.loadEnemies = function() {
}

World.prototype.loadObstacles = function(atlas, frame) {
	temp = this.obstacles.add(new Obstacle(this.game, atlas, frame, 0, 0, 0.5, 0.5, 0, 7));
	temp.x = 986;
	temp.y = 2100;

	temp = this.obstacles.add(new Obstacle(this.game, atlas, frame, 0, 0, 0.5, 0.5, 0, 5));
	temp.x = 310;
	temp.y = 1440;

	temp = this.obstacles.add(new Obstacle(this.game, atlas, frame, 0, 0, 0.5, 0.5, 0, 3));
	temp.x = 1724;
	temp.y = 1180;

	temp = this.obstacles.add(new Obstacle(this.game, atlas, frame, 0, 0, 0.5, 0.5, 0, 4));
	temp.x = 2044;
	temp.y = 1180;

	temp = this.obstacles.add(new Obstacle(this.game, atlas, frame, 0, 0, 0.5, 0.5, Math.PI, 9));
	temp.x = 2076;
	temp.y = 308;

	temp = this.obstacles.add(new Obstacle(this.game, atlas, frame, 0, 0, 0.5, 0.5, 0, 7));
	temp.x = 2140;
	temp.y = 1380;
}

World.prototype.resetWorld = function() {
	this.enemies.forEach(function(enemy) {
		enemy.reinitialize();
	}, Mob);
}
