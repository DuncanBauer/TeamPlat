function Boss(game, atlas_key, atlas_frame, x, y, world, player) {
	Phaser.Sprite.call(this, game, x, y, atlas_key, atlas_frame);

	this.ogX = x;
	this.ogY = y;
	
	this.game.physics.enable(this, Phaser.Physics.ARCADE);
	
	//this.animations.add('flail', Phaser.Animation.generateFrameNames('robobitch', 0, 7, '', 1), 15, true);
	//this.animations.add('idle', ['robobitch0'], 30, false);
	
	this.animations.add('idle', ['bossbot0'], 30, false);
	this.animations.add('charge', ['bossbot2'], 30, false);	
	this.animations.add('invincible', ['bossbot0'], 30, true);
	this.animations.add('control', ['bossbot5'], 30, true);
	this.animations.add('smash', ['bossbot6','bossbot7','bossbot8','bossbot9','bossbot5',], 30, false);
	this.animations.add('fire', ['bossbot3', 'bossbot4'], 15, false)
	this.animations.add('death', ['bossbot12','bossbot13','bossbot14','bossbot15','bossbot16','bossbot17'], 15, false);
	this.animations.add('bobble', ['bossbot0','bossbot10','bossbot0','bossbot11'], 20, true);
	this.animations.add('flail', ['bossbot0','bossbot1','bossbot2','bossbot3','bossbot4','bossbot5','bossbot6','bossbot7','bossbot8','bossbot9',
 'bossbot10','bossbot11','bossbot12','bossbot13','bossbot14','bossbot15','bossbot16','bossbot17'], 3, true);
		
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 1000;
	this.body.drag.x = 600;
	this.body.maxVelocity.x = 500;
	this.anchor.set(.5);
	this.scale.x = this.scale.x;
	this.scale.y = this.scale.y;
	this.animations.play('idle');
	
	this.body.onWorldBounds = new Phaser.Signal();
	this.body.onWorldBounds.add(this.hitWorldBounds, this);
	
	this.chargeBox1 = this.game.add.sprite(this.x, this.y, null);
	this.game.physics.enable(this.chargeBox1, Phaser.Physics.ARCADE);
	this.chargeBox1.body.setSize(50, 100);
	this.chargeBox1.anchor.set(0.5);
	
	this.chargeBox2 = this.game.add.sprite(this.x, this.y, null);
	this.game.physics.enable(this.chargeBox2, Phaser.Physics.ARCADE);
	this.chargeBox2.body.setSize(50, 100);
	this.chargeBox2.anchor.set(0.5);

	this.chargeBox3 = this.game.add.sprite(this.x, this.y, null);
	this.game.physics.enable(this.chargeBox3, Phaser.Physics.ARCADE);
	this.chargeBox3.body.setSize(75, 40);
	this.chargeBox3.anchor.set(0.5);
	
	this.myWorld = world;
	this.thePlayer = player;
	this.inAction = false;
	this.set = false;
	
	this.charging = false;
	this.chargeRight = true;
	this.chargeSpeed = 600;
	
	this.firing = false;
	
	this.idling = false;
	this.idleLeft = null;
	this.idleSpeed = 200;
	
	this.minionCount = 0;
	
	this.disabled = true;

	this.inControl = false;
	
	this.weapon = this.game.add.weapon(100, 'lemon');
	this.weapon.bullets.setAll('scale.x', .5);
	this.weapon.bullets.setAll('scale.y', .5);
	this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon.fireAngle = 270; // In degrees
	this.weapon.bulletSpeed = 900;
	//this.weapon.fireRate = 1000;  Using attackCooldown instead
	//this.weapon.trackSprite(this); // Has the weapon follow the player
	
	this.weapon1 = this.game.add.weapon(100, 'lemon');
	this.weapon1.bullets.setAll('scale.x', .5);
	this.weapon1.bullets.setAll('scale.y', .5);
	this.weapon1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon1.fireAngle = 270; // In degrees
	this.weapon1.bulletSpeed = 900;
	//this.weapon1.fireRate = 1000;  Using attackCooldown instead
	//this.weapon1.trackSprite(this); // Has the weapon follow the player
	
	this.fire_sound = this.game.add.audio('boss_firing');
	this.fire_sound.loop = false;
	this.fire_sound.volume = 2;	
	
	this.death_sound = this.game.add.audio('boss_explode');
	this.death_sound.loop = false;
	this.death_sound.volume = 2;	
}

Boss.prototype = Object.create(Phaser.Sprite.prototype);
Boss.prototype.update = function() {
	this.game.physics.arcade.collide(this, this.myWorld.ground.children);
	
	this.setup();

	if(!this.thePlayer.invincible) {
		this.game.physics.arcade.overlap(this.thePlayer, this.weapon.bullets, this.thePlayer.stupidPlayer2, null, this.thePlayer);
		this.game.physics.arcade.overlap(this.thePlayer, this.weapon1.bullets, this.thePlayer.stupidPlayer2, null, this.thePlayer);
		
		if(this.charging) {
			this.game.physics.arcade.collide(this.thePlayer, this.chargeBox1, this.thePlayer.determineLoser, null, this.thePlayer);
			this.game.physics.arcade.collide(this.thePlayer, this.chargeBox2, this.thePlayer.determineLoser, null, this.thePlayer);
		}
	}
	
	if(this.charging) {
		this.letsCharge();
	}
	else if(this.firing) {
		this.fire();
	}
	else if(this.idling) {
		this.idleTime();
	}
	else if(this.disabled || this.inControl) {
	}
}

