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
	this.body.bounce.y = 0.4;
	this.anchor.setTo(.5, .5);
	this.scale.x = -1;
	this.scale.x = this.scale.x / 2;
	this.scale.y = this.scale.y / 2;
	this.animations.play('walk');
	
	this.jumping = false;
	this.game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.jump, this);
	this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onUp.add(this.stop, this);
	this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onUp.add(this.stop, this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.update = function() {
	// Sets keyboard listener, listens for arrow keys
	cursors = this.game.input.keyboard.createCursorKeys();

	if(this.body.touching.down) {
		// Checks if left arrow key is pressed
		if (cursors.left.isDown) {
			//  Move to the left
			this.body.velocity.x = -300;
		}
		// Checks if right arrow key is pressed
		else if (cursors.right.isDown) {
			//  Move to the right
			this.body.velocity.x = 300;
		}
	}
}

Player.prototype.jump = function() {
	this.jumping = true;
	
	// Play jump sound
	this.game.sound.play('player_jump');
	// Jumps
	this.body.velocity.y = -500;	
}

Player.prototype.stop = function() {
	this.body.velocity.x = 0;
}

Player.prototype.floor = function() {
	this.jumping = false;
}
