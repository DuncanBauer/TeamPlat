function Player(game, atlas_key, atlas_frame, x, y) {
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
	
	this.dashingForward = false;
	this.dashingBack = false;
	this.dashingUp = false;
	this.dashingDown = false;
	this.justDashed = false;

	this.oldPosX = 0;
	this.oldPosY = 0;
	
	// Key Bindings
	this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.jump, this);
	this.game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(this.dash, this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.update = function() {
	var cursors = this.game.input.keyboard.createCursorKeys();	
	
	
	// Move character based on momentum and non-standard movement keys (NOT arrow keys or WASD)
	if(this.dashingForward && this.oldPosX - this.position.x > this.newPosX) {
		this.body.velocity.x = 1000;
	}
	else if(this.dashingBack && this.oldPosX - this.position.x < this.newPosX) {
		this.body.velocity.x = -1000;
	}
	else if(this.dashingForward || this.dashingBack) {
		this.dashingForward = false;
		this.dashingBack = false;
		this.justDashed = true;
	}
	else if(!this.jumping && this.justDashed) {
		this.body.velocity.x = 0;
	}
	
	// Get regular character input so long as the player isnt airborne
	if(this.body.touching.down) {		
		// Checks if left arrow key is pressed
		if(cursors.left.isDown) {
			//  Move to the left
			this.facingForward = false;
			this.scale.x = 1/2;
			this.body.velocity.x = -300;
		}
		// Checks if right arrow key is pressed
		else if(cursors.right.isDown) {
			//  Move to the right
			this.facingForward = true;
			this.scale.x = -1/2;
			this.body.velocity.x = 300;
		}
	}
}

Player.prototype.dash = function() {
	var cursors = this.game.input.keyboard.createCursorKeys();	
	this.oldPosX = this.position.x;
	this.oldPosY = this.position.y;
	
	if(this.isDashing && 
	  (cursors.right.isDown || 
	   cursors.left.isDown || 
	   cursors.up.isDown || 
	   cursors.down.isDown)) {
		
		if(cursors.right.isDown) {
			this.newPosX = -200;
			this.dashingForward = true;;
		}
		else if(cursors.left.isDown) {
			this.newPosX = 200;
			this.dashingBack = true;
		}
	    else {
			this.newPosX = 0;
		}
		
		if(cursors.up.isDown) {
			this.newPosY = -200;
			this.dashingUp = true;
		}
		else if(cursors.down.isDown) {
			this.newPosY = 200;
			this.dashingDown = true;
		}
		else {
			this.newPosY = 0;
		}
	}
}

Player.prototype.isDashing = function() {
	return (this.dashingForward || this.dashingBack || this.dashingUp || this.dashingDown);
}

Player.prototype.jump = function() {
	if(!this.jumping) {
		this.jumping = true;
		// Play jump sound
		this.game.sound.play('player_jump');
		// Jumps
		this.body.velocity.y = -500;	
	}
}

Player.prototype.touchDown = function() {
	this.jumping = false;
}

Player.prototype.dashCancel = function() {
	this.dashing = false;
}