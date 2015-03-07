var React = require('react');
var Router = require('react-router');
var Fluxxor = require('fluxxor');

var routes = require('./routes');
var actions = require('./actions');

var PeopleStore = require('./stores/PeopleStore');
var RouteStore = require('./stores/RouteStore');

var router = Router.create({routes: routes});

var stores = {
  people : new PeopleStore(),
  route: new RouteStore({router: router})
};

var flux = new Fluxxor.Flux(stores, actions.methods);
flux.on('dispatch', function(type, payload) {
  console.log('Dispatch:', type, payload);
});

router.run(function(Handler) {
  React.render(
      <Handler flux={flux} />,
      document.getElementById('people-app')
  );
});
