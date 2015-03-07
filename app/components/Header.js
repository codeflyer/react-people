var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var State = Router.State;
var Fluxxor = require('fluxxor');

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

var Header = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    State
  ],
  propTypes: {
    current: React.PropTypes.oneOf(['home', 'about', 'contact'])
  },
  getDefaultProps: function() {
    return {
      current: 'home'
    };
  },
  render: function() {
    var divStyles = {
      marginBottom: 50
    };
    return (
        <div>
          <div className="header" style={divStyles}>
            <ul className="nav nav-pills pull-right">
              <MenuItem name='Home' to='home' current={this.props.current}></MenuItem>
              <MenuItem name='About' to='about' current={this.props.current}></MenuItem>
              <MenuItem name='Contact' to='contact' current={this.props.current}></MenuItem>
            </ul>
            <h3 className="text-muted">React People</h3>
          </div>
          <div className="clearfix"></div>
        </div>
    );
  }
});

module.exports = Header;
