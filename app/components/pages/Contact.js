var React = require('react');
var Router = require('react-router');
var State = Router.State;
var Fluxxor = require('fluxxor');

var Contact = React.createClass({
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
            <div className="col-xs-12">
              <div className="jumbotron">
                <h1>Contact!!</h1>
              </div>
            </div>
          </div>
        </div>
    );
  }
});

module.exports = Contact;
