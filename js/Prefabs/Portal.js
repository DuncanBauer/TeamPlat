function Portal(game, sprite_key, frame, player, x, y, state, currLevel){
	Phaser.Sprite.call(this, game, x, y, sprite_key, frame);

	this.animations.add('portOn', [3,4,5], 10, true);
	this.animations.play('portOn');
	
	this.anchor.set(0.5);
	
	this.game.physics.arcade.enable(this);
	this.id = x*y;
	this.player = player;
	this.state = state
	this.currLevel = currLevel
	
	this.scale.x *=.5;
	this.scale.y *=.5;

	this.port_sound = this.game.add.audio('portal');
	this.port_sound.loop = true;
	this.port_sound.volume = 0;
	this.port_sound.play();
	
	this.box = this.game.add.sprite(this.x, this.y, null);
	this.game.physics.enable(this.box, Phaser.Physics.ARCADE);
	this.box.body.setSize(600, 600);
	this.box.anchor.set(0.5);
}

Portal.prototype = Object.create(Phaser.Sprite.prototype);
Portal.prototype.update = function() {
	if(this.game.physics.arcade.overlap(this, this.player)){
		this.game.levelsComplete[this.currLevel] = true;
		this.game.legs[this.currLevel] = this.player.legs;
		this.game.times[this.currLevel] = this.game.time.now - this.player.runTime;
		this.player.myWorld.bg_music.stop();
		this.port_sound.stop();
		this.game.state.start('LevelSelect');
	}
	
	var x = this.x - this.player.x;
	var y = this.y - this.player.y;
	var dist = Math.sqrt((x*x) + (y*y));
	if(dist > 400 && dist < 600) {
		this.port_sound.volume = 1;
	}
	else if(dist > 200 && dist < 400) {
		this.port_sound.volume = 2;
	}
	else if(dist > 0 && dist < 200) {
		this.port_sound.volume = 3;
	}
	else {
		this.port_sound.volume = 0;
	}
}
