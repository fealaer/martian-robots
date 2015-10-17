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

    it('should properly move based on the current orientation', function () {
      function testMoveToDirection(direction, expectedX, expectedY) {
        var robotN = new Robot(2, 2, direction);
        robotN.move();
        expect(robotN.x).toEqual(expectedX);
        expect(robotN.y).toEqual(expectedY);
        expect(robotN.orientation).toEqual(direction);
      }
      testMoveToDirection('N', 2, 3);
      testMoveToDirection('E', 3, 2);
      testMoveToDirection('S', 2, 1);
      testMoveToDirection('W', 1, 2);
    });

    it('should properly rotate based on the current orientation and the passed instruction', function () {
      function testRotationTo(instruction, orientation, expectedOrientation) {
        var robotN = new Robot(2, 2, orientation);
        robotN.rotate(instruction);
        expect(robotN.orientation).toEqual(expectedOrientation);
      }
      testRotationTo('L', 'N', 'W');
      testRotationTo('L', 'W', 'S');
      testRotationTo('L', 'S', 'E');
      testRotationTo('L', 'E', 'N');

      testRotationTo('R', 'N', 'E');
      testRotationTo('R', 'E', 'S');
      testRotationTo('R', 'S', 'W');
      testRotationTo('R', 'W', 'N');
    });
  });

})();
