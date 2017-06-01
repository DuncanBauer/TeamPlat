function Boss(game, atlas_key, atlas_frame, x, y, world, player) {
	Phaser.Sprite.call(this, game, x, y, atlas_key, atlas_frame);

	this.ogX = x;
	this.ogY = y;
	
	this.game.physics.enable(this, Phaser.Physics.ARCADE);
	
	this.animations.add('flail', Phaser.Animation.generateFrameNames('robobitch', 0, 7, '', 1), 15, true);
	this.animations.add('idle', ['robobitch0'], 30, false);
		
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 1000;
	this.body.drag.x = 600;
	this.body.maxVelocity.x = 500;
	this.anchor.set(.5);
	this.scale.x = this.scale.x * 1.5;
	this.scale.y = this.scale.y * 1.5;
	this.animations.play('idle');
	
	this.body.onWorldBounds = new Phaser.Signal();
	this.body.onWorldBounds.add(this.hitWorldBounds, this);
	
	this.box = this.game.add.sprite(this.x, this.y, null);
	this.game.physics.enable(this.box, Phaser.Physics.ARCADE);
	this.box.body.setSize(700, 700);

	this.killBox = this.game.add.sprite(this.x, this.y, null);
	this.game.physics.enable(this.killBox, Phaser.Physics.ARCADE);
	this.killBox.body.setSize(20, 20);

	this.myWorld = world;
	this.thePlayer = player;
	this.inAction = false;
	this.set = false;
	
	this.charging = false;
	this.chargeRight = true;
	this.chargeSpeed = 500;
	
	this.firing = false;
	
	this.idling = true;
	this.idleLeft = null;
	this.idleSpeed = 200;
	
	this.minionCount = 0;
	
	this.weapon = this.game.add.weapon(100, 'lemon');
	this.weapon.bullets.setAll('scale.x', .5);
	this.weapon.bullets.setAll('scale.y', .5);
	this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon.fireAngle = 270; // In degrees
	this.weapon.bulletSpeed = 1250;
	//this.weapon.fireRate = 1000;  Using attackCooldown instead
	this.weapon.trackSprite(this); // Has the weapon follow the player
}

Boss.prototype = Object.create(Phaser.Sprite.prototype);
Boss.prototype.update = function() {

	//console.log(Object.values(this));
	this.game.physics.arcade.collide(this, this.myWorld.ground.children);

	if(!this.set) {
		this.setup();
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
}

Boss.prototype.determineMove = function() {	
	this.idle(); 
	
	var nextAttack = 0;
	var rand = Math.floor(Math.random() * 30);
	
	if(rand <= 11) {
		nextAttack = 0;
	}
	else if(rand > 11 && rand < 21) {
		nextAttack = 1;
	}
	else 
		if(rand >= 21) {
		nextAttack = 2;
	}
	
	if(nextAttack == 0){
		this.game.time.events.add(Phaser.Timer.SECOND*2, this.charge, this);
	}
	else if(nextAttack == 1) {
		this.game.time.events.add(Phaser.Timer.SECOND*2, this.openFire, this);
	}
	else if(nextAttack == 2) {
		//this.game.time.events.add(Phaser.Timer.SECOND*2, this.myWorld.reviveMinions, this.myWorld);
	}
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
	var vel = this.body.velocity.x;
	if(vel < 0) {		
		this.body.acceleration.x = -1 * this.idleSpeed;
	}
	else if(vel > 0){
		this.body.acceleration.x = this.idleSpeed;
	}
	else if(this.idleLeft) {
		this.body.acceleration.x = -1 * this.idleSpeed;
	}
	else {
		this.body.acceleration.x = this.idleSpeed;
	}
}

Boss.prototype.openFire = function() {
	this.firing = true;
	this.idling = false;
	this.body.acceleration.x = 0;
	this.game.time.events.add(Phaser.Timer.SECOND*1.5, this.ceaseFire, this);
}

Boss.prototype.fire = function() {
	this.weapon.fireAtSprite(this.thePlayer);
}

Boss.prototype.ceaseFire = function() {
	this.firing = false;
	this.game.time.events.add(1, this.determineMove, this);
}

Boss.prototype.charge = function() {
	this.charging = true;
	this.idling = false;
	
	var x = this.thePlayer.x;
	if(x > this.x) {
		this.chargeRight = true;
	}
	else {
		this.chargeRight = false;
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
}

Boss.prototype.endCharge = function() {
	this.body.acceleration.x = 0;
	this.charging = false;
	this.game.time.events.add(1, this.determineMove, this);
}

Boss.prototype.hitWorldBounds = function () {
	//this.endCharge();
}

Boss.prototype.setup = function() {
	this.game.time.events.add(Phaser.Timer.SECOND*3, this.determineMove, this);
	this.set = true;
	/*
	console.log("this");
	this.set = true;
	var killBox = this.killBox;
	this.killBox.anchor.setTo(0.5,0.5);
	if(!this.upsideDown) {
		killBox.body.x = this.x - killBox.width / 2 - 9;
		killBox.body.y = this.y - killBox.height / 2 - 18;
	}
	else{
		this.scale.y = this.scale.y * -1;
		killBox.body.x = this.x - killBox.width / 2 - 9;
		killBox.body.y = this.y - killBox.height / 2 - 10;
	}
	*/
}

/*
Boss.prototype.detectPlayer = function() {
	var box = this.box;
	box.body.x = this.x - box.body.width / 2;
	box.body.y = this.y - box.body.height / 2;
	
	if(this.game.physics.arcade.overlap(box, this.thePlayer)) {
		return true;
	}
}

Boss.prototype.death = function() {
	this.box.kill();
	this.killBox.kill();
	this.kill();
}
*/
