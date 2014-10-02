//include ui, ui.filters? for unique
var photoApp = angular.module('photoApp', []);

function CheckScopeBeforeApply() {
    if(!$scope.$$phase) {
         $scope.$apply();
    }
};

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



photoApp.directive("scroll", function () {
	return function(scope, element, attrs) {	
		element.bind("mousewheel", function(e, delta) {
			element.context.scrollLeft -= delta*60;
			e.preventDefault();
			scope.$apply();
			if (element.context.scrollLeft + element.context.offsetWidth > (element.context.scrollWidth - 60))
				scope.$apply(attrs.endReached);
        });
		
		//console.log("Last left offset: " + scope.photos[scope.photos.length-1].context.offsetLeft);
	};
});

photoApp.directive('hoverPhoto', function () {
      return {
         link : function(scope, element, attrs) {
            element.bind('mouseenter', function() {
				element.addClass('focus');
				var image = this.getElementsByTagName('img')[0];
				//console.log(EXIF.pretty(image));
			});
            element.bind('mouseleave', function() {
                element.removeClass('focus');
			});
       }
   };
});

photoApp.directive('loadStats', function () {
      return {
         link : function(scope, element, attrs) {
            element.bind('mouseup', function() {
				var img = element.parent()[0].children[0]; // so terribad
				EXIF.getData(img, function() {
					var make = EXIF.getTag(img, "Make"),
					model = EXIF.getTag(img, "Model"),
					speed = EXIF.getTag(img, "ShutterSpeedValue"),
					iso = EXIF.getTag(img, "ISOSpeedRatings"),
					f = EXIF.getTag(img, "FNumber"),
					exptime = EXIF.getTag(img, "ExposureTime");
					//alert("I was taken by a " + make + " " + model + " speed:" + speed + " iso:" + iso + " f:" + f + " exptime:" + exptime );
					scope.$apply(function() {
						scope.currentDetails.shutterspeed = speed;
						scope.currentDetails.iso = iso;
						scope.currentDetails.fstop = f.toFixed(1);
						scope.currentDetails.exposuretime = exptime;
						alert(fraction(exptime));
					});
				});
				var e = document.getElementById("info-fstop-circle");
				var temp = Math.round(scope.currentDetails.fstop*15,2);
				e.style.width = e.style.height = temp + "px";
				e.style.marginLeft = "-" + Math.round(temp/2,0) + "px";
			});
			
			//if(!scope.$$phase)
				//scope.$apply();
       }
   };
});

photoApp.controller('PhotoController', function ($scope) {
	$scope.currentSet = "";
	$scope.currentCaption = "";
	$scope.nextPointer = 0;
	$scope.photos = [];
	$scope.setVisible = false;
	
	function details (shutterspeed, iso, fstop, exposuretime) {
		this.shutterspeed = shutterspeed;
		this.iso = iso;
		this.fstop = fstop;
		this.exposuretime = exposuretime;
	}
	
	$scope.currentDetails = new details(1/1250,800,4.8,.02);
	
	$scope.allPhotos = [
		{'src': 'IMG_0152.JPG',
		 'caption': 'Blue heron at Lake Erie Birding Trail',
		 'set': 'Ohio Roadtrip'
		 },
		{'src': 'IMG_0339.JPG',
		 'caption': 'Belle Isle Park in Detroit',
		 'set': 'Ohio Roadtrip'
		 },
		{'src': 'IMG_9493.JPG',
		 'caption': 'Dog walking in San Francisco',
		 'set': 'San Francisco'
		 },
		{'src': 'kili.jpg',
		 'caption': 'Random Kilimanjaro photo to fill up this set',
		 'set': 'San Francisco'
		 },
		{'src': 'IMG_0691.JPG',
		 'caption': 'Dapper young Tigger',
		 'set': 'NYC'
		 },
		{'src': 'IMG_0699.JPG',
		 'caption': "Casual loungin\'",
		 'set': 'NYC'
		 },
		{'src': 'IMG_1374.jpg',
		 'caption': 'Fish market in Chinatown',
		 'set': 'NYC'
		 }
	];
	
	$scope.loadMore = function(num) {
        for (var i = 0; i < num; i++) {
			if ($scope.nextPointer == $scope.allPhotos.length)
				return;
			else {
				var temp = $scope.allPhotos[$scope.nextPointer]
				$scope.photos.push(temp);
				$scope.nextPointer++;
			}
        }
    };
	
	$scope.selectSet = function(setname) {
		$scope.currentSet = setname;
		$scope.loadMore(3);
	}
	
	/*$scope.loadStats = function($event) {
		var img = angular.element($event.target).parent()[0].children[0]; // so terribad
		EXIF.getData(img, function() {
			var make = EXIF.getTag(img, "Make"),
			model = EXIF.getTag(img, "Model"),
			speed = EXIF.getTag(img, "ShutterSpeedValue"),
			iso = EXIF.getTag(img, "ISOSpeedRatings"),
			f = EXIF.getTag(img, "FNumber"),
			exptime = EXIF.getTag(img, "ExposureTime");
			alert("I was taken by a " + make + " " + model + " speed:" + speed + " iso:" + iso + " f:" + f + " exptime:" + exptime );
		});
		console.log(EXIF.getTag(img,"ShutterSpeedValue"));
	}*/
	
	$scope.toggleSets = function() {
		$scope.setVisible = !$scope.setVisible;
	}
	
	$scope.loadMore(3);
	
	
});