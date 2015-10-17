(function () {
  'use strict';

  var Grid = require('../src/grid.js');

  describe('Grid', function () {
    it('should initialise grid with given boundaries', function () {
      var mars = new Grid(5, 3);
      expect(mars.xmax).toEqual(5);
      expect(mars.ymax).toEqual(3);
    });

    it('should properly indicate is object off the edge or not', function () {
      var mars = new Grid(5, 3);
      expect(mars.offTheEdge(6, 2)).toBe(true);
      expect(mars.offTheEdge(4, 4)).toBe(true);
      expect(mars.offTheEdge(-1, 0)).toBe(true);
      expect(mars.offTheEdge(0, -1)).toBe(true);

      expect(mars.offTheEdge(5, 3)).toBe(false);
      expect(mars.offTheEdge(2, 2)).toBe(false);
      expect(mars.offTheEdge(0, 0)).toBe(false);
    });
  });

})();
