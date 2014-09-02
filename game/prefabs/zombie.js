'use strict';

var Zombie = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'zombie', frame);
  
  this.game.physics.arcade.enableBody(this);
  
  // set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);
  
  // add and play animations
  this.animations.add('walkdeadleft', [0, 1, 2, 3, 4, 5, 6], 14, true);
  this.animations.add('walkdeadright', [7, 8, 9, 10, 11, 12, 13], 14, true);  
};

Zombie.prototype = Object.create(Phaser.Sprite.prototype);
Zombie.prototype.constructor = Zombie;

Zombie.prototype.update = function() {
};

Zombie.prototype.walk = function() {

  if (this.pos === false) {
    // Move to the left
    this.body.velocity.x = -150;
    this.pos = true;
    this.animations.play('walkdeadleft');
  }
  else if (this.pos === true) {
    // Move to the right
    this.body.velocity.x = 150;
    this.pos = false;
    this.animations.play('walkdeadright');
  }
  else if (this.pos === false) {
    // Move up
    this.body.velocity.y = -150;

    if (this.pos) {
      this.animations.play('walkdeadleft');
    }
    else {
      this.animations.play('walkdeadright');
    }
      
  }
  else if (this.pos) {
    // Move down
    this.body.velocity.y = 150;

    if (this.pos) {
      this.animations.play('walkdeadleft');
    }
    else {
      this.animations.play('walkdeadright');
    }
  }
};

module.exports = Zombie;
