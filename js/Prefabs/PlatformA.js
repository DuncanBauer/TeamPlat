function PlatformA(game, atlas, frame, tileCount, rotation) {
	Phaser.Group.call(this, game);
	this.game = game;
	this.createPlat(atlas, frame, tileCount, rotation);
};

PlatformA.prototype = Object.create(Phaser.Group.prototype);
PlatformA.prototype.constructor = PlatformA;

PlatformA.prototype.createPlat = function(atlas, frame, tileCount, rotation) {
	for(i=0; i<tileCount; i+=1) {
		let temp = this.add(new Tile(this.game, atlas, frame, 32 + (i * 32), 568, 0.5, 0.5, rotation));
	}
}

