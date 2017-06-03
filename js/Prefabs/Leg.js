function Leg(game, atlas_key, atlas_frame, x, y) {
	Phaser.Sprite.call(this, game, x, y, atlas_key, atlas_frame);

	this.ogX = x;
	this.ogY = y;
	
	this.game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(.5);
}

Leg.prototype = Object.create(Phaser.Sprite.prototype);

Leg.prototype.reinitialize = function() {
	this.revive();
}