var React = require('react');
var Router = require('react-router');
var State = Router.State;
var Fluxxor = require('fluxxor');

// Components
var Container = require('./Container');
var Header = require('./Header');
var CountrySelector = require('./CountrySelector');

var Person = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('people'),
    State
  ],

  getStateFromFlux: function() {
    var params = this.getParams();
    return {
      person: this.getFlux().store('people').getPersonById(params.idPerson)
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
                  <dl className="dl-horizontal">
                    <dt>Id</dt>
                    <dd>{this.state.person.id}</dd>
                    <dt>Name</dt>
                    <dd>{this.state.person.firstName}</dd>
                    <dt>Surname</dt>
                    <dd>{this.state.person.lastName}</dd>
                    <dt>Gender</dt>
                    <dd>{this.state.person.gender}</dd>
                    <dt>Email</dt>
                    <dd>{this.state.person.email}</dd>
                    <dt>Country</dt>
                    <dd>{this.state.person.country}</dd>
                    <dt>SSN</dt>
                    <dd>{this.state.person.ssn}</dd>
                  </dl>
              </div>
            </div>
          </div>
        </Container>
    );
  }
});

module.exports = Person;
