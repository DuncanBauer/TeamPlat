function Checkpoint(game, sprite_key, player, x, y){
	Phaser.Sprite.call(this, game, x, y, sprite_key);

	this.game.physics.arcade.enable(this);
	this.id = x*y;
	this.player = player;

}

Checkpoint.prototype = Object.create(Phaser.Sprite.prototype);
Checkpoint.prototype.update = function() {

	if(this.game.physics.arcade.overlap(this, this.player)){
		if(this.id != this.player.checkpointID){
			this.player.checkpointX = this.x;
			this.player.checkpointY = this.y;
			this.player.checkpointID = this.id;
			console.log("Checkpoint: "+this.player.x+", "+this.player.y);
		}
	}
}