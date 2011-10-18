$(window).load(function(){
	
	// Initialize nivoSlider
	$('#slider').nivoSlider({
		effect: 'fade',
		directionNav: false,
		controlNav: false
	});
	
});

$(document).ready(function(){
	
	// Open external links in new tab
	$('a[href^=http]').live('click', function(){
		window.open(this.href);
		return false;
	});
	$('a[rel*=external]').live('click', function(){
		window.open(this.href);
		return false;
	});
	
	// Validate contact form
	$('.contact-form').validate({
		rules: {
			name: {
				required: true
			},
			email: {
				required: true,
				email: true
			},
			message: {
				required: true,
				minlength: 10
			}
		},
		messages: {
			name: {
				required: 'name required'
			},
			email: {
				required: 'email address required',
				email: 'invalid email address'
			},
			message: 'message required',
			minlength: 'message must be longer than 10 characters'
			},
		onkeyup: true,
		debug: true
	});
	
});