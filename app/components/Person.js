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
  componentWillMount : function() {
    this.setState({
      person: null
    });
    var params = this.getParams();
    this.getFlux().store('people').handleChangePerson(params.idPerson);
  },
  getStateFromFlux: function() {
    return {
      person: this.getFlux().store('people').getCurrentPerson()
    };
  },
  render: function() {
    if (this.state.person == null) {
      return <div>LOADING...</div>
    }
    return (
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
    );
  }
});

module.exports = Person;
