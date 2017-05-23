function World(game) {
	Phaser.Group.call(this, game);
	this.game = game;

	this.ground = this.add(this.game.add.group());
	this.walls  = this.add(this.game.add.group());
	this.obstacles = this.add(this.game.add.group());
	this.enemies = this.add(this.game.add.group());

	this.loadFloor();
	this.loadWalls();
	this.loadEnemies();
	this.loadObstacles();
};

World.prototype = Object.create(Phaser.Group.prototype);
World.prototype.constructor = World;

World.prototype.loadFloor = function() {
	let temp = this.ground.add(new PlatformA(this.game));
	temp.x = 500;
	temp.y = 500;
}

World.prototype.loadWalls = function() {
	let temp = this.walls.add(new WallA(this.game));
	temp.x = 500;
	temp.y = 500;
}

World.prototype.loadEnemies = function() {
	this.enemies.add(new Mob(this.game, 'character_atlas', 'WalkLeft_MouthOpen_Red3', this.game.width/2 + 100, this.game.height/2, this));
}

World.prototype.loadObstacles = function() {
}
