var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var EmptyView = require('./components/EmptyView');
var Home = require('./components/Home');
var About = require('./components/About');
var Contact = require('./components/Contact');
var PersonContainer = require('./components/PersonContainer');

var routes = (
    <Route handler={EmptyView} name="home" path="/">
      <Route handler={About} name="about" path="/about" />
      <Route handler={Contact} name="contact" path="/contact" />
      <Route handler={PersonContainer} name="person" path="person/:idPerson" />
      <DefaultRoute handler={Home} />
    </Route>
);

module.exports = routes;
