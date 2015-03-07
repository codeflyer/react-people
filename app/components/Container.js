var React = require('react');

var Container = React.createClass({
  render: function() {
    var divStyles = {
        maxWidth : 1000
    };
    return (
        <div className="container-fluid" style={divStyles}>
        {this.props.children}
        </div>
    );
  }
});

module.exports = Container;
