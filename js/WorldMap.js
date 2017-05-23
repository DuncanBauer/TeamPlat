function World(game) {
	Phaser.Group.call(this, game);
	this.game = game;

	this.ground = this.add(this.game.add.group());
	this.walls  = this.add(this.game.add.group());
	this.obstacles = this.add(this.game.add.group());
	this.enemies = this.add(this.game.add.group());

	this.loadFloor();
	this.loadWalls();
};

World.prototype = Object.create(Phaser.Group.prototype);
World.prototype.constructor = World;

World.prototype.loadFloor = function() {
	let temp = this.ground.add(new PlatformA(this.game));
	temp.x = 500;
}

World.prototype.loadWalls = function() {
	let temp = this.walls.add(new WallA(this.game));
	temp.x = 500;
}

