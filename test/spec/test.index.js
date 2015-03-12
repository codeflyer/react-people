'use strict';

var React = require('react/addons');
var ReactTestUtils;

describe('Useless test', function() {
  beforeEach(function() {
    ReactTestUtils = React.addons.ReactTestUtils;
  });

  it('Abvious test - true is true', function() {
    expect(true).toBe(true);
  });
});