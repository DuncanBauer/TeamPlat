function Mob(game, atlas_key, atlas_frame, x, y, world, player) {
	Phaser.Sprite.call(this, game, x, y, atlas_key, atlas_frame);

	this.ogX = x;
	this.ogY = y;
	
	this.game.physics.arcade.enable(this);
	
	this.animations.add('walk', Phaser.Animation.generateFrameNames('WalkLeft_MouthOpen_Red', 1, 3, '', 1), 23, true);
	this.animations.add('idle', ['WalkLeft_MouthOpen_Red2'], 30, false);
		
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 1000;
	this.body.drag.x = 500;
	this.body.maxVelocity.x = 350;
	this.anchor.setTo(0.5, 0.5);
	this.scale.x = this.scale.x / 2;
	this.scale.y = this.scale.y / 2;
	this.animations.play('idle');
	
	this.detectionBox = this.game.add.sprite(0, 0, 'spike0');
	this.game.physics.arcade.enable(this.detectionBox);
	this.detectionBox.body.setSize(324, 202);

	this.state = 0; /*  
					 *	0 - idle
					 *  1 - move right
					 *  2 - move left
					 *  3 - attacking
					 */
	this.stateTime = 0;
	this.stateStart = 0;
	
	this.myWorld = world;
	this.player = player;
}

Mob.prototype = Object.create(Phaser.Sprite.prototype);
Mob.prototype.update = function() {
	this.game.physics.arcade.collide(this, this.myWorld.ground.children);
	this.stateInterpreter();
	// this log line makes the game lag a lot only use it when you really need to please ;)
	//console.log(this.detectPlayer());
	
	if(this.state != 3) {
		if(this.detectPlayer()) {
			this.state = 3;
		}
	}
}

Mob.prototype.generateState = function() {
	this.state = Math.floor(Math.random() * 3);
	this.stateStart = this.game.time.now;
	this.stateTime = Math.floor(Math.random() * 3000 + 2000);
}

Mob.prototype.stateInterpreter = function() {
	if(this.game.time.now - this.stateStart > this.stateTime) {
		if(this.state != 3) {
		//	this.generateState();
		}
		
		switch(this.state) {
			case 0 : this.animations.play('idle');
					 this.body.acceleration.x = 0;
					 break;
			case 1 : this.animations.play('walk');
					 if(this.scale.x > 0) {
						this.scale.x = -1 * this.scale.x;
					 }
					 this.body.acceleration.x = 400;
					 break;
			case 2 : this.animations.play('walk');
					 if(this.scale.x < 0) {
						this.scale.x = -1 * this.scale.x;
					 }
					 this.body.acceleration.x = -400;
					 break;
			case 3 : // attacks and player tracking go here
					 break;
		}
	}
}

Mob.prototype.detectPlayer = function() {
	let temp = this.repositionDetectionBox();
	return this.game.physics.arcade.overlap(temp, this.player)
}

Mob.prototype.repositionDetectionBox = function() {
	this.detectionBox.anchor.setTo(0.5,0.5);
	this.detectionBox.body.x = this.body.x;
	this.detectionBox.body.y = this.body.y;
	return this.detectionBox;
}

Mob.prototype.death = function() {
	this.detectionBox.kill();
	this.kill();
}

Mob.prototype.reinitialize = function() {
	this.x = this.ogX;
	this.y = this.ogY;
	this.alive = true;
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;
	this.body.acceleration.x = 0;
	this.body.acceleration.y = 0;
}
