function Checkpoint(game, sprite_key, frame, player, x, y){
	Phaser.Sprite.call(this, game, x, y, sprite_key, frame);

	this.animations.add('port', [0,1,2], 10, true);
	this.animations.add('portOn', [3,4,5], 10, true);
	this.animations.play('port');
	
	this.portOn = false;
	
	this.game.physics.arcade.enable(this);
	this.id = x*y;
	this.player = player;
	
	this.scale.x *=.5;
	this.scale.y *=.5;
	
	this.port_sound = this.game.add.audio('portal');
	this.port_sound.loop = false;
	this.port_sound.volume = 3;
}

Checkpoint.prototype = Object.create(Phaser.Sprite.prototype);
Checkpoint.prototype.update = function() {

	if(this.game.physics.arcade.overlap(this, this.player)){
		if(this.id != this.player.checkpointID){
			if(!this.portOn){
				this.port_sound.play();
				this.portOn = true;
				this.animations.play('portOn');
			}
			
			this.player.checkpointX = this.x;
			this.player.checkpointY = this.y;
			this.player.checkpointID = this.id;
		}
	}

	if(this.portOn && this.player.checkpointID != this.id) {
		this.portOn = false;
		this.animations.play('port')
	}
}
