var MobManager = function(game, world) {
	this.enemies = game.add.group();
	this.enemies.enableBody = true;
	this.game = game;
	this.world = world;
};
	
MobManager.prototype = {
	spawnEnemies: function(player){
		this.enemies.add(new Mob(this.game, 
								 'character_atlas', 
								 'WalkLeft_MouthOpen_Red3', 
								 this.game.width/2 + 100, 
								 this.game.height/2,
								 this.world,
								 player));
		
	}
}

