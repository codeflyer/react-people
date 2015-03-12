var Fluxxor = require('fluxxor');
var actions = require('../actions');

var PeopleStore = Fluxxor.createStore({
  initialize: function() {
    this.currentPerson = null;
    this.people = null;
    this.bindActions(
        actions.constants.PEOPLE.LOAD_PEOPLE_LIST, this.handleLoadPeopleList,
        actions.constants.PEOPLE.LOAD_PEOPLE_LIST_SUCCESS, this.handleLoadPeopleListSuccess,
        actions.constants.PEOPLE.LOAD_PEOPLE_LIST_FAIL, this.handleLoadPeopleListFail,
        actions.constants.PEOPLE.LOAD_PERSON, this.handleChangePerson,
        actions.constants.PEOPLE.LOAD_PERSON_SUCCESS, this.handleChangePersonSuccess,
        actions.constants.PEOPLE.LOAD_PERSON_FAIL, this.handleChangePersonFail
    );
  },
  getCurrentPeopleList: function() {
    return this.people;
  },
  getCurrentPerson: function() {
    return this.currentPerson;
  },
  handleChangePerson: function(payload) {
    this.currentPerson = null;
    this.people = null;
    this.emit('change');
  },
  handleChangePersonSuccess: function(payload) {
    this.currentPerson = payload.person;
    this.emit('change');
  },
  handleChangePersonFail: function(payload) {
    this.emit('change');
  },
  handleLoadPeopleList: function(data) {
    this.people = null;
    this.flux.store('route').router.transitionTo('people', {}, {});
    this.emit('change');
  },
  handleLoadPeopleListSuccess: function(payload) {
    this.people = payload.people;
    this.emit('change');
  },
  handleLoadPeopleListFail: function(data) {
    //this.emit('change');
  }
});

module.exports = PeopleStore;
