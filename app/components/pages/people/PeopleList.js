var React = require('react');
var Router = require('react-router');
var State = Router.State;
var Fluxxor = require('fluxxor');

// Components
var Link = Router.Link;

var PeopleListItem = React.createClass({
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
        <tr key={'res-' + this.props.person.id}>
          <td>{this.props.person.id}</td>
          <td>{this.props.person.firstName}</td>
          <td>{this.props.person.lastName}</td>
          <td>
            <button className='btn'>
              <Link  to='person' params={{idPerson: this.props.person.id}}>View</Link>
            </button>
          </td>
        </tr>
    );
  }
});

var PeopleList = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('people'),
    State
  ],
  getStateFromFlux: function() {
    var currentCountry = this.getFlux().store('people').getCurrentCountry();
    return {
      currentCountry: currentCountry,
      people: this.getFlux().store('people').getCurrentPeopleList()
    };
  },
  render: function() {
    if (this.state.people == null) {
      return <div>LOADING...</div>
    }
    if (this.state.people.length === 0) {
      return <div>No people from {this.state.currentCountry}</div>
    }
    return (
        <table className="table striped-table">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Surname</th>
          </tr>
          <tbody>
          {this.state.people.map(function(result) {
            return <PeopleListItem key={'res-' + result.id} person={result}></PeopleListItem>;
          })}
          </tbody>
        </table>
    );
  }
});

module.exports = PeopleList;
