var React = require('react');
var Router = require('react-router');
var State = Router.State;
var Fluxxor = require('fluxxor');

var CountrySelectorItem = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('country'),
    State
  ],
  getStateFromFlux: function() {
    return {
      currentCountry: this.getFlux().store('country').getCurrentCountry()
    };
  },
  handleChangeCountry: function() {
    this.getFlux().actions.country.changeCountry(this.props.country);
  },
  render: function() {
    var className = 'list-group-item';
    if (this.state.currentCountry === this.props.country) {
      className += ' active';
    }
    return <li className={className} key={this.props.country} onClick={this.handleChangeCountry}>{this.props.country}</li>;
  }
});

var CountrySelector = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('country'),
    State
  ],
  componentWillMount : function() {
    this.getFlux().actions.country.initCountries();
  },
  getStateFromFlux: function() {
    return {
      countries: this.getFlux().store('country').getCountries()
    };
  },
  render: function() {
    if (this.state.countries == null) {
      return <div>LOADING...</div>
    }
    return (
        <ul className="list-group">
                {this.state.countries.map(function(result) {
                  return <CountrySelectorItem key={result} country={result}></CountrySelectorItem>;
                })}
        </ul>
    );
  }
});

module.exports = CountrySelector;
