function PlatformA(game) {
	Phaser.Group.call(this, game);
	this.game = game;
	this.createPlat();
};

PlatformA.prototype = Object.create(Phaser.Group.prototype);
PlatformA.prototype.constructor = PlatformA;

PlatformA.prototype.createPlat = function() {
	for(i=0; i<1000/64; i+=1) {
		let temp = this.add(new Tile(this.game, 'tile_atlas', 'WaveCandy_Square', 32 + (i * 32), 568, 0.5, 0.5));
	}
}

