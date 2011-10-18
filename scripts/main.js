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
	
	// If contact form validates to true, then submit it
	if ($('.contact-form').valid() == true){	
		var str = $('form.contact-form').serialize();
		$.ajax({
			type: 'get',
			url: 'http://miguelmota.webuda.com/retrofunk/contact.php',
			data: str,
			success: function(){
				success();
			},
			error: function(){

				$('.submit-contact-form').html('<span>sending...</span>');
				$('.contact-form').slideUp(300);
				setTimeout(function(){
					$('.contact-form').html('<p>Sorry, there was an error. Message was not sent.</p>');
				}, 300);
				
			}
		});
		return false;
	}
	else
		return false;
	});

	// Hide contact form and display thank you message
	function success(){
		
		$('.submit-contact-form').html('<span>sending...</span>');
		$('.contact-form').slideUp(300);

		setTimeout(function(){
			$('.contact-form').html('<p>Thank you <strong>'+$('input#name').val()+'</strong>, <br />Your message has been successfully sent!<br />I will get in touch with you soon.</p>').fadeIn(1200);	
		}, 300);
		
	}
	
});