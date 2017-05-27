function Mob(game, atlas_key, atlas_frame, x, y, world, player) {
	Phaser.Sprite.call(this, game, x, y, atlas_key, atlas_frame);

	this.ogX = x;
	this.ogY = y;
	
	this.game.physics.enable(this, Phaser.Physics.ARCADE);
	
	this.animations.add('flail', Phaser.Animation.generateFrameNames('robobitch', 0, 7, '', 1), 15, true);
	this.animations.add('idle', ['robobitch0'], 30, false);
		
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 1000;
	this.body.drag.x = 500;
	this.body.maxVelocity.x = 350;
	this.anchor.set(.5);
	this.scale.x = this.scale.x / 2;
	this.scale.y = this.scale.y / 2;
	this.animations.play('idle');
	
	this.box = this.game.add.sprite(this.x, this.y, null);
	this.game.physics.enable(this.box, Phaser.Physics.ARCADE);
	this.box.body.setSize(350, 350);

	this.killBox = this.game.add.sprite(this.x, this.y, null);
	this.game.physics.enable(this.killBox, Phaser.Physics.ARCADE);
	this.killBox.body.setSize(20, 20);
	this.killBox.anchor.setTo(0.5,0.5);
	
	this.state = 0; /*  
					 *	0 - idle
					 *  1 - move right
					 *  2 - move left
					 *  3 - attacking
					 */
					 
	this.stateTime = 0;
	this.stateStart = 0;
	
	this.flailing = false;
	
	this.myWorld = world;
	this.thePlayer = player;
}

Mob.prototype = Object.create(Phaser.Sprite.prototype);
Mob.prototype.update = function() {
	this.game.physics.arcade.collide(this, this.myWorld.ground.children);
//	console.log(this.position);
//	this.stateInterpreter();
	// this log line makes the game lag a lot only use it when you really need to please ;)
	
//	if(this.state != 3) {
//		if(this.detectPlayer()) {
//			this.state = 3;
//		}
//	}

	if(!this.flailing && this.detectPlayer()) {
		this.flailing = true;
		this.animations.play('flail');
	}
	else if(this.flailing && !this.detectPlayer()) {
		this.flailing = false;
		this.animations.play('idle');
	}
	
	this.reposition();
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
	var box = this.box;
	box.body.x = this.x - box.body.width / 2;
	box.body.y = this.y - box.body.height / 2;
	
	if(this.game.physics.arcade.overlap(box, this.thePlayer)) {
		return true;
	}
}

Mob.prototype.reposition = function() {
	var killBox = this.killBox;
	killBox.body.x = this.x - killBox.width / 2 - 9;
	killBox.body.y = this.y - killBox.height / 2 - 20;
}

Mob.prototype.death = function() {
	this.box.kill();
	this.kill();
}

Mob.prototype.reinitialize = function() {
	this.x = this.ogX;
	this.y = this.ogY;
	this.revive();
	this.box.revive();
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;
	this.body.acceleration.x = 0;
	this.body.acceleration.y = 0;
}
