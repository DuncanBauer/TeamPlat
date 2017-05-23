function WallA(game) {
	Phaser.Group.call(this, game);
	this.game = game;
	this.createWall();
};

WallA.prototype = Object.create(Phaser.Group.prototype);
WallA.prototype.constructor = WallA;

WallA.prototype.createWall = function() {
	for(i=0; i<1000/64; i+=1) {
		let temp = this.add(new Tile(this.game, 'tile_atlas', 'WaveCandy_Square', 32, 568 + (i * 32), 0.5, 0.5));
	}
}

