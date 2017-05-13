function Player(game, atlas_key, atlas_frame, x, y, world, enemies) {
//function Player(game, sprite, x, y, world, enemies) {
	Phaser.Sprite.call(this, game, x, y, atlas_key, atlas_frame);
//	Phaser.Sprite.call(this, game, x, y, sprite);
	
	this.anchor.setTo(.5,.5);
	this.game.physics.arcade.enable(this);	
	//this.animations.add('walk', Phaser.Animation.generateFrameNames('WalkLeft_MouthOpen_Purple', 1, 3, '', 1), 23, true);
	this.animations.add('walk', Phaser.Animation.generateFrameNames('player_', 1, 2, '', 0), 10, true);
	//this.animations.add('idle', ['WalkLeft_MouthOpen_Purple3'], 30, false);
		
	// Set scale and physics for character
	this.body.collideWorldBounds = true;
	this.body.maxVelocity.x = 300;
	this.body.gravity.y = 1000;
	this.body.drag.x = 450;
	this.anchor.setTo(.5, .5);
	this.scale.x = -1;
	this.scale.x = this.scale.x / 2;
	this.scale.y = this.scale.y / 2;
	this.animations.play('walk');
	
	// Character attributes
	this.jumping = false;
	this.doubleJumpd = false;
	this.facingForward = true;
	this.attackDistance = 250;	
	
	// Setting up player weapon
	this.weapon = this.game.add.weapon(3, 'spike0');
	this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon.fireAngle = 270; // In degrees
	this.weapon.bulletSpeed = 1250;
	//this.weapon.fireRate = 1000;  Using attackCooldown instead
	this.weapon.trackSprite(this); // Has the weapon follow the player

	// Cooldown Constants in milliseconds
	this.dashCooldown = 330; 
	this.gravityCooldown = 300;
	this.attackCooldown = 450;
	
	// Cooldown timers
	this.dashTimeCheck = 0;
	this.gravityTimeCheck = 0;
	this.attackTimeCheck = 0;
	
	// Dash Booleans
	this.dashingForward = false;
	this.dashingBack = false;
	this.dashingUp = false;
	this.dashingDown = false;
	this.justDashed = false;

	this.oldPosX = 0;
	this.oldPosY = 0;
	this.dashDistConst = 200;
	
	/*
	 * HITBOXES
	 */	 
	// Horizontal hitbox
	this.triggerBoxHorizontal = this.game.add.sprite(0, 0, null);
	this.game.physics.enable(this.triggerBoxHorizontal, Phaser.Physics.ARCADE);
	this.triggerBoxHorizontal.body.setSize(this.attackDistance, this.height/2);
	
	// Vertical hitbox
	this.triggerBoxVertical = this.game.add.sprite(0, 0, null);
	this.game.physics.enable(this.triggerBoxVertical, Phaser.Physics.ARCADE);
	this.triggerBoxVertical.body.setSize(Math.abs(this.width), this.attackDistance);
	
	// Key Bindings
	this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	//this.rightKey.onDown.add(this.moveRight, this);
	this.rightKey.onUp.add(this.stopMovement, this);
	
	this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	//this.leftKey.onDown.add(this.moveLeft, this);
	this.leftKey.onUp.add(this.stopMovement, this);
	
	this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.jump, this);
	this.game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(this.dash, this);
	this.game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(this.attack, this);

	this.myWorld = world;
	this.enemies = enemies;
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.update = function() {		
	this.dashChecking();
	
	if(this.game.physics.arcade.collide(this, this.myWorld.floor.children)) {
		this.touchDown();
		// cancel dash when hitting floor
		if(this.dashingDown){
			this.dashCancel();
		}
	}
	
	var cursors = this.game.input.keyboard.createCursorKeys();
	if(cursors.left.isDown){
		this.moveLeft();
	}else if(cursors.right.isDown){
		this.moveRight();
	}
	
/*
	if(this.game.physics.arcade.overlap(this.weapon.bullets, this.enemies.enemies, this.enemyHit, null, this)) {
		console.log("HIT");
	}
*/
}

Player.prototype.enemyHit = function(bullet, enemy) {
	enemy.death();
	bullet.kill();
}

Player.prototype.moveRight = function() {
	// Lets player move right when they're grounded
	// Must be editted for movement in air
	//if(this.body.touching.down) {		
	//  Move to the right
		if(this.body.velocity.x < -100){
			// tiny pull back when quick turning
			this.body.velocity.x = -50;
		}
		this.facingForward = true;
		this.scale.x = -1/2;
		this.body.acceleration.x = 600;
	//}
}

Player.prototype.moveLeft = function() {
	// Lets player move left when they're grounded
	// Must be editted for movement in air
	//if(this.body.touching.down) {		
		//  Move to the left
		if(this.body.velocity.x > 100){
			// tiny pull back when quick turning
			this.body.velocity.x = 50;
		}
		this.facingForward = false;
		this.scale.x = 1/2;
		this.body.acceleration.x = -600;
	//}
}

