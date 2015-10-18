(function () {
  'use strict';

  var helper = require('../src/helper.js');

  describe('Helper', function () {
    it('should successfully parse a correct input', function () {
      helper.parseInput('5 3\n1 1 E\nRFRFRFRF', function (err, res) {
        expect(err).toBeNull();
        expect(res.grid.size).toEqual({x: 5, y: 3});
        expect(res.robot.status()).toEqual({x: 1, y: 1, orientation: 'E'});
        expect(res.instructions).toEqual('RFRFRFRF'.split(''));
      });

      helper.parseInput('5 3\n3 2 N\nFRRFLLFFRRFLL', function (err, res) {
        expect(err).toBeNull();
        expect(res.grid.size).toEqual({x: 5, y: 3});
        expect(res.robot.status()).toEqual({x: 3, y: 2, orientation: 'N'});
        expect(res.instructions).toEqual('FRRFLLFFRRFLL'.split(''));
      });

    });

    it('should failed to parse an empty or not full input', function () {
      helper.parseInput('', function (err, res) {
        expect(res).toBeNull();
        expect(err).toEqual('ERROR: Input is not correct! REASON: It should be exactly 3 lines of input data.\n');
      });

      helper.parseInput('5 3\n1 1 E', function (err, res) {
        expect(res).toBeNull();
        expect(err).toEqual('ERROR: Input is not correct! REASON: It should be exactly 3 lines of input data.\n5 3\n1 1 E');
      });
    });

    it('should failed to parse input with an incorrect grid data', function () {
      helper.parseInput('5 3 4\n3 2 N\nFRRF', function (err, res) {
        expect(res).toBeNull();
        expect(err).toEqual('ERROR: Input is not correct! REASON: The first line of input should be a grid size.\nA grid size consists of two integers specifying max values of X and Y the upper-right coordinates of the rectangular world.\n5 3 4');
      });

      helper.parseInput('5 \n3 2 N\nFRRF', function (err, res) {
        expect(res).toBeNull();
        expect(err).toEqual('ERROR: Input is not correct! REASON: The first line of input should be a grid size.\nA grid size consists of two integers specifying max values of X and Y the upper-right coordinates of the rectangular world.\n5 ');
      });
    });

    it('should failed to parse input with an incorrect robot position data', function () {
      helper.parseInput('5 3\n3 2\nFRRF', function (err, res) {
        expect(res).toBeNull();
        expect(err).toEqual('ERROR: Input is not correct! REASON: The second line of input should be a robot position.\nA position consists of two integers specifying the initial coordinates of the robot and an orientation (N, S, E, W), all separated by whitespace on one line.\n3 2');
      });

      helper.parseInput('5 3\n3 N\nFRRF', function (err, res) {
        expect(res).toBeNull();
        expect(err).toEqual('ERROR: Input is not correct! REASON: The second line of input should be a robot position.\nA position consists of two integers specifying the initial coordinates of the robot and an orientation (N, S, E, W), all separated by whitespace on one line.\n3 N');
      });

      helper.parseInput('5 3\n3 2 G\nFRRF', function (err, res) {
        expect(res).toBeNull();
        expect(err).toEqual('ERROR: Input is not correct! REASON: The second line of input should be a robot position.\nA position consists of two integers specifying the initial coordinates of the robot and an orientation (N, S, E, W), all separated by whitespace on one line.\n3 2 G');
      });
    });

    it('should failed to parse input with an incorrect robot instructions data', function () {
      helper.parseInput('5 3\n3 2 N\n', function (err, res) {
        expect(res).toBeNull();
        expect(err).toEqual('ERROR: Input is not correct! REASON: The third line of input should be robot instructions from the Earth.\nA robot instruction is a string of the letters "L", "R", and "F" on one line.\n');
      });

      helper.parseInput('5 3\n3 2 N\nGFLR', function (err, res) {
        expect(res).toBeNull();
        expect(err).toEqual('ERROR: Input is not correct! REASON: The third line of input should be robot instructions from the Earth.\nA robot instruction is a string of the letters "L", "R", and "F" on one line.\nGFLR');
      });
    });
  });

})();
