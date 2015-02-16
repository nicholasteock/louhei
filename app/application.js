var freeze 					= false;
var ingredientCount 		= 5;
var currentIngredientIdx 	= 0;
var currentStageIdx 		= 0;
var tossCount 				= 0;
var maxTosses 				= 3;
var stageNames 				= ['main', 'ingredients', 'tossing', 'share'];
var url 					= encodeURIComponent('http://cny.2359media.com');
var shareMessage 			= "Happy Chinese New year, I wish you prosperity, wealth and success! Let’s share a Lou Hei together, click on the link to lou " + url;

var initialize = function() {

	$('.app-stage').click();
	$('.stage').addClass('hide');
	$('.in').removeClass('in');
	$('.bounce').removeClass('bounce');

	currentIngredientIdx 	= 0;
	currentStageIdx 		= 0;
	tossIdx 				= 0;

	$('.app-stage').removeClass('hide');
	$(document).trigger('disable_shaker');

	$('.main-stage').addClass('hide');
	$('.share-stage').removeClass('hide');
};

var plateClickHandler = function() {
	if(freeze) return; // Event lock
	freeze = true; // Enable lock

	function showIngredients(currentIdx, lastIdx) {

		$('.js-plate-'+currentIdx).addClass('hide');
		$('.js-plate-'+(currentIdx+1)).removeClass('hide');
		if(currentIdx < lastIdx) {
			setTimeout(function() {
				window.requestAnimFrame(function() {
					showIngredients(currentIdx+1, lastIdx);
				});
			}, 1000/6);
		}
		else {
			setTimeout( function() {
				freeze = false; // Release lock
				nextStage();
				showIngredient();
			}, 500);
		}
	}
	window.requestAnimFrame(function() {
		showIngredients(0, 5);
	});
};

var showIngredient = function() {
	if(freeze) return; // Event lock
	freeze = true; // Enable lock

	$('.in').removeClass('in');
	$('.bounce').removeClass('bounce');

	$('.js-ingredient-'+currentIngredientIdx).removeClass('hide').addClass('in');

	setTimeout(function() {
		freeze = false; // Release lock
		return;
	}, 1200);
};

var showIngredientDesc = function() {
	if(freeze) return;
	freeze = true;

	$('.in').removeClass('in');
	$('.bounce').removeClass('bounce');

	$('.js-ingredient-'+currentIngredientIdx).addClass('hide').addClass('in');
	$('.js-desc-'+currentIngredientIdx).addClass('bounce');
	$('.js-main-'+(currentIngredientIdx)).addClass('hide');
	$('.js-main-'+(currentIngredientIdx+1)).removeClass('hide');

	currentIngredientIdx++;
	setTimeout(function() {
		freeze = false;
		isLastIngredient() ? nextStage() : showIngredient();
	}, 3700);
};

var showShareButtons = function() {

	var hideChunks = function (chunkIdx, totalChunks) {
		$('.js-chunk-'+chunkIdx).addClass('hide');
		if(chunkIdx < totalChunks-1) {
			setTimeout(function() {
				window.requestAnimFrame(function() {
					hideChunks(chunkIdx+1, totalChunks);
				});
		    }, 1000 / 3);
		}
		else {
			$('.js-message-0').addClass('hide');
			$('.js-message-1').removeClass('hide').addClass('bounce');
			$('.chunks-container').addClass('hide');
			$('.share-container').addClass('in');
			$('.credits-container').addClass('in');
		}
	};
	window.requestAnimFrame(function() {
		hideChunks(0,6); // Start from 1, total 5 chunks
	});
};

var isLastIngredient = function() {
	return currentIngredientIdx === ingredientCount;
};

var nextStage = function() {
	$('.' + stageNames[currentStageIdx] + '-stage').addClass('hide');
	currentStageIdx++;
	$('.' + stageNames[currentStageIdx] + '-stage').removeClass('hide');

	if(stageNames[currentStageIdx] === 'tossing') {
		$(document).trigger('enable_shaker');
	}
	return;
};

var shareLink = function() {
	// Prefix message with url scheme.
	url = "whatsapp://send?text=" + shareMessage;
	location.href = url;
};

var toss = function() {
	$(document).trigger('disable_shaker'); // Disable shaker while tossing.
	$('.toss-banner').addClass('opaque');
	$('.toss-base').addClass('hide');
	$('.js-tossbase').removeClass('hide');

	var doToss = function( callback ) {

		var tossFrameRate 	= 8, // FPS
			totalFrames 	= 17;

		function animateToss(currentFrameIdx, totalFrames) {
			$('.js-toss-'+currentFrameIdx).removeClass('hide'); 	// Show next frame
			$('.js-toss-'+(currentFrameIdx-1)).addClass('hide'); // Hide previous frame
			if(currentFrameIdx > totalFrames ) { return callback(); }
			else { 
				setTimeout( function() {
					animateToss(currentFrameIdx+1, totalFrames);
				}, 1000/tossFrameRate );
			}
		}
		animateToss(0,totalFrames);
	};

	var afterToss = function() {
		tossCount += 1;

		$('.js-tossmessage-'+(tossCount-1)).addClass('hide');
		$('.js-tossmessage-'+tossCount).removeClass('opaque hide');
		$('.js-tossbase').addClass('hide');
		$('.js-tossbase-'+tossCount).removeClass('hide');

		if(tossCount < maxTosses) {
			$('.js-tossmessage-'+tossCount).removeClass('hide');
			$(document).trigger('enable_shaker');
		}
		else {
			setTimeout( function() {
				nextStage();
			}, 125);
		}
	};

	doToss(afterToss);

};

module.exports = {
	initialize 			: initialize,
	plateClickHandler 	: plateClickHandler,
	showIngredient 		: showIngredient,
	showIngredientDesc 	: showIngredientDesc,
	isLastIngredient 	: isLastIngredient,
	nextStage 			: nextStage,
	toss 				: toss,
	showShareButtons 	: showShareButtons,
	shareLink			: shareLink
};
