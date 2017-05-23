function Tile(game, atlas_key, atlas_frame, x, y, scaleX, scaleY) {
	Phaser.Sprite.call(this, game, x, y, atlas_key, atlas_frame);

	this.game.physics.arcade.enable(this);
	this.anchor.setTo(0.5, 0.5);
	this.body.immovable = true;
	this.scale.x = -1;
	this.scale.x = scaleX;
	this.scale.y = scaleY;
}

Tile.prototype = Object.create(Phaser.Sprite.prototype);
Tile.prototype.constructor = Tile;
