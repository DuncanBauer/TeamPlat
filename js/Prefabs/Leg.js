function Leg(game, atlas_key, atlas_frame, x, y, player) {
	Phaser.Sprite.call(this, game, x, y, atlas_key, atlas_frame);

	this.ogX = x;
	this.ogY = y;
	
	this.game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(.5);

	this.scale.x *= .5;
	this.scale.y *= .5;

	this.player = player
}

Leg.prototype = Object.create(Phaser.Sprite.prototype);

Leg.prototype.update = function() {
	if(this.game.physics.arcade.overlap(this, this.player)) {
		this.kill();
		this.player.legs++;
	}
}

Leg.prototype.reinitialize = function() {
	this.revive();
}
