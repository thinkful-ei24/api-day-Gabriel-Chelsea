/* global shoppingList, store, $, Item, API*/
'use strict';

$(document).ready(function() {
  shoppingList.bindEventListeners();
  API.getItems(items => {
    items.forEach(item => store.addItem(item));
    shoppingList.render();
  });
});
