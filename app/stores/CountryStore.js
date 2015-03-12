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
  /**
   * Why an handler that wrap a private method instead a unique method?
   *
   * This is need for testing purpouse.
   * When in a test function you call the fakeFlux method for the store creation
   * the "initialize" method is called.
   *
   * fakeFlux = FluxxorTestUtils.fakeFlux({country: new CountryStore()});
   * ...
   *
   * initialize : function() {
   *  ...
   *  this.bindActions(
   *     actions.constants.COUNTRY.CHANGE_COUNTRY, this.handleChangeCountry,
   *     ...
   *     )
   *  }
   *
   *  At this point if you mock the handler method "handleChangeCountry"
   *  the method mocked is the class method but not the method bind to the event.
   *
   *  So you need this approach to be able to run tests on the dispatcher
   *  and want to mock the method
   *
   * (EG.)
   * var spy = jasmine.createSpy('spy');
   * fakeFlux.store('country')._handleChangeCountry = spy;
   * fakeFlux.dispatcher.dispatch({
   *   type: constants.COUNTRY.CHANGE_COUNTRY,
   *   payload: {country : 'Argentina'}
   * });
   * expect(spy.calls.count()).toBe(1);
   * expect(spy.calls.argsFor(0)[0]).toEqual({country : 'Argentina'});
   *
   *
   */
  handleChangeCountry: function(payload) {
    this._handleChangeCountry(payload);
  },
  _handleChangeCountry: function(payload) {
    this.currentCountry = payload.country;
    this.emit('change');
  },
  handleInitCountry: function() {
    this._handleInitCountry();
  },
  _handleInitCountry: function() {
    this.countries = [];
    this.emit('change');
  },
  handleInitCountrySuccess: function(payload) {
    this.countries = payload.countries;
    this.currentCountry = this.countries[0];
    this.flux.actions.country.changeCountry(this.currentCountry);
    this.emit('change');
  },
  handleInitCountryFail: function() {
    this.emit('change');
  }
});

module.exports = CountryStore;
