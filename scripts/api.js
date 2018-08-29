'use strict';

const API = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/gabriel-chelsea';
  const getItems = function(callback) {
    callback('api module works!');
  };

  return {
    getItems
  };
})();
