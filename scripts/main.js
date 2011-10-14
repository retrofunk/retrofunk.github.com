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
	
});