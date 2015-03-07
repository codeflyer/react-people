var React = require('react');
var Router = require('react-router');
var State = Router.State;
var Fluxxor = require('fluxxor');

// Components
var Container = require('./Container');
var Header = require('./Header');

var About = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('people'),
    State
  ],
  getStateFromFlux: function() {
    return {};
  },
  render: function() {
    return (
        <Container>
          <Header current="about"></Header>
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="jumbotron">
                  <h1>About!!</h1>
                </div>
              </div>
            </div>
          </div>
        </Container>
    );
  }
});

module.exports = About;
