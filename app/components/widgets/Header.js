var Router = require('react-router');
var React = require('react');
var Link = Router.Link;
var State = Router.State;
var Logo = require('./Logo');

var MenuItem = React.createClass({
  render: function() {
    var className = this.props.current === this.props.to ? 'active' : '';
    return (
        <li className={className}>
          <Link to={this.props.to}>{this.props.name}</Link>
        </li>
    );
  }
});

var allowedRouteName = ['people', 'about', 'contact'];
var Header = React.createClass({
  mixins: [
    State
  ],
  render: function() {
    var routes = this.getRoutes();
    var len = routes.length;
    var current = 'people';
    for (var i = 0; i < len; i++) {
      if (allowedRouteName.indexOf(routes[i].name) >= 0) {
        current = routes[i].name;
      }
    }
    return (
        <div>
          <div className="header" style={{marginBottom: 50}}>
            <ul className="nav nav-pills pull-right">
              <MenuItem name='People' to='people' current={current}></MenuItem>
              <MenuItem name='About' to='about' current={current}></MenuItem>
              <MenuItem name='Contact' to='contact' current={current}></MenuItem>
            </ul>
            <Logo></Logo>
          </div>
          <div className="clearfix"></div>
        </div>
    );
  }
});

module.exports = Header;
