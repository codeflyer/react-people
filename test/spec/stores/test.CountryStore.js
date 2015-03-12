var FluxxorTestUtils = require('fluxxor-test-utils');
var constants = require('../../../app/constants');
var CountryStore = require('../../../app/stores/CountryStore');

describe('CountryStore', function() {
  var fakeFlux;
  beforeEach(function() {
    fakeFlux = FluxxorTestUtils.fakeFlux({country: new CountryStore()});
  });

  it('Check initial values', function() {
    expect(fakeFlux.store('country').getCurrentCountry()).toBeNull();
    expect(fakeFlux.store('country').getCountries()).toBeNull();
  });

  it('Handle change country event', function() {
    var spy = jasmine.createSpy('spy');
    fakeFlux.store('country')._handleChangeCountry = spy;
    fakeFlux.dispatcher.dispatch({
      type: constants.COUNTRY.CHANGE_COUNTRY,
      payload: {country : 'Argentina'}
    });
    expect(spy.calls.count()).toBe(1);
    expect(spy.calls.argsFor(0)[0]).toEqual({country : 'Argentina'});
  });

  it('Handle init country event', function() {
    var spy = jasmine.createSpy('spy');
    fakeFlux.store('country')._handleInitCountry = spy;
    fakeFlux.dispatcher.dispatch({
      type: constants.COUNTRY.INIT_COUNTRY,
      payload: {}
    });
    expect(spy.calls.count()).toBe(1);
  });

  it('Handle change country method', function() {
    var countryEmitSpy = fakeFlux.makeStoreEmitSpy('country');
    fakeFlux.store('country').handleChangeCountry({country: 'Argentina'});
    expect(fakeFlux.store('country').getCurrentCountry()).toBe('Argentina');
    expect(countryEmitSpy.getLastCall()).toEqual(['change']);
  });

  it('Handle init country method', function() {
    var countryEmitSpy = fakeFlux.makeStoreEmitSpy('country');
    fakeFlux.store('country').handleInitCountry();
    expect(fakeFlux.store('country').getCountries()).toEqual([]);
    expect(countryEmitSpy.getLastCall()).toEqual(['change']);
  });

  it('Handle init country success method', function() {
    var countryEmitSpy = fakeFlux.makeStoreEmitSpy('country');
    var changeCountrySpy = jasmine.createSpy('spy');
    fakeFlux.addActions({
      country: {
        changeCountry: changeCountrySpy
      }
    });
    fakeFlux.store('country').handleInitCountrySuccess({
      countries: [
        'Argentina',
        'Ireland',
        'Japan'
      ]
    });
    expect(fakeFlux.store('country').getCountries()).toEqual([
      'Argentina',
      'Ireland',
      'Japan'
    ]);
    expect(fakeFlux.store('country').getCurrentCountry()).toBe('Argentina');
    expect(countryEmitSpy.getLastCall()).toEqual(['change']);
    expect(changeCountrySpy.calls.count()).toEqual(1);
    expect(changeCountrySpy.calls.argsFor(0)[0]).toEqual('Argentina');
  });
});
