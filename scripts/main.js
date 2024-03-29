$(window).load(function(){
	
	// Initialize nivoSlider
	$('#slider').nivoSlider({
		effect: 'fade',
		directionNav: false,
		controlNav: true
	});
	
});

$(document).ready(function(){
	
	// Load page based on link href
	$('.main-nav-ul a').live('click', function(){
		
		$('.content').hide(0, function(){
			$('.loader').show();		
		});
		
		$('.content').load($(this).attr('href')+' .content', function(){
			
			$('.loader').hide(0, function(){
				$('.content').show();
				displayGallery();
			});

		});
		
		location.hash = $(this).attr('href').substr(1);
		return false;
		
	});
	
	
	// Load page based on hash
	$('.main-nav-ul a').each(function(){
		
		$('.content').hide(0, function(){
			$('.loader').show();		
		});

		if($(this).attr('href').substr(1) == location.hash.substr(1)) {
			
			$('.content').load($(this).attr('href')+' .content', function(){
				
				$('.loader').hide(0, function(){
					$('.content').show();
					displayGallery();
				});
				
			});
		}	
	});
	
	
	// Open external links in new tab
	$('a[href^=http]').live('click', function(){
		window.open(this.href);
		return false;
	});
	$('a[rel*=external]').live('click', function(){
		window.open(this.href);
		return false;
	});
	
	
	
	

	
	
	// Display flickr images
	function displayGallery() {
	$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
			  {
			    tags: "trance energy",
			    tagmode: "any",
			    format: "json"
			  },
			  function(data) {
			    $.each(data.items, function(i,item){
			      $("<img class='gallery-image' />").attr("src", item.media.m).appendTo("#images");
			      if ( i == 32 ) return false;
			    });
			  });
	}
	
	// Default test on input color
	$('input:text, input:password, textarea').focus(function(){
		$(this).css('color', '#222');
	});
	
	// On submit contact form button; validate
	$('.submit-contact-form').live('click', function(){
		
		// Create method to validate name
		$.validator.addMethod('namecheck', function(value, element){
			return this.optional(element) || /^[a-zA-Z]+?\s?[a-zA-Z]+?\s?[a-zA-Z]+$/.test(value);
			
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
			message: 'message must be longer than 10 characters',
			minlength: 'message must be longer than 10 characters'
			},
		onkeyup: true
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
				$('.contact-form').fadeOut(100);
				setTimeout(function(){
					$('.contact-form').html('<p>Sorry, there was an error. Message was not sent.</p>');
				}, 100);
				
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
		$('.contact-form').fadeOut(100);

		setTimeout(function(){
			$('.contact-form').html('<div class="thank-you">Thanks <strong>'+$('input#name').val()+'</strong>,</div><p>I will get back to you shortly.</p>').fadeIn(200);	
		}, 100);
		
	}
	
});