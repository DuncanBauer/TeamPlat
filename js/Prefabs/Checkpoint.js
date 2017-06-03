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
}

Checkpoint.prototype = Object.create(Phaser.Sprite.prototype);
Checkpoint.prototype.update = function() {

	if(this.game.physics.arcade.overlap(this, this.player)){
		if(this.id != this.player.checkpointID){
			if(!this.portOn){
				this.animations.play('portOn');
				this.portOn = true;
			}
			
			this.player.checkpointX = this.x;
			this.player.checkpointY = this.y;
			this.player.checkpointID = this.id;
			console.log("Checkpoint: "+this.player.x+", "+this.player.y);
		}
	}
	else {
		this.portOn = false;
		this.animations.play('port');
	}
}
