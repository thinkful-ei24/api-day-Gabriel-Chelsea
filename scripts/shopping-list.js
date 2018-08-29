/* global store, API */
'use strict';

// eslint-disable-next-line no-unused-vars
const shoppingList = (function() {
  function generateItemElement(item) {
    let itemTitle = `<span class="shopping-item shopping-item__checked">${
      item.name
    }</span>`;
    if (!item.checked) {
      itemTitle = `
        <form class="js-edit-item">
          <input class="shopping-item type="text" value="${item.name}" />
        </form>
      `;
    }

    return `
      <li class="js-item-element" data-item-id="${item.id}">
        ${itemTitle}
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>`;
  }

  function generateShoppingItemsString(shoppingList) {
    const items = shoppingList.map(item => generateItemElement(item));
    return items.join('');
  }

  function render() {
    // Filter item list if store prop is true by item.checked === false
    let items = store.items;
    if (store.hideCheckedItems) {
      items = store.items.filter(item => !item.checked);
    }

    // Filter item list if store prop `searchTerm` is not empty
    if (store.searchTerm) {
      items = store.items.filter(item => item.name.includes(store.searchTerm));
    }

    if (store.errorMessage) {
      $('.js-error').html(`${store.errorMessage} ${store.errorOperation}`);
      store.setErrorMessage('');
      store.setErrorOperation('');
    } else {
      $('.js-error').html('');
    }

    // render the shopping list in the DOM
    console.log('`render` ran');
    const shoppingListItemsString = generateShoppingItemsString(items);

    // insert that HTML into the DOM
    $('.js-shopping-list').html(shoppingListItemsString);
  }

  function handleNewItemSubmit() {
    $('#js-shopping-list-form').submit(function(event) {
      event.preventDefault();
      const newItemName = $('.js-shopping-list-entry').val();
      $('.js-shopping-list-entry').val('');
      store.setErrorOperation('adding');
      API.createItem(
        newItemName,
        newItem => {
          store.addItem(newItem);
          render();
        },
        errorCallback
      );
    });
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }

  function handleItemCheckClicked() {
    $('.js-shopping-list').on('click', '.js-item-toggle', event => {
      const id = getItemIdFromElement(event.currentTarget);
      const item = store.findById(id);
      const checkStatus = { checked: !item.checked };
      store.setErrorOperation('completing');
      API.updateItem(
        id,
        checkStatus,
        () => {
          store.findAndUpdate(id, checkStatus);
          render();
        },
        errorCallback
      );
    });
  }

  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-shopping-list').on('click', '.js-item-delete', event => {
      // get the index of the item in store.items
      const id = getItemIdFromElement(event.currentTarget);
      store.setErrorOperation('deleting');
      // delete the item
      API.deleteItem(
        id,
        () => {
          store.findAndDelete(id);
          // render the updated shopping list
          render();
        },
        errorCallback
      );
    });
  }

  function handleEditShoppingItemSubmit() {
    $('.js-shopping-list').on('submit', '.js-edit-item', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      const itemName = $(event.currentTarget)
        .find('.shopping-item')
        .val();
      const newName = { name: itemName };
      store.setErrorOperation('editing');

      API.updateItem(
        id,
        newName,
        () => {
          store.findAndUpdate(id, newName);
          render();
        },
        error => errorCallback(error)
      );
    });
  }

  function handleToggleFilterClick() {
    $('.js-filter-checked').click(() => {
      store.toggleCheckedFilter();
      render();
    });
  }

  function handleShoppingListSearch() {
    $('.js-shopping-list-search-entry').on('keyup', event => {
      const val = $(event.currentTarget).val();
      store.setSearchTerm(val);
      render();
    });
  }

  const errorCallback = function(error) {
    const statusCode = error.status;
    console.log(`Error code: ${statusCode}`);
    if (statusCode >= 400 && statusCode < 500) {
      // 4xx error
      store.setErrorMessage('Oops! Looks like there was an error');
    } else if (statusCode >= 500) {
      // 5xx error
      store.setErrorMessage(
        'Oops! Looks like there\'s a server error - Try refreshing!'
      );
    }
    render();
  };

  function bindEventListeners() {
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
    handleEditShoppingItemSubmit();
    handleToggleFilterClick();
    handleShoppingListSearch();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
    errorCallback
  };
})();
