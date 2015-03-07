var constants = {
  PEOPLE: {
    CHANGE_COUNTRY: 'PEOPLE:CHANGE_COUNTRY'
  },

  ROUTE: {
    TRANSITION: 'ROUTE:TRANSITION'
  }
};

var methods = {
  people: {
    changeCountry: function(country) {
      this.dispatch(constants.PEOPLE.CHANGE_COUNTRY, {
        country: country
      });
    }
  },

  routes: {
    transition: function(path, params) {
      this.dispatch(constants.ROUTE.TRANSITION, {path: path, params: params});
    }
  }
};

module.exports = {
  methods: methods,
  constants: constants
};