/*
 * IS CALLED WHEN THE LEFT AND RIGHT ARROW KEYS ARE RELEASED
 */
Player.prototype.stopMovement = function() {
	// Stops character movement when not jumping and not moving in another direction
	this.body.acceleration.x = 0;	
}

/*
 * IS CALLED WHEN THE DASH BUTTON, D, IS PRESSED - DASHES PLAYER 
 */
Player.prototype.dash = function() {
	// check dash eligibility
	if(!this.jumping || !this.doubleJumpd){
		// Tests cooldown
		if(this.game.time.now - this.dashTimeCheck > this.dashCooldown) {
			// Starts cooldown
			this.dashTimeCheck = this.game.time.now;
			var cursors = this.game.input.keyboard.createCursorKeys();	
			
			// Stops falling pre-dash
			this.oldVelx = this.body.velocity.x;
			this.oldVely = this.body.velocity.y;
			this.body.acceleration.setTo(0,0);
			this.body.gravity.y = 0;
			this.body.velocity.y = 0;
			this.body.maxVelocity.x = 1000;
			
			// Disallows dashing mid-dash
			if(!(this.dashingRight || this.dashingLeft || this.dashingUp || this.dashingDown)) {
				// Executes dash if a direction is given
				// Needs to be tuned depending on dashing mechanics
				if(cursors.right.isDown || 
				   cursors.left.isDown  || 
				   cursors.up.isDown    || 
				   cursors.down.isDown) {

					// Logs players pre-dash position
					this.oldPosX = this.position.x;
					this.oldPosY = this.position.y;
					
					// Sets the horizontal dash distance and direction 
					if(cursors.right.isDown) {
						this.dashDistanceX = -1 * this.dashDistConst;
						this.dashingRight = true;
					}
					else if(cursors.left.isDown) {
						this.dashDistanceX = this.dashDistConst;
						this.dashingLeft = true;
					}
					else {
						this.dashDistanceX = 0;
					}
					
					// Sets the vertical dash distance and direction 
					if(cursors.up.isDown) {
						this.dashDistanceY = this.dashDistConst;
						// shorten diagonal distance to match
						if(cursors.left.isDown || cursors.right.isDown){
							this.dashDistanceY /= Math.sqrt(2);
							this.dashDistanceX /= Math.sqrt(2);
						}
						this.dashingUp = true;
					}
					else if(cursors.down.isDown) {
						this.dashDistanceY = -1 * this.dashDistConst;
						// shorten diagonal distance to match
						if(cursors.left.isDown || cursors.right.isDown){
							this.dashDistanceY /= Math.sqrt(2);
							this.dashDistanceX /= Math.sqrt(2);
						}
						this.dashingDown = true;
					}
					else {
						this.dashDistanceY = 0;
					}
				}
			}
		}
	}
}

/*
 * IS CALLED WHEN THE SPACEBAR IS PRESSED - JUMPS PLAYER
 */
Player.prototype.jump = function() {
	// Executes if the player is not jumping
	if(!this.jumping || !this.doubleJumpd) {
		if(this.jumping){
			this.doubleJumpd = true;
		}else{
			this.jumping = true;
		}
		// Play jump sound
		this.game.sound.play('player_jump');
		// Jumps
		this.body.velocity.y = -500;	
	}
}

/*
 * IS CALLED ON COLLISION WITH THE FLOOR - ENDS JUMP IF NOT JUMPING
 */
Player.prototype.touchDown = function() {
	if(this.jumping) {
		this.jumping = false;
		this.doubleJumpd = false;
		var cursors = this.game.input.keyboard.createCursorKeys();
		if(!(cursors.left.isDown || cursors.right.isDown)){
			this.body.acceleration.x = 0;
		}
	}
}

/*
 * IS CALLED ON COLLISION WITH OBJECT CANCELS DASHING
 */
Player.prototype.dashCancel = function() {
	this.dashingRight = false;
	this.dashingLeft = false;
	this.dashingUp = false;
	this.dashingDown = false;
	this.justDashed = true;
}

/*
 * IS CALLED EVERY FRAME TO DO DASH CHECKING ON THE PLAYER SPRITE
 */
