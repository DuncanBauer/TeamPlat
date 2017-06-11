function Mob(game, atlas_key, atlas_frame, x, y, world, player, rotateAngle) {
	Phaser.Sprite.call(this, game, x, y, atlas_key, atlas_frame);

	this.ogX = x;
	this.ogY = y;
	
	this.game.physics.enable(this, Phaser.Physics.ARCADE);
	
	this.animations.add('flail', Phaser.Animation.generateFrameNames('robobitch', 0, 7, '', 1), 15, true);
	this.animations.add('idle', ['robobitch0'], 30, false);
	this.animations.add('spawn', Phaser.Animation.generateFrameNames('robospawn', 0, 9, '', 1), 11, false);
	this.animations.add('death', ['robodeath0','robodeath1','robodeath2','robospawn9','robospawn8','robospawn7','robospawn6','robospawn5','robospawn4','robospawn3','robospawn2','robospawn1','robospawn0'], 11, false)
	this.animations.play('spawn');

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
	this.hitBox1.parent = this;
	
	this.hitBox2 = this.game.add.sprite(this.x, this.y, null);
	this.game.physics.enable(this.hitBox2, Phaser.Physics.ARCADE);
	this.hitBox2.body.setSize(15, 15);
	this.hitBox2.parent = this;
	
	this.flailing = false;
	this.rotateAngle = rotateAngle;
	
	this.myWorld = world;
	this.thePlayer = player;
	this.set = false;
	
	this.knockBack = 5;

	this.idle_music = this.game.add.audio('robot_idle');
	this.idle_music.loop = true;
	this.idle_music.volume = 0;
	this.idle_music.play();

	this.death_sound = this.game.add.audio('robot_explode');
	this.death_sound.loop = false;
	this.death_sound.volume = 3;
	
	this.dying = false;
}

Mob.prototype = Object.create(Phaser.Sprite.prototype);
Mob.prototype.update = function() {
	if(!this.dying) {
		this.setup();
		
		var x = this.x - this.thePlayer.x;
		var y = this.y - this.thePlayer.y;
		var dist = Math.sqrt((x*x) + (y*y));
		
		if(!this.flailing && dist <= 600) {
			this.flailing = true;
			this.animations.play('flail');
		}
		else if(this.flailing && dist > 600) {
			this.flailing = false;
			this.animations.play('idle');
		}
		else if(this.flailing) {
			if(!this.thePlayer.invincible && !this.thePlayer.dying) {
				this.game.physics.arcade.overlap(this.thePlayer, this.hitBox1, this.thePlayer.determineLoser, null, this.thePlayer);
				this.game.physics.arcade.overlap(this.thePlayer, this.hitBox2, this.thePlayer.determineLoser, null, this.thePlayer);
			}
		}
		
		if(dist > 400 && dist < 600) {
			this.idle_music.volume = 1;
		}
		else if(dist > 200 && dist < 400) {
			this.idle_music.volume = 2;
		}
		else if(dist > 0 && dist < 200) {
			this.idle_music.volume = 3;
		}
		else {
			this.idle_music.volume = 0;
		}
	}
}

Mob.prototype.setup = function() {
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

Mob.prototype.kills = function() {
	this.dying = true;
	/*
	var x = this.x - this.thePlayer.x;
	var y = this.y - this.thePlayer.y;
	
	var dist = Math.sqrt((x*x) + (y*y));
	var scale = 0;
	
	if(dist <= 100) {
		scale = 2;
	}
	else if(dist <= 200) {
		scale = 1.5;
	}
	else if(dist <= 220) {
		scale = 1;
	}
	
	if(scale > 0) {
		var angle = this.game.physics.arcade.angleBetween(this, this.thePlayer) * (180/Math.PI);
		this.game.physics.arcade.velocityFromAngle(angle, 300 * scale, this.thePlayer.body.velocity);
	}
	*/
	this.idle_music.stop();
	this.death_sound.play();
	this.animations.play('death');
	this.box.kill();
	this.killBox.kill();
	this.hitBox1.kill();
	this.hitBox2.kill();
	this.game.time.events.add(Phaser.Timer.SECOND*1.4, this.kill, this);
}

Mob.prototype.stopMusic = function() {
	this.idle_music.stop();
}

Mob.prototype.reinitialize = function() {
	this.dying = false;
	this.revive();
	this.idle_music.play();
	this.set = false;
	this.animations.play('spawn');
	this.flailing = false;
	this.box.revive();
	this.killBox.revive();
	this.hitBox1.revive();
	this.hitBox2.revive();
}
