var React = require('react');
var Router = require('react-router');
var State = Router.State;
var Fluxxor = require('fluxxor');

// Components
var Container = require('./Container');
var Header = require('./Header');
var CountrySelector = require('./CountrySelector');
var Person = require('./Person');

var PersonContainer = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('people'),
    State
  ],

  getStateFromFlux: function() {
    var params = this.getParams();
    return {
      idPerson : params.idPerson
    };
  },
  render: function() {
    return (
        <Container>
          <Header current="home"></Header>
          <div className="container">
            <div className="row">
              <div className="col-xs-3">
                <CountrySelector></CountrySelector>
              </div>
              <div className="col-xs-9">
                <Person idPerson={this.state.idPerson}></Person>
              </div>
            </div>
          </div>
        </Container>
    );
  }
});

module.exports = PersonContainer;
