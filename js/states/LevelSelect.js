var LevelSelect = function(game) {};
LevelSelect.prototype = {
	
	create: function() {
		console.log('MainMenu: create');
		
		// Set Main menu background and adjust size
		this.bkgd = this.game.add.sprite(0, 0, 'background00');
		this.bkgd.height = 600;
		this.bkgd.width = 1000;
		this.game.world.setBounds(0, 0,1000,600);
		
		// Create buttons for main menu
		this.buttons = this.game.add.group();
		this.legs = this.game.add.group();
		
		// Create start this.game button
		var button = this.game.add.button(this.game.world.centerX, 100, 'lvl1button', this.playLevel1, this);
		button.anchor.set(.5);
		this.buttons.create(button);
		
		if(this.game.legs[0] != null && this.game.legs[0] != undefined) {
			for(let i = 0; i < this.game.legs[0]; i++) {
				var leg = this.legs.add(new Leg(this.game, 'player_atlas', 'player_1', this.game.world.centerX - button.width / 2 - 50 - (i * 64), 100));
				leg.anchor.set(.5);
			}
		}
		
		if(this.game.levelsComplete[0]) {
			button = this.game.add.button(this.game.world.centerX, 210, 'bossFightButton', this.playBoss, this);
			button.anchor.set(.5);
			this.buttons.create(button);
		}
	},
	
	playLevel1: function() {
		this.game.state.start('Game');
	},
	
	render: function() {
		this.game.debug.cameraInfo(this.game.camera, 32, 32);
	},
	
	playBoss: function() {
		this.game.state.start('BossFight');
	}
}
