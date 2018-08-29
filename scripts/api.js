'use strict';

const API = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/gabriel-chelsea';

  //Get Items
  const getItems = function(callback) {
    $.getJSON(`${BASE_URL}/items`, callback);
  };

  //Create Item
  const createItem = function(name, callback) {
    const newItem = JSON.stringify({ name: name });

    $.ajax({
      url: `${BASE_URL}/items`,
      method: 'POST',
      contentType: 'application/json',
      data: newItem,
      success: callback
    });
  };

  //Update Item
  const updateItem = function(id, updateData, callback) {
    const updatedItem = JSON.stringify(updateData);
    $.ajax({
      url: `${BASE_URL}/items/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: updatedItem,
      success: callback
    });
  };

  return {
    getItems,
    createItem,
    updateItem
  };
})();
