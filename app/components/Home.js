var React = require('react');
var Router = require('react-router');
var State = Router.State;
var Fluxxor = require('fluxxor');

// Components
var Container = require('./Container');
var Header = require('./Header');
var CountrySelector = require('./CountrySelector');
var PeopleList = require('./PeopleList');

var Home = React.createClass({
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
          <Header current="home"></Header>
          <div className="container">
            <div className="row">
              <div className="col-xs-3">
                <CountrySelector></CountrySelector>
              </div>
              <div className="col-xs-9">
                <PeopleList></PeopleList>
              </div>
            </div>
          </div>
        </Container>
    );
  }
});

module.exports = Home;
