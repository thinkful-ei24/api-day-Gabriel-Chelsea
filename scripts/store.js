/* global Item */
'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function() {
  const addItem = function(item) {
    this.items.push(item);
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const findAndUpdate = function(id, newData) {
    const foundItem = this.items.find(item => item.id === id);
    Object.assign(foundItem, newData);
  };

  const toggleCheckedFilter = function() {
    this.hideCheckedItems = !this.hideCheckedItems;
  };

  const setSearchTerm = function(term) {
    this.searchTerm = term;
  };

  const setErrorMessage = function(errorMessage) {
    this.errorMessage = errorMessage;
  };

  const setErrorOperation = function(errorOperation) {
    this.errorOperation = errorOperation;
  };

  return {
    items: [],
    hideCheckedItems: false,
    searchTerm: '',
    errorMessage: '',
    errorOperation: '',
    setErrorOperation,
    setErrorMessage,
    addItem,
    findById,
    findAndDelete,
    toggleCheckedFilter,
    setSearchTerm,
    findAndUpdate
  };
})();
