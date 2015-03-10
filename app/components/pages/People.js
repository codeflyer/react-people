var React = require('react');
var Fluxxor = require('fluxxor');

var Router = require('react-router');
var State = Router.State;
var RouteHandler = Router.RouteHandler;

// Components
var CountrySelector = require('./../widgets/CountrySelector');

var People = React.createClass({
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
        <div className="container">
          <div className="row">
            <div className="col-xs-3">
              <CountrySelector></CountrySelector>
            </div>
            <div className="col-xs-9">
              <RouteHandler {...this.props} />
            </div>
          </div>
        </div>
    );
  }
});

module.exports = People;
