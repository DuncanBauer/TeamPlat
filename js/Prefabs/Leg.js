// this is a prefab for the leg collectible to use as health on boss fights
function Leg(game, sprite, x, y, player) {
	Phaser.Sprite.call(this, game, x, y, sprite);

	this.ogX = x;
	this.ogY = y;
	
	this.game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(.5);

	this.scale.x *= .5;
	this.scale.y *= .5;

	this.player = player
	
	this.pickup_sound = this.game.add.audio('pickup');
	this.pickup_sound.loop = false;
	this.pickup_sound.volume = 3;
}

Leg.prototype = Object.create(Phaser.Sprite.prototype);

Leg.prototype.update = function() {
	if(this.game.physics.arcade.overlap(this, this.player)) {
		this.kill();
		this.player.legs++;
		this.pickup_sound.play();
	}
}

Leg.prototype.reinitialize = function() {
	this.revive();
}
