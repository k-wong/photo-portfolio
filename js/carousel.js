(function() {
	var carouselInit = true;
	var currentImage, focusLi, firstLi;
	var currentId = 0;
	$(document).ready(function() {
		/*var info = document.getElementById("info");
		$("#"+currentId).addClass("focus");
		$("#"+currentId + " div.carousel-image-title").fadeIn("slow");
		focusLi = $(".focus:first");
		firstLi = $(".focus:first");
		$('.focus:first img').on("load", function() {
			var mainColor = getHex(this);			
			document.getElementById("carousel").style.backgroundColor = mainColor.toString(16);
		});*/
	});

	//$('html, body, *').bind('mousewheel', function(e, delta) {
	/*$('#carousel').bind('mousewheel', function(e, delta) {
		//console.log($('.carousel-list').offset().left);
		this.scrollLeft -= (delta * 40);
		e.preventDefault();
		
		var focus = focusLi.offset();
		var windowWidth = window.innerWidth;
		
		if (delta < 0) { // forward
			//if leftmost image (ID 1) is in focus, switch to next when -400
			if (carouselInit && focus.left <= -400) {
				carouselInit = false;
				switchFocus(true)
			} else if (!carouselInit && focus.left <= windowWidth*.1) {
				switchFocus(true);
			}
		} else { // backward
			if (!carouselInit && focus.left >= windowWidth*.75) { //going right
				switchFocus(false);
			} else if ($('.carousel-list:first').offset().left == 0) {
				if (currentId == 1)
					switchFocus(false);
			}
		}
	});
	
	//switches focus from one photo to another
	//forward = true 
	function switchFocus(forward) {
		$("#"+currentId).removeClass("focus");
		$("#"+currentId + " div.carousel-image-title").fadeOut("slow");
		$("#"+currentId).attr("opacity",1);
		if (forward)
			currentId++;
		else
			currentId--;
		$("#"+currentId).addClass("focus");
		//$("#"+currentId + " div.carousel-image-title").show();
		$("#"+currentId + " div.carousel-image-title").fadeIn("slow");
		focusLi = $(".focus:first");
		
		//var mainColor = getHex($(".focus:first img"));
		//document.getElementById("carousel").style.backgroundColor = mainColor.toString(16);
	}
	
	
	function scrollTop() {
		$('.carousel-list:first').animate({
			scrollLeft: 0
		}, 1000);
	}*/
	
})();