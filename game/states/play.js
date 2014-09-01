
'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {  
    // We're going to be using physics, so enable the Arcade Physics system
    // this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.ground = this.game.add.tilemap('ground');
    this.ground.addTilesetImage('tileset02');
    this.layer = this.ground.createLayer('Ground');
    this.ground.setCollisionBetween(0, 0);
    
    this.lechuga = this.game.add.tilemap('tilemapLechuga');
    this.lechuga.addTilesetImage('lechuga');
    this.layer = this.lechuga.createLayer('tileLechuga');
    this.lechuga.setCollisionBetween(0, 0);
    
    this.map = this.game.add.tilemap('map');
    this.map.addTilesetImage('tileset');
    this.layer = this.map.createLayer('tileSuelo');
    this.layer.resizeWorld();
    this.map.setCollisionBetween(0, 100);

    // To debug the tilemap
    // this.layer.debug = true;
    
    // The player and its settings
    this.player = this.game.add.sprite(57, 738, 'cabra');

    // The foo and its settings
    this.foo = this.game.add.sprite(96, 1472, 'zombie');

    // We need to enable physics on the player
    this.game.physics.arcade.enable(this.foo, Phaser.Physics.ARCADE);
    this.game.physics.arcade.enable(this.player, Phaser.Physics.ARCADE);
    this.game.camera.follow(this.player);

    // Player physics properties. Give the little guy a slight bounce.
    // this.player.body.bounce.y = 0.2;
    // this.player.body.gravity.y = 300;
    // this.player.body.collideWorldBounds = true;

    // Our two animations, walking left and right.
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    // this.foo.animations.add('left', [0, 1, 2, 3, 4, 5, 6], 14, true);
    // this.foo.animations.add('right', [7, 8, 9, 10, 11, 12, 13], 14, true);

    // Finally some lettuces to collect
    this.lettuces = this.game.add.group();

    // We will enable physics for any star that is created in this group
    // this.lettuce.enableBody = true;
    // this.map.createFromObjects('Object Layer 1', 34, 'lechuga', 0, true, false, lettuces);
    
    // Lettuces counter
    this.lettuceCounter = 12;

    // Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < this.lettuceCounter; i++) {
      // Create a star inside of the 'stars' group
      // this.star = this.stars.create(i * 70, 0, 'star');

      // Let gravity do its thing
      // this.star.body.gravity.y = 300;

      // This just gives each star a slightly random bounce value
      // this.star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    // The score
    this.game.score = 0;
    this.scoreText = this.game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#DDD' });
    this.scoreText.fixedToCamera = true;

    // Our controls.
    this.cursors = this.game.input.keyboard.createCursorKeys();
  },
  update: function() {
      
    // Collide the player and the stars with the platforms
    // this.game.physics.arcade.collide(this.player, this.platforms);
    // this.game.physics.arcade.collide(this.stars, this.platforms);
    this.game.physics.arcade.collide(this.player, this.layer);
    this.game.physics.arcade.collide(this.foo, this.layer);

    // Checks to see if the player overlaps with any of the lettuces,
    // if he does call the collectLettuce function
    this.game.physics.arcade.overlap(this.player, this.lettuces, this.collectLettuce, null, this);

    // Reset the players velocity (movement)
    this.player.body.velocity.set(0);
    this.foo.body.velocity.set(0);

//  if (this.game.physics.arcade.collide(this.foo, this.layer)) {
//    this.foo.body.velocity.x = -10;
//    this.foo.body.velocity.y = 10;
//    this.foo.animations.play('left');
//  } else {
//    this.foo.body.velocity.x = 10;
//    this.foo.body.velocity.y = 10;
//    this.foo.animations.play('right');
//  }

    if (this.cursors.left.isDown) {
      // Move to the left
      this.player.body.velocity.x = -150;
      this.player.pos = true;
      this.player.animations.play('left');
    }
    else if (this.cursors.right.isDown) {
      // Move to the right
      this.player.body.velocity.x = 150;
      this.player.pos = false;
      this.player.animations.play('right');
    }
    else if (this.cursors.up.isDown) {
      // Move up
      this.player.body.velocity.y = -150;

      if (this.player.pos) {
        this.player.animations.play('left');
      }
      else {
        this.player.animations.play('right');
      }
      
    }
    else if (this.cursors.down.isDown) {
      // Move down
      this.player.body.velocity.y = 150;

      if (this.player.pos) {
        this.player.animations.play('left');
      }
      else {
        this.player.animations.play('right');
      }
    }
    else {
      // Stand still
      this.player.animations.stop();

      if (this.player.pos) {
          this.player.frame = 4;
      }
      else {
          this.player.frame = 9;
      }
    }

  },
  collectLettuce: function(player, lettuce) {
    
    // Removes the lettuce from the screen
    lettuce.kill();
    this.counter -= 1;

    if (this.counter === 0) {
      this.game.state.start('gameover');
    }

    // Add and update the score
    this.game.score += 10;
    this.scoreText.text = 'Score: ' + this.game.score;
  },
  clickListener: function() {
    this.game.state.start('gameover');
  }
};
  
module.exports = Play;