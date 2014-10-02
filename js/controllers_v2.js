//include ui, ui.filters? for unique
var photoApp = angular.module('photoApp', []);

//Ben Lesh http://stackoverflow.com/questions/20222555/angularjs-remove-duplicate-elements-in-ng-repeat
photoApp.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});

photoApp.filter('bySet', function () {
  return function (collection, setname) {
	if (setname === "" || !setname)
		return collection;
    var filtered = [];
	angular.forEach(collection, function(item) {
		var curr = item.set;
		if(curr === setname)
			filtered.push(item);
	});

    return filtered;
  };
});


photoApp.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("mousewheel", function() {
             if (this.pageYOffset >= 100) {
                 scope.boolChangeClass = true;
                 console.log('Scrolled below header.');
             } else {
                 scope.boolChangeClass = false;
                 console.log('Header is in view.');
             }
            scope.$apply();
        });
    };
});

photoApp.controller('PhotoController', function ($scope) {

	$scope.currentSet = "";
	$scope.currentCaption = "";
	$scope.photos = [
		{'src': 'camp.jpg',
		 'caption': 'Test caption here for camp.',
		 'set': 'Test'
		 },
		{'src': 'temple.jpg',
		 'caption': 'Test caption here for temple.',
		 'set': 'Test'
		 },
		{'src': 'kili.jpg',
		 'caption': 'Test caption here for kili.',
		 'set': 'Test'
		 },
		{'src': 'house.jpg',
		 'caption': 'Test caption here for house.',
		 'set': 'Test2'
		 },
		{'src': 'galaxy.jpg',
		 'caption': 'Test caption here for galaxy.',
		 'set': 'Test2'
		 },
		{'src': 'sky.jpg',
		 'caption': 'Test caption here for sky.',
		 'set': 'Test2'
		 }
	];
});