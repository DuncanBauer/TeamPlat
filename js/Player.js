function Player(game, atlas_key, atlas_frame, x, y, world, enemies) {
	Phaser.Sprite.call(this, game, x, y, atlas_key, atlas_frame);
	
	this.anchor.setTo(.5,.5);
	this.game.physics.arcade.enable(this);
	
	this.animations.add('walk', Phaser.Animation.generateFrameNames('WalkLeft_MouthOpen_Purple', 1, 3, '', 1), 23, true);
	this.animations.add('idle', ['WalkLeft_MouthOpen_Purple3'], 30, false);
		
	// Set scale and physics for character
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 1000;
	this.body.drag = 50;
	this.anchor.setTo(.5, .5);
	this.scale.x = -1;
	this.scale.x = this.scale.x / 2;
	this.scale.y = this.scale.y / 2;
	this.animations.play('walk');
	
	// Character attributes
	this.jumping = false;
	this.facingForward = true;
	
	// Cooldown Constants in milliseconds
	this.dashCooldown = 330; 
	this.gravityCooldown = 300;
	
	this.dashTimeCheck = 0;
	this.gravityTimeCheck = 0;
	
	this.dashingForward = false;
	this.dashingBack = false;
	this.dashingUp = false;
	this.dashingDown = false;
	this.justDashed = false;

	this.attackForward = false;
	this.attackBack = false;
	this.attackUp = false;
	this.attackDown = false;

	this.oldPosX = 0;
	this.oldPosY = 0;
	this.dashDistConst = 200;
	
	// Key Bindings
	this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(this.moveRight, this);
	this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onUp.add(this.stopMovement, this);
	
	this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(this.moveLeft, this);
	this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onUp.add(this.stopMovement, this);
	
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

	if(this.game.physics.arcade.overlap(this, this.enemies.enemies.children)) {
		console.log("HEY! you hit me");
	}
	
}

Player.prototype.moveRight = function() {
	// Lets player move right when they're grounded
	// Must be editted for movement in air
	if(this.body.touching.down) {		
		//  Move to the right
		this.facingForward = true;
		this.scale.x = -1/2;
		this.body.velocity.x = 300;
	}
}

Player.prototype.moveLeft = function() {
	// Lets player move left when they're grounded
	// Must be editted for movement in air
	if(this.body.touching.down) {		
		//  Move to the left
		this.facingForward = false;
		this.scale.x = 1/2;
		this.body.velocity.x = -300;
	}
}

/*
 * IS CALLED WHEN THE LEFT AND RIGHT ARROW KEYS ARE RELEASED
 */
Player.prototype.stopMovement = function() {
	var cursors = this.game.input.keyboard.createCursorKeys();	
	
	// Stops character movement when not jumping and not moving in another direction
	if(!this.jumping && !(cursors.left.isDown || cursors.right.isDown)) {
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
	}
}

/*
 * IS CALLED WHEN THE DASH BUTTON, D, IS PRESSED - DASHES PLAYER 
 */
Player.prototype.dash = function() {
	// Tests cooldown
	if(this.game.time.now - this.dashTimeCheck > this.dashCooldown) {
		// Starts cooldown
		this.dashTimeCheck = this.game.time.now;
		var cursors = this.game.input.keyboard.createCursorKeys();	
		
		// Stops falling pre-dash
		this.body.gravity.y = 0;
		this.body.velocity.y = 0;
		
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
				
				/*
				 * THIS NEEDS TO BE TUNED IN THE CASE OF DIAGONAL DASHING AS IT IS A GREATER DASH DISTANCE 
				 */ 
				
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
					this.dashingUp = true;
				}
				else if(cursors.down.isDown) {
					this.dashDistanceY = -1 * this.dashDistConst;
					this.dashingDown = true;
				}
				else {
					this.dashDistanceY = 0;
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
	if(!this.jumping) {
		this.jumping = true;
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
		this.body.velocity.x = 0;
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
	if((this.dashingUp && this.body.blocked.up)||
	   (this.dashingLeft && this.body.blocked.left)||
	   (this.dashingRight && this.body.blocked.right)){
		this.dashCancel();
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
	}
	
	// Dashes player to the left until the dashDistance is covered
	if(this.dashingLeft && this.oldPosX - this.position.x < this.dashDistanceX) {
		this.body.velocity.x = -1000;
	}
	// End the dash after the distance has been covered
	else if(this.dashingLeft) {
		this.dashingLeft = false;
		this.justDashed = true;
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
	}
	
	// Dashes player up until the dashDistance is covered
	if(this.dashingUp && this.oldPosY - this.position.y < this.dashDistanceY) {
		this.body.velocity.y = -1000;
	}
	// End the dash after the distance has been covered
	else if(this.dashingUp) {
		this.dashingUp = false;
		this.justDashed = true;
	}
	/*
	 * END VERTICAL DASHING
	 */
 
	// Ends dash
	if(this.justDashed) {
		this.gravityTimeCheck = this.game.time.now;
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		this.justDashed = false;
	}
	
	if(this.game.time.now - this.gravityTimeCheck > this.gravityCooldown) {
		this.body.gravity.y = 1000;
	}
}

Player.prototype.attack = function() {
	var cursors = this.game.keyboard.createCursorKeys();

	if(cursors.left.isDown) { this.attackForward = true; }
	if(cursors.right.isDown) { this.attackBack = true; }
	if(cursors.up.isDown) { this.attackUp = true; }
	if(cursors.down.isDown) { this.attackDown = true; }

}
