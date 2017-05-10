function Mob(game, atlas_key, atlas_frame, x, y, world) {
	Phaser.Sprite.call(this, game, x, y, atlas_key, atlas_frame);

	this.anchor.setTo(.5,.5);
	this.game.physics.arcade.enable(this);
	
	this.animations.add('walk', Phaser.Animation.generateFrameNames('WalkLeft_MouthOpen_Red', 1, 3, '', 1), 23, true);
	this.animations.add('idle', ['WalkLeft_MouthOpen_Red2'], 30, false);
		
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 1000;
	this.body.drag.x = 500;
//	this.body.immovable = true;
	this.anchor.setTo(.5, .5);
	this.scale.x = -1;
	this.scale.x = this.scale.x / 2;
	this.scale.y = this.scale.y / 2;
	this.animations.play('idle');

	this.myWorld = world;
}

Mob.prototype = Object.create(Phaser.Sprite.prototype);
Mob.prototype.update = function() {
	this.game.physics.arcade.collide(this, this.myWorld.floor.children);
}
