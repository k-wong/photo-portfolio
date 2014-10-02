/*window.onload = init;

function init() {
	$("html, body").mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 30);
		event.preventDefault();
		alert('hi');
	});
}*/

var oldScrollLeft = $(window).scrollLeft();
console.log(oldScrollLeft);
$('#carousel').bind('scroll', function () {
	console.log(oldScrollLeft);
    if (oldScrollLeft != $('#carousel').scrollLeft()) {
		oldScrollLeft = $('#carousel').scrollLeft();
    }
});

/*$('.carousel').scroll(function () {
    $('.carousel-list li').each(function (i) {
        var oTop = $(this).offset().left;
        var oHeight = $(this).outerHeight();
		alert("oTop: " + oTop);
		alert("oHeight: " + oHeight);
		/*
        var wTop = $(window).scrollTop();
        var wHeight = $(window).height();

        if (oTop < wTop + wHeight) {
            var diff = ((wTop + wHeight - oTop) / oHeight);
            
            if (diff > 1) diff = 1;
            else if (diff < 0) diff = 0;

            $(this).css('opacity', diff);
        }
    });
});*/