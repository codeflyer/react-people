var Router = require('react-router');
var Fluxxor = require('fluxxor');

var React = require('react');
var Link = Router.Link;
var State = Router.State;

var MenuItem = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    State
  ],
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
    Fluxxor.FluxMixin(React),
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
            <h3 className="text-muted">React People</h3>
          </div>
          <div className="clearfix"></div>
        </div>
    );
  }
});

module.exports = Header;
