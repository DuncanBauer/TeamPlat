var LevelSelect = function(game) {};
LevelSelect.prototype = {
	
	create: function() {
		console.log('MainMenu: create');
		
		// Set Main menu background and adjust size
		this.bkgd = this.game.add.sprite(0, 0, 'background00');
		this.bkgd.height = 600;
		this.bkgd.width = 1000;
		
		// Create buttons for main menu
		this.buttons = this.game.add.group();
		
		// Create start this.game button
		var button = this.game.add.button(this.game.world.centerX, 100, 'lvl1button', this.playLevel1, this);
		button.anchor.set(.5);
		//var btext = this.game.add.text(this.game.world.centerX, 100, "Level 1", {fontSize: '32px', fill: '#fff'});
		//btext.anchor.set(.5);
		this.buttons.create(button);
		
		//if(this.game.levelsComplete[0]) {
			button = this.game.add.button(this.game.world.centerX, 210, 'bossFightButton', this.playBoss, this);
			button.anchor.set(.5);
			//btext = this.game.add.text(this.game.world.centerX, 210, "Boss", {fontSize: '32px', fill: '#fff'});
			//btext.anchor.set(.5);
			this.buttons.create(button);
		//}
	},
	
	playLevel1: function() {
		this.game.state.start('Game');
	},
	
	render: function() {
		//this.game.debug.cameraInfo(this.game.camera, 32, 32);
	},
	
	playBoss: function() {
		this.game.state.start('BossFight');
	}
}