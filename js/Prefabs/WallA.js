function WallA(game, atlas, frame, tileCount) {
	Phaser.Group.call(this, game);
	this.game = game;
	this.createWall(atlas, frame, tileCount);
};

WallA.prototype = Object.create(Phaser.Group.prototype);
WallA.prototype.constructor = WallA;

WallA.prototype.createWall = function(atlas, frame, tileCount) {
	for(i=0; i<tileCount; i+=1) {
		let rand = Math.floor(Math.random() * 3);
		let temp = this.add(new Tile(this.game, atlas, frame, 32, 568 + (i * 32), 0.5, 0.5, (rand * Math.PI/2)));
		this.game.physics.arcade.enable(temp);
		temp.body.checkCollision.up = false;
		temp.body.checkCollision.down = false;
	}
}

