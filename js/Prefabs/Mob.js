function Mob(game, atlas_key, atlas_frame, x, y, world, player, _upsideDown) {
	Phaser.Sprite.call(this, game, x, y, atlas_key, atlas_frame);

	this.ogX = x;
	this.ogY = y;
	
	this.game.physics.enable(this, Phaser.Physics.ARCADE);
	
	this.animations.add('flail', Phaser.Animation.generateFrameNames('robobitch', 0, 7, '', 1), 15, true);
	this.animations.add('idle', ['robobitch0'], 30, false);
	this.animations.play('idle');

	this.anchor.set(.5);
	this.scale.x = this.scale.x / 2;
	this.scale.y = this.scale.y / 2;
	
	this.box = this.game.add.sprite(this.x, this.y, null);
	this.game.physics.enable(this.box, Phaser.Physics.ARCADE);
	this.box.body.setSize(350, 350);

	this.killBox = this.game.add.sprite(this.x, this.y, null);
	this.game.physics.enable(this.killBox, Phaser.Physics.ARCADE);
	this.killBox.body.setSize(20, 20);
	
	this.flailing = false;
	this.upsideDown = _upsideDown;
	
	this.myWorld = world;
	this.thePlayer = player;
}

Mob.prototype = Object.create(Phaser.Sprite.prototype);
Mob.prototype.update = function() {	
	//this.game.physics.arcade.collide(this, this.myWorld.ground.children);
	
	this.setup();

	if(!this.flailing && this.detectPlayer()) {
		this.flailing = true;
		this.animations.play('flail');
	}
	else if(this.flailing && !this.detectPlayer()) {
		this.flailing = false;
		this.animations.play('idle');
	}
}

Mob.prototype.setup = function() {
	var killBox = this.killBox;
	this.killBox.anchor.set(0.5);
	if(!this.upsideDown) {
		killBox.body.x = this.x - (killBox.width / 2) - 9;
		killBox.body.y = this.y - (killBox.height / 2) - 18;
	}
	else{
		if(this.scale.y > 0) {
			this.scale.y = this.scale.y * -1;
		}
		killBox.body.x = this.x - (killBox.width / 2) - 9;
		killBox.body.y = this.y - (killBox.height / 2) - 10;
	}
}

Mob.prototype.detectPlayer = function() {
	var box = this.box;
	box.body.x = this.x - box.body.width / 2;
	box.body.y = this.y - box.body.height / 2;
	
	if(this.game.physics.arcade.overlap(box, this.thePlayer)) {
		return true;
	}
	return false;
}

Mob.prototype.kills = function() {
	this.box.kill();
	this.killBox.kill();
	this.kill();
}

Mob.prototype.reinitialize = function() {
	this.revive();
	this.box.revive();
	this.killBox.revive();
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;
	this.body.acceleration.x = 0;
	this.body.acceleration.y = 0;
}

Mob.prototype.resetLoc = function(loc) {
	console.log("now");
	this.x = loc[0];
	this.y = loc[1];
	this.body.x = loc[0];
	this.body.y = loc[1];
}