var reqAnimFrame = require('reqAnimFramePolyfill');
var shaker 			= require('shaker');
var application 	= require('application');
// require('swiper');

$(function() {
	$('.loading-overlay').addClass('hide');
	nick = application;
	application.initialize();

	$('.app-stage').click(function() {
		if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
			if (document.documentElement.requestFullscreen) {
		      document.documentElement.requestFullscreen();
		    } else if (document.documentElement.msRequestFullscreen) {
		      document.documentElement.msRequestFullscreen();
		    } else if (document.documentElement.mozRequestFullScreen) {
		      document.documentElement.mozRequestFullScreen();
		    } else if (document.documentElement.webkitRequestFullscreen) {
		      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		    }
		}
	});

	$('.main-stage .js-plate-0').click(function() {
		$(".audio-player")[0].play();
		application.plateClickHandler();
	});

	$('.ingredients-stage .small-plate').click(function() {
		application.showIngredientDesc();
	});

	$('.share-stage .chunks-container').click(function() {
		application.showShareButtons();
	});

	$('.js-share-whatsapp').click(function() {
		$(".audio-player")[0].pause();
		setTimeout( function() {
			application.shareLink();
		}, 100);
	});

	$('.share-link').click(function(el) {
		$(".audio-player")[0].pause();
   		this.setSelectionRange(0, 25);
	});

	$(document).on('enable_shaker', function() {
		shaker.enable();
	});

	$(document).on('disable_shaker', function() {
		shaker.disable();
	});

	$(document).on('protoss', function() {
		application.toss();
	});

	/********************************************************
	* Page visibility API 
	********************************************************/
	
	var hidden, state, visibilityChange; 
	if (typeof document.hidden !== "undefined") {
		hidden = "hidden";
		visibilityChange = "visibilitychange";
		state = "visibilityState";
	} else if (typeof document.mozHidden !== "undefined") {
		hidden = "mozHidden";
		visibilityChange = "mozvisibilitychange";
		state = "mozVisibilityState";
	} else if (typeof document.msHidden !== "undefined") {
		hidden = "msHidden";
		visibilityChange = "msvisibilitychange";
		state = "msVisibilityState";
	} else if (typeof document.webkitHidden !== "undefined") {
		hidden = "webkitHidden";
		visibilityChange = "webkitvisibilitychange";
		state = "webkitVisibilityState";
	}

	document.addEventListener(visibilityChange, function() {
		if (document[hidden]) {
			$(".audio-player")[0].pause();
		}
		else {
			$(".audio-player")[0].play();
		}
	}, false);
	/********************************************************/
});