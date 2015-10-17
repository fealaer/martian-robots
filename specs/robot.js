(function () {
  'use strict';

  var Robot = require('../src/robot.js');

  describe('Robot', function () {
    it('should initialise robot with given coordinates and an orientation', function () {
      var robot = new Robot(5, 3, 'N');
      expect(robot.x).toEqual(5);
      expect(robot.y).toEqual(3);
      expect(robot.orientation).toEqual('N');
    });
  });

})();
