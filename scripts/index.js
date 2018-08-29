/* global shoppingList, store, $, Item, API*/
'use strict';

$(document).ready(function() {
  shoppingList.bindEventListeners();
  API.getItems(items => {
    items.forEach(item => store.addItem(item));
    const item = store.items[0];
    console.log(`current name: ${item.name}`);
    store.findAndUpdate(item.id, { name: 'potato' });
    console.log(`name name: ${item.name}`);
    shoppingList.render();
  });
});
