var Fluxxor = require('fluxxor');
var actions = require('../actions');
var CountryService = require('../services/CountryService');
var PeopleService = require('../services/PeopleService');
var NOT_FOUND_TOKEN = {};

var PeopleStore = Fluxxor.createStore({
  initialize: function() {
    this.currentCountry = null;
    this.currentPerson = null;
    this.countries = null;
    this.people = null;
    this._initCountryList();
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

  getCurrentPeopleList: function() {
    return this.people;
  },

  getCurrentPerson: function() {
    return this.currentPerson;
  },

  _changePerson: function(id) {
    this.currentPerson = null;
    var that = this;
    PeopleService.loadPersonById(id).then(
        function(person) {
          that.currentPerson = person;
          that.emit('change');
        }
    );
  },

  _changeCountry: function(country) {
    this.currentCountry = country;
    this.people = null;
    var that = this;
    PeopleService.loadPeopleList(country).then(
        function(people) {
          that.people = people;
          that.emit('change');
        }
    );
  },

  _initCountryList: function() {
    var that = this;
    CountryService.getCountryList().then(
        function(countries) {
          that.countries = countries;
          that._changeCountry(that.countries[0]);
          that.emit('change');
        }
    );
  },

  handleChangeCountry: function(data) {
    this._changeCountry(data.country);
    this.flux.store('route').router.transitionTo('home', {}, {});
    this.emit('change');
  },

  handleChangePerson: function(idPerson) {
    this._changePerson(idPerson);
    //this.emit('change');
  }
});

PeopleStore.NOT_FOUND_TOKEN = NOT_FOUND_TOKEN;

module.exports = PeopleStore;
