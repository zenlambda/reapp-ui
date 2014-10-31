var _ = require('lodash-node');
var { Promise } = require('when');
var debug = require('debug')('g:flux:StoreLoader');

var Flux;
var storePromises = {};

function StoreLoader(name, params) {
  var promises = {};
  var hash = name + _.map(params, (h,k) => ""+h+k);
  var store = Flux.store(name);

  promises[name] = promiseForStore(hash, store);
  Flux.actions[name](params);

  return promises;
}

function promiseForStore(hash, store) {
  storePromises[hash] = storePromises[hash] || new Promise((res, rej) => {
    store.on('change', () => {
      return (!store.loading && _.size(store.data)) && res(_.values(store.data));
    });
  });
  return storePromises[hash];
}

module.exports = {
  init(flux) {
    Flux = flux;
    return StoreLoader;
  }
};