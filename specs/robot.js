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

    it('should properly move based on current orientation', function () {
      function testDirection(direction, expectedX, expectedY) {
        var robotN = new Robot(2, 2, direction);
        robotN.move();
        expect(robotN.x).toEqual(expectedX);
        expect(robotN.y).toEqual(expectedY);
        expect(robotN.orientation).toEqual(direction);
      }
      testDirection('N', 2, 3);
      testDirection('E', 3, 2);
      testDirection('S', 2, 1);
      testDirection('W', 1, 2);
    });
  });

})();
