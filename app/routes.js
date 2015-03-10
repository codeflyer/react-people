var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var PageContainer = require('./components/layout/PageContainer');
var About = require('./components/pages/About');
var Contact = require('./components/pages/Contact');

var People = require('./components/pages/People');
var Person = require('./components/pages/people/Person');
var PeopleList = require('./components/pages/people/PeopleList');

var routes = (
    <Route handler={PageContainer} path="/">
      <Route handler={About} name="about" path="/about" />
      <Route handler={Contact} name="contact" path="/contact" />
      <Route handler={People} name="people" path="/">
        <Route handler={Person} name="person" path="person/:idPerson" />
        <DefaultRoute handler={PeopleList} />
      </Route>
    </Route>
);
module.exports = routes;
