
'use strict';
function Boot() {
}

Boot.prototype = {
  preload: function () {
    this.load.image('preloader', 'assets/graphics/preloader.gif');
  },
  create: function () {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;
