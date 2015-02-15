module.exports = function(imageArr, callback){
	var loader = new PxLoader();

	loader.addCompletionListener(callback);

	for(var i= 0; i < imageArr.length; i++){
		var pxImage = new PxLoaderImage(imageArr[i]); 
		loader.addImage(pxImage);
	}

	this.start = function() {
		loader.start();
	};

	return this;
}


// PRELOADER PRELOADER PRELOADER PRELOADER PRELOADER