var Promise = require('bluebird');
// build with https://www.mockaroo.com/
var _data = require('../data/data.json');

var getCountryList = function() {
  return new Promise(function(resolve, reject) {
    var tmpCountryList = _data.map(function(item) {
      return item.country;
    });
    var countries = tmpCountryList.filter(function(item, pos) {
      return tmpCountryList.indexOf(item) === pos;
    }).sort();
    setTimeout(function() {
      resolve(countries);
    }, 1000);
  });
};

module.exports = {
  getCountryList: getCountryList
};
