
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    this.load.spritesheet('cabra', 'assets/graphics/cabrapng.png', 74, 57);
    this.load.spritesheet('zombie', 'assets/graphics/zombie.png', 105, 96);
    
    this.load.image('tileset', 'assets/map/tileset.png');
    this.load.tilemap('map', 'assets/map/tilemap03.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('lechuga', 'assets/graphics/lechuga.png');
    this.load.tilemap('tilemapLechuga', 'assets/map/tilemapLechuga.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tileset02', 'assets/map/tileset02.png');
    this.load.tilemap('ground', 'assets/map/tilemap02.json', null, Phaser.Tilemap.TILED_JSON);

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
