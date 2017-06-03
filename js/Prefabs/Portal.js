function Portal(game, sprite_key, frame, player, x, y, state, currLevel){
	Phaser.Sprite.call(this, game, x, y, sprite_key, frame);

	this.animations.add('portOn', [4,5,6,7], 10, true);
	this.animations.play('portOn');
	
	this.game.physics.arcade.enable(this);
	this.id = x*y;
	this.player = player;
	this.state = state
	this.currLevel = currLevel
	
	this.scale.x *=.5;
	this.scale.y *=.5;
}

Portal.prototype = Object.create(Phaser.Sprite.prototype);
Portal.prototype.update = function() {
	if(this.game.physics.arcade.overlap(this, this.player)){
		this.game.levelsComplete[this.currLevel] = true;
		this.game.legs[this.currLevel] = this.player.legs;
		this.game.state.start('LevelSelect');
	}
}
