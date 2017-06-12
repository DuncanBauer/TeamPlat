function Obstacle(game, atlas_key, atlas_frame, x, y, scaleX, scaleY, _rotation, tileCount) {
	Phaser.Group.call(this, game);

	this.game.physics.arcade.enable(this);
	this.createSpikes(scaleX, scaleY, tileCount, atlas_key, atlas_frame, _rotation);
}

Obstacle.prototype = Object.create(Phaser.Group.prototype);
Obstacle.prototype.constructor = Obstacle;

// spawns a spike strip of the given tileCount with the given rotation
Obstacle.prototype.createSpikes = function(scaleX, scaleY, tileCount, atlas, frame, rotation) {
	for(i=0; i<tileCount; i+=1) {
		let temp = this.add(new Tile(this.game, atlas, frame, 32 + (i * 32), 568, 0.5, 0.5, rotation));
		this.game.physics.arcade.enable(temp);
		temp.scale.x = scaleX;
		temp.scale.y = scaleY;
		temp.body.immovable = true;
	}
}
