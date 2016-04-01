angular.module('mobionicApp.filters', [])

.filter('partition', function($cacheFactory) {
    var arrayCache = $cacheFactory('partition');
    var filter = function(arr, size) {
    if (!arr) { return; }
    var newArr = [];
    for (var i=0; i<arr.length; i+=size) {
        newArr.push(arr.slice(i, i+size));        
    }
    var cachedParts;
    var arrString = JSON.stringify(arr);
    cachedParts = arrayCache.get(arrString+size); 
    if (JSON.stringify(cachedParts) === JSON.stringify(newArr)) {
      return cachedParts;
    }
    arrayCache.put(arrString+size, newArr);
    return newArr;
    };
    return filter;
})
.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
})
.filter('todayFilter', function() {
  return function(items, field) {

    if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
    }

    var newItems = [];

    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    currentDate.getTime();
    currentDate = Math.floor(currentDate / 1000);
    

    angular.forEach(items, function(item) {
      if (item[field] >= currentDate) {
        newItems.push(item);
      }
    });

    return newItems;
  }
})
.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});