Player.prototype.dashChecking = function() {
	// cancel dash when hitting world edges
	if(this.dashingUp || this.dashingRight || this.dashingLeft || this.dashingDown || this.justDashed){
		if((this.dashingUp && this.body.onCeiling())||((this.dashingLeft || this.dashingRight) && this.body.onWall())){
			this.dashCancel();
			this.doubleJumpd = true;
		}
		
		/*
		 * START HORIZONTAL DASHING
		 */
		// Dashes player to the right until the dashDistance is covered
		if(this.dashingRight && this.oldPosX - this.position.x > this.dashDistanceX) {
			this.body.velocity.x = 1000;
		}
		// End the dash after the distance has been covered
		else if(this.dashingRight) {
			this.dashingRight = false;
			this.justDashed = true;
			if(this.oldVelx > 0){
				this.body.velocity.x = this.oldVelx+100;
			}else{
				this.body.velocity.x = 100;
			}

			if(this.jumping){
				this.doubleJumpd = true;
			}
		}
		
		// Dashes player to the left until the dashDistance is covered
		if(this.dashingLeft && this.oldPosX - this.position.x < this.dashDistanceX) {
			this.body.velocity.x = -1000;
		}
		// End the dash after the distance has been covered
		else if(this.dashingLeft) {
			this.dashingLeft = false;
			this.justDashed = true;
			if(this.oldVelx < 0){
				this.body.velocity.x = this.oldVelx-100;
			}else{
				this.body.velocity.x = -100;
			}

			if(this.jumping){
				this.doubleJumpd = true;
			}
		}

		/*
		 * END HORIZONTAL DASHING
		 * START VERTICAL DASHING
		 */
		
		// Dashes player down until the dashDistance is covered
		if(this.dashingDown && this.oldPosY - this.position.y > this.dashDistanceY) {
			this.body.velocity.y = 1000;
		}
		// End the dash after the distance has been covered
		else if(this.dashingDown) {
			this.dashingDown = false;
			this.justDashed = true;
			this.body.velocity.y = 300;

			if(this.doubleJumpd){
				this.doubleJumpd = false;
			}
		}
		
		// Dashes player up until the dashDistance is covered
		if(this.dashingUp && this.oldPosY - this.position.y < this.dashDistanceY) {
			this.body.velocity.y = -1000;
		}
		// End the dash after the distance has been covered
		else if(this.dashingUp) {
			this.dashingUp = false;
			this.justDashed = true;
			this.body.velocity.y = -100;

			if(this.jumping){
				this.doubleJumpd = true;
			}else{
				this.jumping = true;
			}
		}
		/*
		 * END VERTICAL DASHING
		 */
	 
		// Ends dash
		if(this.justDashed) {
			this.gravityTimeCheck = this.game.time.now;
			this.body.maxVelocity.x = 300;
			this.justDashed = false;
		}
		
		if(this.game.time.now - this.gravityTimeCheck > this.gravityCooldown) {
			this.body.gravity.y = 1000;
		}
	}
}

Player.prototype.attack = function() {
	if(this.game.time.now - this.attackTimeCheck > this.attackCooldown) {
		// Starts cooldown
		this.attackTimeCheck = this.game.time.now;

		let cursors = this.game.input.keyboard.createCursorKeys();
		var triggerBox = null;

		// Angles are mirrored across the the X-axis. Its fucking me up a bit to be honest
		if(cursors.right.isDown) {
			this.weapon.fireAngle = 0;
			
			triggerBox = this.triggerBoxHorizontal;
			triggerBox.anchor.setTo(0,.5);
			triggerBox.body.x = this.x + this.width/2;
			triggerBox.body.y = this.y - this.height/4;
			
			if(cursors.down.isDown && this.jumping) {
				this.weapon.fireAngle = 45;
			}
		}
		else if(cursors.left.isDown) {
			this.weapon.fireAngle = 180;
			
			triggerBox = this.triggerBoxHorizontal;
			triggerBox.anchor.setTo(1,.5);
			triggerBox.body.x = this.x - this.width/2 - this.attackDistance;
			triggerBox.body.y = this.y - this.height/4;
			
			if(cursors.down.isDown && this.jumping) {
				this.weapon.fireAngle = 135;
			}
		}
		else if(cursors.down.isDown) {
			this.body.velocity.y = -325;
			this.weapon.fireAngle = 90;
			
			triggerBox = this.triggerBoxVertical;
			triggerBox.anchor.setTo(.5, 1);
			triggerBox.body.x = this.x;
			triggerBox.body.y = this.y - this.height/2;
		}
		else if(this.facingForward) {
			this.weapon.fireAngle = 0;
			
			triggerBox = this.triggerBoxHorizontal;
			triggerBox.anchor.setTo(0,.5);
			triggerBox.body.x = this.x + this.width/2;
			triggerBox.body.y = this.y - this.height/4;
		}
		else {
			this.weapon.fireAngle = 180;
			
			triggerBox = this.triggerBoxHorizontal;
			triggerBox.anchor.setTo(1,.5);
			triggerBox.body.x = this.x - this.width/2 - this.attackDistance;
			triggerBox.body.y = this.y - this.height/4;
		}
		
		if(this.game.physics.arcade.overlap(triggerBox, this.enemies.enemies.children, this.targeting, null, this)) {
			console.log("TriggerBox has hit an enemy. Targeting enemy");
		}
		else {
			this.weapon.fire();
		}			
	}
}

Player.prototype.targeting = function(triggerBox, enemy) {
	this.weapon.fireAtSprite(enemy);
}