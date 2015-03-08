var Promise = require('bluebird');
// build with https://www.mockaroo.com/
var _data = require('../data/data.json');

var loadPeopleList = function(country) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      var people = _data.filter(function(item, pos) {
            return item.country === country;
          }
      );
      resolve(people);
    }, 500);
  });
};

var loadPersonById = function(id) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      var len = _data.length;
      for (var i = 0; i < len; i++) {
        if (parseInt(_data[i].id) === parseInt(id)) {
          resolve(_data[i]);
          return;
        }
      }
      resolve(null);
    }, 500);
  })
};

module.exports = {
  loadPeopleList: loadPeopleList,
  loadPersonById: loadPersonById
};
