var FluxxorTestUtils = require('fluxxor-test-utils');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Header = require('../../../app/components/widgets/Header');
var stubComponent = require('../../helper/stubComponent');
var stubRouterContext = require('../../helper/stubRouterContext');

describe('Header Widget', function() {
  var fakeFlux;
  var component;

  beforeEach(function() {
    this.original = {
      MenuItem: Header.__get__('MenuItem'),
      Logo: Header.__get__('Logo')
    };

    this.stubbed = {
      MenuItem: React.createClass({
        render: function() {
          var className = this.props.current === this.props.to ? 'active' : '';
          return (
              <li className={className}>
                <span className='stub-to'>{this.props.to}</span>
                <span className='stub-name'>{this.props.name}</span>
              </li>
          );
        }
      }),
      Logo: stubComponent()
    };

    Header.__set__({
      MenuItem: this.stubbed.MenuItem,
      Logo: this.stubbed.Logo
    });
  });

  afterEach(function() {
    Header.__set__({
      MenuItem: this.original.MenuItem,
      Logo: this.original.Logo
    });
  });

  afterEach(function(done) {
    React.unmountComponentAtNode(document.body);
    document.body.innerHTML = '';
    setTimeout(done);
  });

  /**
   * TODO
   * In this test there are a lot of warning to understand and solve!!!
   */
  it('Set the "people" item', function() {
    var Element = stubRouterContext(Header, {}, {
      getCurrentRoutes: function() {
        return [
          {name: 'people'}
        ];
      }
    });
    component = TestUtils.renderIntoDocument(<Element />);
    var liElements = TestUtils.findRenderedDOMComponentWithClass(component, 'active');
    expect(TestUtils.findRenderedDOMComponentWithClass(liElements, 'stub-to').getDOMNode().textContent).toBe('people');
    expect(TestUtils.findRenderedDOMComponentWithClass(liElements, 'stub-name').getDOMNode().textContent).toBe('People');
  });

  /**
   * TODO
   * In this test there are a lot of warning to understand and solve!!!
   */
  it('Set the "about" item', function() {
    var Element = stubRouterContext(Header, {}, {
      getCurrentRoutes: function() {
        return [
          {name: 'about'}
        ];
      }
    });
    component = TestUtils.renderIntoDocument(<Element />);
    var liElements = TestUtils.findRenderedDOMComponentWithClass(component, 'active');
    expect(TestUtils.findRenderedDOMComponentWithClass(liElements, 'stub-to').getDOMNode().textContent).toBe('about');
    expect(TestUtils.findRenderedDOMComponentWithClass(liElements, 'stub-name').getDOMNode().textContent).toBe('About');
  });

  /**
   * TODO
   * In this test there are a lot of warning to understand and solve!!!
   */
  it('Set a non existent  item', function() {
    var Element = stubRouterContext(Header, {}, {
      getCurrentRoutes: function() {
        return [
          {name: 'foo'}
        ];
      }
    });
    component = TestUtils.renderIntoDocument(<Element />);
    var liElements = TestUtils.findRenderedDOMComponentWithClass(component, 'active');
    expect(TestUtils.findRenderedDOMComponentWithClass(liElements, 'stub-to').getDOMNode().textContent).toBe('people');
    expect(TestUtils.findRenderedDOMComponentWithClass(liElements, 'stub-name').getDOMNode().textContent).toBe('People');
  });
});
