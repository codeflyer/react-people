var assign = require('react/lib/Object.assign');
var React = require('react');

var func = React.PropTypes.func;

module.exports = function(Component, props, stubs) {
  return React.createClass({
    childContextTypes: {
      makePath: func,
      makeHref: func,
      transitionTo: func,
      replaceWith: func,
      goBack: func,
      getCurrentPath: func,
      getCurrentRoutes: func,
      getCurrentPathname: func,
      getCurrentParams: func,
      getCurrentQuery: func,
      isActive: func
    },
    getChildContext: function() {
      return assign({
        makePath: function() {
        },
        makeHref: function() {
        },
        transitionTo: function() {
        },
        replaceWith: function() {
        },
        goBack: function() {
        },
        getCurrentPath: function() {
        },
        getCurrentRoutes: function() {
        },
        getCurrentPathname: function() {
        },
        getCurrentParams: function() {
          return {};
        },
        getCurrentQuery: function() {
          return {};
        },
        isActive: function() {
        }
      }, stubs);
    },
    render: function() {
      return (
          <Component {...props} />
      );
    }
  });
};