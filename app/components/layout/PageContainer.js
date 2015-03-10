var React = require('react');
var Router = require('react-router');
var Header = require('./../widgets/Header');
var RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
  render: function() {
    return (
        <div className="container-fluid" style={{maxWidth: 1000}}>
          <Header current="people" {...this.props}></Header>
          <RouteHandler {...this.props} />
        </div>
    );
  }
});
