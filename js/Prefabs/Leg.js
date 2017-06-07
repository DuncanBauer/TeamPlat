function Leg(game, sprite, x, y, player) {
	Phaser.Sprite.call(this, game, x, y, sprite);

	this.ogX = x;
	this.ogY = y;
	
	this.game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(.5);

	this.scale.x *= .5;
	this.scale.y *= .5;

	this.player = player
	
	this.tween = this.game.add.tween(this);
	this.tween.to({y: this.y - 10}, 1000, 'Linear', true, 200, false, true);
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