Boss.prototype.determineMove = function() {
	var nextAttack = 0;
	var rand = Math.floor(Math.random() * 3);
	
	if(rand < 1) {
		nextAttack = 0;
	}
	else if(rand >= 1 && rand < 2) {
		nextAttack = 1;
	}
	else if(rand >= 2) {
		nextAttack = 2;
	}
	
	nextAttack = 1;

	if(nextAttack == 0){
		this.game.time.events.add(Phaser.Timer.SECOND*2, this.charge, this);
	}
	else if(nextAttack == 1) {
		this.game.time.events.add(Phaser.Timer.SECOND*2, this.openFire, this);
	}
	else if(nextAttack == 2) {
		this.game.time.events.add(Phaser.Timer.SECOND*1.4, this.control, this);
	}
}

Boss.prototype.control = function() {
	this.inControl = true;
	//this.game.time.events.add(Phaser.Timer.SECOND*2, this.determineMove, this);
	this.idling = false;
	this.animations.play('control');
	this.game.time.events.add(Phaser.Timer.SECOND*2, this.myWorld.callMinions, this.myWorld);
}

Boss.prototype.idle = function() {
	this.idling = true;
	var x = Math.floor(Math.random() * 2);
	if(x) {
		this.idleLeft = false;
	}
	else {
		this.idleLeft = true;
	}
}

Boss.prototype.idleTime = function() {
	if(this.animations.currentFrame.index == this.animations.frameTotal-1) {
		this.animations.play('idle');
	}
}

Boss.prototype.openFire = function() {
	this.firing = true;
	this.idling = false;
	this.body.acceleration.x = 0;
	this.animations.play('fire');
	
	this.fireY = this.y - 600;
	this.fireX1 = this.x - 800;
	this.fireX2 = this.x + 800;
	
	this.weapon.x = this.x + this.width/2 - 8;
	this.weapon.y = this.y - 25;
	this.weapon1.x = this.x - this.width/2 + 8;
	this.weapon1.y = this.y - 25;
	
	this.fire_sound.play();
	this.game.time.events.add(Phaser.Timer.SECOND*1.3, this.ceaseFire, this);
}

Boss.prototype.fire = function() {
	this.weapon.fireAtXY(this.fireX2, this.fireY);

	this.weapon1.fireAtXY(this.fireX1, this.fireY);
	this.fireY += 15;
}

Boss.prototype.ceaseFire = function() {
	this.firing = false;
	this.game.time.events.add(Phaser.Timer.SECOND*2, this.determineMove, this);
}

Boss.prototype.charge = function() {
	this.animations.play('charge');
	this.charging = true;
	this.idling = false;
	
	var x = this.thePlayer.x;
	if(x > this.x) {
		this.chargeRight = true;
		if(this.scale.x > 0) {
			this.scale.x *= -1;
		}
	}
	else {
		this.chargeRight = false;
		if(this.scale.x < 0) {
			this.scale.x *= -1;
		}
	}
	this.game.time.events.add(Phaser.Timer.SECOND*2, this.endCharge, this);
}

Boss.prototype.letsCharge = function() {
	
	if(this.chargeRight) {
		this.body.acceleration.x = this.chargeSpeed;
	}
	else {
		this.body.acceleration.x = -1 * this.chargeSpeed;
	}
	this.repoChargeHitboxes();
}

Boss.prototype.endCharge = function() {
	this.animations.play('idle');
	this.body.acceleration.x = 0;
	this.charging = false;
	this.game.time.events.add(Phaser.Timer.SECOND*2, this.determineMove, this);
}

Boss.prototype.repoChargeHitboxes = function() {
	var chargeBox;
	if(this.chargeRight) {
		chargeBox = this.chargeBox1;
		chargeBox.body.x = this.x - chargeBox.width / 2 - 100;
		chargeBox.body.y = this.y - chargeBox.height / 2 + 10;
		chargeBox.anchor.set(0.5,);
		
		chargeBox = this.chargeBox2;
		chargeBox.body.x = this.x - chargeBox.width / 2 + 60;
		chargeBox.body.y = this.y - chargeBox.height / 2 + 40;
		chargeBox.anchor.set(0.5);
	}
	else {
		chargeBox = this.chargeBox1;
		chargeBox.body.x = this.x - chargeBox.width / 2 - 100;
		chargeBox.body.y = this.y - chargeBox.height / 2 + 40;
		chargeBox.anchor.set(0.5);
		
		chargeBox = this.chargeBox2;
		chargeBox.body.x = this.x - chargeBox.width / 2 + 40;
		chargeBox.body.y = this.y - chargeBox.height / 2 + 10;
		chargeBox.anchor.set(0.5);
	}
}

Boss.prototype.hitWorldBounds = function () {
//	this.myWorld.shakeCameraLite();
}

Boss.prototype.setup = function() {
	this.set = true;
	this.disabled = false;
}

Boss.prototype.kills = function() {
	this.box.kill();
	this.killBox.kill();
	this.kill();
}
