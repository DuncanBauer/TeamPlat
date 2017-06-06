function Portal(game, sprite_key, frame, player, x, y, state, currLevel){
	Phaser.Sprite.call(this, game, x, y, sprite_key, frame);

	this.animations.add('portOn', [3,4,5], 10, true);
	this.animations.play('portOn');
	
	this.game.physics.arcade.enable(this);
	this.id = x*y;
	this.player = player;
	this.state = state
	this.currLevel = currLevel
	
	this.scale.x *=.5;
	this.scale.y *=.5;

	this.port_sound = this.game.add.audio('portal');
	this.port_sound.loop = true;
	this.port_sound.volume = 6;
	this.port_sound.play();
}

Portal.prototype = Object.create(Phaser.Sprite.prototype);
Portal.prototype.update = function() {
	if(this.game.physics.arcade.overlap(this, this.player)){
		this.game.levelsComplete[this.currLevel] = true;
		this.game.legs[this.currLevel] = this.player.legs;
		this.game.times[this.currLevel] = this.game.time.now - this.player.runTime;
		this.port_sound.stop();
		this.game.state.start('LevelSelect');
	}
}
