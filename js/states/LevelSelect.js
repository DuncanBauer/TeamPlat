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
		this.times = this.game.add.group();
		
		// Create start this.game button
		var button = this.game.add.button(this.game.world.centerX, 100, 'lvl1button', this.playLevel1, this);
		button.anchor.set(.5);
		this.buttons.create(button);
		
		this.temp = 0;
		var time;
		if(this.game.legs[0] != null && this.game.legs[0] != undefined) {
			this.game.time.events.add(Phaser.Timer.SECOND*1, this.spawnLeg, this);
			
			time = this.times.add(this.game.add.text(this.game.world.centerX + button.width / 2 + 100, 100, (this.game.times[0]/1000)));
			time.anchor.set(.5)
		}
		
		//if(this.game.levelsComplete[0]) {
			button = this.game.add.button(this.game.world.centerX, 210, 'bossFightButton', this.playBoss, this);
			button.anchor.set(.5);
			this.buttons.create(button);
		//}
	},
	
	update: function() {
	},
	
	spawnLeg: function() {
		console.log("enetered");
		var leg = this.legs.add(new Leg(this.game, 'leg', this.game.world.centerX - this.buttons.children[0].width / 2 - 180 - (this.temp * 64), 120));
		leg.anchor.set(.5);
		leg.scale.x *= 1.5;
		leg.scale.y *= 1.5;
		this.legs.create(leg);
		this.temp++;
		if(this.temp < this.game.legs[0]) {
			this.game.time.events.add(Phaser.Timer.SECOND*1, this.spawnLeg, this);
		}
	},
	
	playLevel1: function() {
		this.game.sound.stopAll();
		this.game.state.start('Game');
	},
	
	render: function() {
		//this.game.debug.cameraInfo(this.game.camera, 32, 32);
	},
	
	playBoss: function() {
		this.game.sound.stopAll();
		this.game.state.start('BossFight');
	}
}
