var  World = function() {
	this.floor = this.game.add.group();
	this.floor.enableBody = true;
};
	
World.prototype = {
	loadFloor: function(){
		this.floor.create(32, 550, 'tile_atlas', 'CandyWave_Square');		
	}
}

