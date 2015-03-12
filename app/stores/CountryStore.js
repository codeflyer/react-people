var Fluxxor = require('fluxxor');
var actions = require('../actions');

var CountryStore = Fluxxor.createStore({
  initialize: function() {
    this.currentCountry = null;
    this.countries = null;
    this.bindActions(
        actions.constants.COUNTRY.CHANGE_COUNTRY, this.handleChangeCountry,
        actions.constants.COUNTRY.INIT_COUNTRY, this.handleInitCountry,
        actions.constants.COUNTRY.INIT_COUNTRY_SUCCESS, this.handleInitCountrySuccess,
        actions.constants.COUNTRY.INIT_COUNTRY_FAIL, this.handleInitCountryFail
    );
  },
  getCountries: function() {
    return this.countries;
  },
  getCurrentCountry: function() {
    return this.currentCountry;
  },
  handleChangeCountry : function(payload) {
    this.currentCountry = payload.country;
    this.emit('change');
  },
  handleInitCountry : function() {
    this.countries = [];
    this.emit('change');
  },
  handleInitCountrySuccess : function(payload) {
    this.countries = payload.countries;
    this.currentCountry = this.countries[0];
    this.flux.actions.country.changeCountry(this.currentCountry);
    this.emit('change');
  },
  handleInitCountryFail : function() {
    this.emit('change');
  }
});

module.exports = CountryStore;
