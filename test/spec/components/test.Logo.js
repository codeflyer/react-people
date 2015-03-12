var FluxxorTestUtils = require('fluxxor-test-utils');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Logo = require('../../../app/components/widgets/Logo');

// 139 9 2 9

describe('Logo Widget', function() {
  var fakeFlux;
  var component;
  beforeEach(function() {
    component = TestUtils.renderIntoDocument(<Logo />);
  });

  afterEach(function(done) {
    React.unmountComponentAtNode(document.body);
    document.body.innerHTML = '';
    setTimeout(done);
  });

  it('Check the content of the element', function() {
    var heading = TestUtils.findRenderedDOMComponentWithTag(component, 'h3');
    expect(heading.getDOMNode().textContent).toBe('This is the LOGO!!');
  });

});
