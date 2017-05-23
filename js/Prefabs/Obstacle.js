function Obstacle(game, atlas_key, atlas_frame, x, y, scaleX, scaleY, _rotation) {
	Phaser.Sprite.call(this, game, x, y, atlas_key, atlas_frame);

	this.game.physics.arcade.enable(this);
	this.anchor.setTo(0.5, 0.5);
	this.body.immovable = true;
	this.scale.x = scaleX;
	this.scale.y = scaleY;
	this.rotation = _rotation;
}

Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
Obstacle.prototype.constructor = Obstacle;
