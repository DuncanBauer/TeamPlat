function Mob(game, atlas_key, atlas_frame, x, y, world, player) {
	Phaser.Sprite.call(this, game, x, y, atlas_key, atlas_frame);

	this.game.physics.arcade.enable(this);
	
	this.animations.add('walk', Phaser.Animation.generateFrameNames('WalkLeft_MouthOpen_Red', 1, 3, '', 1), 23, true);
	this.animations.add('idle', ['WalkLeft_MouthOpen_Red2'], 30, false);
		
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 1000;
	this.body.drag.x = 500;
	this.anchor.setTo(.5, .5);
	this.scale.x = -1;
	this.scale.x = this.scale.x / 2;
	this.scale.y = this.scale.y / 2;
	this.animations.play('idle');
	
	this.detectionBox = this.game.add.sprite(0, 0, 'spike0');
	this.game.physics.arcade.enable(this.detectionBox);
	this.detectionBox.anchor.setTo(.5,.5);
	this.detectionBox.body.setSize(324, 202);

	this.myWorld = world;
	this.player = player;
}

Mob.prototype = Object.create(Phaser.Sprite.prototype);
Mob.prototype.update = function() {
<<<<<<< HEAD
	this.game.physics.arcade.collide(this, this.myWorld.floor.children);
	console.log(this.detectPlayer());
}

Mob.prototype.detectPlayer = function() {
	this.repositionDetectionBox();
	return this.game.physics.arcade.overlap(this.detectionBox, this.player)
}

Mob.prototype.repositionDetectionBox = function() {
	this.detectionBox.body.x = this.body.x;
	this.detectionBox.body.y = this.body.y;
=======
	this.game.physics.arcade.collide(this, this.myWorld.ground.children);
>>>>>>> 6958547b14b577d944ddb68d152a3acec26b58b1
}

Mob.prototype.death = function() {
	this.kill();
}
