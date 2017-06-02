function Mob2(game, atlas_key, atlas_frame, x, y, world, player, rotateAngle) {
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
	this.box.body.setSize(600, 600);

	this.killBox = this.game.add.sprite(this.x, this.y, null);
	this.game.physics.enable(this.killBox, Phaser.Physics.ARCADE);
	this.killBox.body.setSize(20, 20);
	
	this.hitBox1 = this.game.add.sprite(this.x, this.y, null);
	this.game.physics.enable(this.hitBox1, Phaser.Physics.ARCADE);
	this.hitBox1.body.setSize(15, 15);
	
	this.hitBox2 = this.game.add.sprite(this.x, this.y, null);
	this.game.physics.enable(this.hitBox2, Phaser.Physics.ARCADE);
	this.hitBox2.body.setSize(15, 15);
	
	this.flailing = false;
	this.rotateAngle = rotateAngle;
	
	this.myWorld = world;
	this.thePlayer = player;
	this.set = false;
	
	this.knockBack = 5;

	this.weapon = this.game.add.weapon(100, 'lemon');
	this.weapon.bullets.setAll('scale.x', .5);
	this.weapon.bullets.setAll('scale.y', .5);
	this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon.fireAngle = 270; // In degrees
	this.weapon.bulletSpeed = 1250;
	//this.weapon.fireRate = 1000;  Using attackCooldown instead
	this.weapon.trackSprite(this); // Has the weapon follow the player
	
	this.fireCooldown = 3500;
	this.fireCheck = 0;
}

Mob2.prototype = Object.create(Phaser.Sprite.prototype);
Mob2.prototype.update = function() {	
	this.setup();
		
	if(!this.flailing && this.detectPlayer()) {
		this.flailing = true;
		this.animations.play('flail');
	}
	else if(this.flailing && !this.detectPlayer()) {
		this.flailing = false;
		this.animations.play('idle');
	}
	else if(this.flailing) {
		if(this.game.time.now - this.fireCheck > this.fireCooldown) {
			this.fireCheck = this.game.time.now;
			this.game.time.events.add(Phaser.Timer.SECOND * .5, this.openFire, this);
		}
	}
	
	this.game.physics.arcade.overlap(this.thePlayer, this.hitBox1, this.thePlayer.determineLoser, null, this.thePlayer);
	this.game.physics.arcade.overlap(this.thePlayer, this.hitBox2, this.thePlayer.determineLoser, null, this.thePlayer);
}

