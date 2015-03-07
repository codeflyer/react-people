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
    return {
      currentCountry: this.getFlux().store('people').getCurrentCountry()
    };
  },
  render: function() {
    return (
        <table className="table striped-table">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Surname</th>
          </tr>
          <tbody>
          {this.getFlux().store('people').getPeopleByCountry(this.state.currentCountry).map(function(result) {
            return <PeopleListItem key={'res-' + result.id} person={result}></PeopleListItem>;
          })}
          </tbody>
        </table>
    );
  }
});

module.exports = PeopleList;
