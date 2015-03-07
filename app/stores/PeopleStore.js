var Fluxxor = require('fluxxor');
var actions = require('../actions');

// build with https://www.mockaroo.com/
var _data = require('../data/data.json');

var NOT_FOUND_TOKEN = {};

var PeopleStore = Fluxxor.createStore({
  initialize: function() {
    var tmpCountryList = _data.map(function(item) {
      return item.country;
    });
    this.countries = tmpCountryList.filter(function(item, pos) {
      return tmpCountryList.indexOf(item) === pos;
    }).sort();

    this.currentCountry = this.countries[0];
    this.bindActions(
        actions.constants.PEOPLE.CHANGE_COUNTRY, this.handleChangeCountry
    );
  },

  getCountries: function() {
    return this.countries;
  },

  getCurrentCountry: function() {
    return this.currentCountry;
  },

  getPeopleByCountry: function(country) {
    return _data.filter(function(item, pos) {
      return item.country === country;
    });
  },

  /**
   * Don't try this at home!! :)
   */
  getPersonById: function(id) {
    var len = _data.length;
    for (var i = 0; i < len; i++) {
      if (_data[i].id === id) {
        return _data[i];
      }
    }
    return null;
  },

  handleChangeCountry: function(data) {
    this.currentCountry = data.country;
    this.flux.store('route').router.transitionTo('home', {}, {});
    this.emit('change');
  }
});

PeopleStore.NOT_FOUND_TOKEN = NOT_FOUND_TOKEN;

module.exports = PeopleStore;