Mob2.prototype.setup = function() {
	this.set = true;
	
	var killBox = this.killBox;
	killBox.anchor.set(0.5);
	var box1 = this.hitBox1;
	box1.anchor.set(0.5);
	var box2 = this.hitBox2;
	box2.anchor.set(0.5);
	
	if(this.rotateAngle == 0) {
		this.angle = 0;
		killBox.body.x = this.x - (killBox.width / 2) - 9;
		killBox.body.y = this.y - (killBox.height / 2) - 18;

		if(this.flailing) {
			if(this.animations.currentFrame.index == 0 || this.animations.currentFrame.index == 4) {
				box1.body.x = this.x - (box1.width/2) - 40;
				box1.body.y = this.y - (box1.height/2) - 22;
				
				box2.body.x = this.x - (box2.width/2) + 30;
				box2.body.y = this.y - (box2.height/2) - 22;
			}
			else if(this.animations.currentFrame.index == 1 || this.animations.currentFrame.index == 3) {
				box1.body.x = this.x - (box1.width/2) - 42;
				box1.body.y = this.y - (box1.height/2) - 10;
				
				box2.body.x = this.x - (box2.width/2) + 22;
				box2.body.y = this.y - (box2.height/2) - 30;
			}
			else if(this.animations.currentFrame.index == 2) {
				box1.body.x = this.x - (box1.width/2) - 45;
				box1.body.y = this.y - (box1.height/2) + 5;
				
				box2.body.x = this.x - (box2.width/2) + 5;
				box2.body.y = this.y - (box2.height/2) - 32;
			}
			else if(this.animations.currentFrame.index == 5 || this.animations.currentFrame.index == 7) {
				box1.body.x = this.x - (box1.width/2) - 37;
				box1.body.y = this.y - (box1.height/2) - 28;
				
				box2.body.x = this.x - (box2.width/2) + 27;
				box2.body.y = this.y - (box2.height/2) - 12;
			}
			else if(this.animations.currentFrame.index == 6) {
				box1.body.x = this.x - (box1.width/2) - 18;
				box1.body.y = this.y - (box1.height/2) - 30;
				
				box2.body.x = this.x - (box2.width/2) + 29;
				box2.body.y = this.y - (box2.height/2) + 8;
			}
		}
	}
	else if(this.rotateAngle == 90) {
		this.angle = 90;
		killBox.body.x = this.x - (killBox.width / 2) - 3;
		killBox.body.y = this.y - (killBox.height / 2) - 9;

		if(this.flailing) {
			if(this.animations.currentFrame.index == 0 || this.animations.currentFrame.index == 4) {
				box1.body.x = this.x - (box1.width/2) + 5;
				box1.body.y = this.y - (box1.height/2) - 40;
				
				box2.body.x = this.x - (box2.width/2) + 6;
				box2.body.y = this.y - (box2.height/2) + 27;
			}
			else if(this.animations.currentFrame.index == 1 || this.animations.currentFrame.index == 3) {
				box1.body.x = this.x - (box1.width/2) - 3;
				box1.body.y = this.y - (box1.height/2) - 44;
				
				box2.body.x = this.x - (box2.width/2) + 14;
				box2.body.y = this.y - (box2.height/2) + 24;
			}
			else if(this.animations.currentFrame.index == 2) {
				box1.body.x = this.x - (box1.width/2) - 18;
				box1.body.y = this.y - (box1.height/2) - 43;
				
				box2.body.x = this.x - (box2.width/2) + 18;
				box2.body.y = this.y - (box2.height/2) + 4;
			}
			else if(this.animations.currentFrame.index == 5 || this.animations.currentFrame.index == 7) {
				box1.body.x = this.x - (box1.width/2) + 15;
				box1.body.y = this.y - (box1.height/2) - 36;
				
				box2.body.x = this.x - (box2.width/2) - 5;
				box2.body.y = this.y - (box2.height/2) + 29;
			}
			else if(this.animations.currentFrame.index == 6) {
				box1.body.x = this.x - (box1.width/2) + 16;
				box1.body.y = this.y - (box1.height/2) - 20;
				
				box2.body.x = this.x - (box2.width/2) - 19;
				box2.body.y = this.y - (box2.height/2) + 28;
			}
		}
	}
	else if(this.rotateAngle == 180) {
		this.angle = 180;
		killBox.body.x = this.x - (killBox.width / 2) - 9;
		killBox.body.y = this.y - (killBox.height / 2) - 4;

		if(this.flailing) {
			if(this.animations.currentFrame.index == 0 || this.animations.currentFrame.index == 4) {
				box1.body.x = this.x - (box1.width/2) - 43;
				box1.body.y = this.y - (box1.height/2) + 5;
				
				box2.body.x = this.x - (box2.width/2) + 28;
				box2.body.y = this.y - (box2.height/2) + 5;
			}
			else if(this.animations.currentFrame.index == 1 || this.animations.currentFrame.index == 3) {
				box1.body.x = this.x - (box1.width/2) - 35;
				box1.body.y = this.y - (box1.height/2) + 15;
				
				box2.body.x = this.x - (box2.width/2) + 27;
				box2.body.y = this.y - (box2.height/2) - 6;
			}
			else if(this.animations.currentFrame.index == 2) {
				box1.body.x = this.x - (box1.width/2) - 17;
				box1.body.y = this.y - (box1.height/2) + 15;
				
				box2.body.x = this.x - (box2.width/2) + 28;
				box2.body.y = this.y - (box2.height/2) - 17;
			}
			else if(this.animations.currentFrame.index == 5 || this.animations.currentFrame.index == 7) {
				box1.body.x = this.x - (box1.width/2) - 43;
				box1.body.y = this.y - (box1.height/2) - 8;
				
				box2.body.x = this.x - (box2.width/2) + 20;
				box2.body.y = this.y - (box2.height/2) + 13;
			}
			else if(this.animations.currentFrame.index == 6) {
				box1.body.x = this.x - (box1.width/2) - 42;
				box1.body.y = this.y - (box1.height/2) - 18;
				
				box2.body.x = this.x - (box2.width/2) + 4;
				box2.body.y = this.y - (box2.height/2) + 15;
			}
		}
	}
	else {
		this.angle = 270
		killBox.body.x = this.x - (killBox.width / 2) - 15;
		killBox.body.y = this.y - (killBox.height / 2) - 10;
		
		if(this.flailing) {
			if(this.animations.currentFrame.index == 0 || this.animations.currentFrame.index == 4) {
				box1.body.x = this.x - (box1.width/2) - 19;
				box1.body.y = this.y - (box1.height/2) - 40;
				
				box2.body.x = this.x - (box2.width/2) - 19;
				box2.body.y = this.y - (box2.height/2) + 27;
			}
			else if(this.animations.currentFrame.index == 1 || this.animations.currentFrame.index == 3) {
				box1.body.x = this.x - (box1.width/2) - 30;
				box1.body.y = this.y - (box1.height/2) - 35;
				
				box2.body.x = this.x - (box2.width/2) - 9;
				box2.body.y = this.y - (box2.height/2) + 28;
			}
			else if(this.animations.currentFrame.index == 2) {
				box1.body.x = this.x - (box1.width/2) - 30;
				box1.body.y = this.y - (box1.height/2) - 17;
				
				box2.body.x = this.x - (box2.width/2) + 5;
				box2.body.y = this.y - (box2.height/2) + 27;
			}
			else if(this.animations.currentFrame.index == 5 || this.animations.currentFrame.index == 7) {
				box1.body.x = this.x - (box1.width/2) - 8;
				box1.body.y = this.y - (box1.height/2) - 40;
				
				box2.body.x = this.x - (box2.width/2) - 28;
				box2.body.y = this.y - (box2.height/2) + 20;
			}
			else if(this.animations.currentFrame.index == 6) {
				box1.body.x = this.x - (box1.width/2) + 8;
				box1.body.y = this.y - (box1.height/2) - 40;
				
				box2.body.x = this.x - (box2.width/2) - 29;
				box2.body.y = this.y - (box2.height/2) + 4;
			}
		}
	}
}

Mob2.prototype.detectPlayer = function() {
	var box = this.box;
	box.body.x = this.x - box.body.width / 2;
	box.body.y = this.y - box.body.height / 2;
	
	if(this.game.physics.arcade.overlap(box, this.thePlayer)) {
		return true;
	}
	return false;
}

Mob2.prototype.openFire = function() {
	this.weapon.fireAtSprite(this.thePlayer);
}

Mob2.prototype.kills = function() {
	var x = this.x - this.thePlayer.x;
	var y = this.y - this.thePlayer.y;
	
	var dist = Math.sqrt((x*x) + (y*y))
	console.log(dist);
	
	this.thePlayer.body.velocity.x = -1*x*this.knockBack;
	this.thePlayer.body.velocity.y = -1*y*this.knockBack;
	
	this.box.kill();
	this.killBox.kill();
	this.kill();
}

Mob2.prototype.reinitialize = function() {
	this.revive();
	this.box.revive();
	this.killBox.revive();
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;
	this.body.acceleration.x = 0;
	this.body.acceleration.y = 0;
}