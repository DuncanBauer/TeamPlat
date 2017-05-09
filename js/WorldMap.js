var World = function(game) {
	this.floor = game.add.group();
	this.floor.enableBody = true;
	this.game = game;
};
	
World.prototype = {
	loadFloor: function(){
		for(i=0; i<1000/64; i+=1){
			let temp = this.floor.create(32 + (i * 64), 568, 'tile_atlas', 'WaveCandy_Square');		
			temp.anchor.setTo(.5, .5);
			temp.enableBody = true;
			temp.body.immovable = true;
			this.game.physics.enable(temp, Phaser.Physics.ARCADE);
		}		
	
		for(i=0; i<1000/64; i+=1){
			let temp = this.floor.create(800 + (i * 64), 368, 'tile_atlas', 'WaveCandy_Square');		
			temp.anchor.setTo(.5, .5);
			temp.enableBody = true;
			temp.body.immovable = true;
			this.game.physics.enable(temp, Phaser.Physics.ARCADE);
		}
	}
}

