function World(game) {
	Phaser.Group.call(this, game);
	this.game = game;

	this.ground = this.add(this.game.add.group());
	this.walls  = this.add(this.game.add.group());
	this.obstacles = this.add(this.game.add.group());
	this.enemies = this.add(this.game.add.group());

	this.loadFloor('platform_atlas', 'platform0');
	this.loadWalls('platform_atlas', 'platform0');
	this.loadEnemies();
	this.loadObstacles('platform_atlas', 'bigspike');
};

World.prototype = Object.create(Phaser.Group.prototype);
World.prototype.constructor = World;

World.prototype.loadFloor = function(atlas, frame) {
	let temp = this.ground.add(new PlatformA(this.game, atlas, frame, 32, 0));
	temp.x = -32;
	temp.y = 1000;
	
	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 6, 0));
	temp.x = 981 + 224;
	temp.y = 900;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 4, 0));
	temp.x = 1173 + 192;
	temp.y = 804;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 7, 0));
	temp.x = 688 + 224;
	temp.y = 718;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 5, 0));
	temp.x = 664;
	temp.y = 604;
}

World.prototype.loadWalls = function(atlas, frame) {
	let temp = this.walls.add(new WallA(this.game, atlas, frame, 3, -Math.PI/2));
	temp.x = 1141 + 224;
	temp.y = 804;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 5, -Math.PI/2));
	temp.x = 588 + 224;
	temp.y = 604;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 5, -Math.PI/2));
	temp.x = 588 + 64 + 12;
	temp.y = 604 - (5*32);
}

World.prototype.loadEnemies = function() {
	//this.enemies.add(new Mob(this.game, 'character_atlas', 'WalkLeft_MouthOpen_Red3', this.game.width/2 + 100, this.game.height/2, this));
}

World.prototype.loadObstacles = function(atlas, frame) {
	let temp = this.obstacles.add(new Obstacle(this.game, atlas, frame, 0, 0, 0.5, 0.5, 0));
	temp.x = 200;
	temp.y = 1400;
}

World.prototype.resetWorld = function() {
	this.enemies.forEach(function(enemy) {
		enemy.reinitialize();
	}, Mob);
}
