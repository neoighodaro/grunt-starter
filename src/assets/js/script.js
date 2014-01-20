/**
 * Application JS
 *
 * Customize this JS and it will be automatically compiled and compressed.
 *
 * @type {Object}
 */

var AppJS = {
	instance: null,
	init: function() {
		this.instance = this;
	}
}

$(document).on('ready', function(){
	AppJS.init();
});