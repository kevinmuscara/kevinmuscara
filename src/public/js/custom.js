/**

 * WrapPixel custom js.

 */



(function( $ ) {

	"use strict";





	(function() {

		var rotate, timeline;



		rotate = function() {

			return $('.testimonial-card:first-child').fadeOut(400, 'swing', function() {

				return $('.testimonial-card:first-child').appendTo('.testimonial-container').hide();

			}).fadeIn(400, 'swing');

		};



		timeline = setInterval(rotate, 4500);



		$('body').hover(function() {

			return clearInterval(timeline);

		});



		$('.testimonial-card').click(function() {

			return rotate();

		});



	}).call(this);

	// ============================================================== 

	//Fix header while scroll

	// ==============================================================  

	
	var wind = $(window);
    wind.on("load", function () {
        var bodyScroll = wind.scrollTop(),
            navbar = $(".topbar:not(.download-single)");
        if (bodyScroll > 40) {
            navbar.addClass("fixed-header animated slideInDown")
        } else {
            navbar.removeClass("fixed-header animated slideInDown")
        }
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 200) {
            $('.topbar:not(.download-single)').addClass('fixed-header animated slideInDown');
            $('.product-stiky-header').addClass('fixed-header animated slideInDown');
            $('.bt-top').addClass('d-block');
        } else {
            $('.topbar:not(.download-single)').removeClass('fixed-header animated slideInDown');
            $('.product-stiky-header').removeClass('fixed-header animated slideInDown');
            $('.bt-top').removeClass('d-block');
        }
    });

    


	$('.menu-item.menu-item-has-children').on('click', function() {

		$(this).children('.sub-menu').toggleClass('show');

	})



	$('[data-toggle="tooltip"]').tooltip()



	$('.price-table > .list-inline > li').on('click', function() {

		$('.price-table > .list-inline > li').removeClass('active');

		$(this).addClass('active');		

		var id = $(this).data("id");

		$('.price-desc').removeClass('active');

		$(id).addClass('active');

	});



	$('#show-register').on('click',function(){

		$('#register-form').show();

		$('#register-title').show();

		$('#login-form').hide();

		$('#login-title').hide();

		$('#forgot-password-form').hide();

		$('#forgot-password-title').hide();

	});



	$('#show-login').on('click',function(){

		$('#login-form').show();

		$('#login-title').show();

		$('#register-form').hide();

		$('#register-title').hide();

		$('#forgot-password-form').hide();

		$('#forgot-password-title').hide();

	});



	$('#show-forgot-password').on('click',function(){

		$('#forgot-password-form').show();

		$('#forgot-password-title').show();

		$('#login-form').hide();

		$('#login-title').hide();

		$('#register-form').hide();

		$('#register-title').hide();

	});



	$('#show-login-back').on('click',function(){

		$('#login-form').show();

		$('#login-title').show();

		$('#register-form').hide();

		$('#register-title').hide();

		$('#forgot-password-form').hide();

		$('#forgot-password-title').hide();

	});



	feather.replace();



	/*dashboard review js*/

	var target_post = jQuery( 'input[name="edd-reviews-review-post-ID"] ');

	jQuery( '.give-review-link' ).on( 'click', function() {

		target_post.val( jQuery( this ).attr( 'data-product-id' ) );

		jQuery( '#edd-product-name' ).text( jQuery( this ).attr( 'data-product-name' ) );

	});



	/*login popop show when user logged in or not */

	/*use 'wrappixel-verify-login' class with any menu to show login modal when user not login */

	if ( wrappixel_site_data.is_user_login ) {

		jQuery( 'li.wrappixel-verify-login a' ).removeAttr( 'data-toggle' );

		jQuery( 'li.wrappixel-verify-login a' ).removeAttr( 'data-target' );

	} else {

		jQuery( 'li.wrappixel-verify-login' ).each( function(){

			jQuery( this ).removeClass('menu-item-has-children');

			var href = jQuery( this ).children( 'a' ).attr( 'href' );

			jQuery( this ).children( 'a' ).attr( 'data-login-redirect', href );

			jQuery( this ).children( 'a' ).attr( 'href', 'javascript:void(0)' );

			jQuery( this ).children( 'a' ).attr( 'data-toggle', 'modal' );

			jQuery( this ).children( 'a' ).attr( 'data-target', '#login-popup' );

		});

	} 



	/*redirect path to modal after login/register after login verify*/

	jQuery( 'li.wrappixel-verify-login a' ).on( 'click', function() {

		jQuery( '.edd_redirect_url' ).val( jQuery( this ).attr( 'data-login-redirect' ) );

	});



	$('.animate-scroll').click(function() {

		$('html, body').animate({

			scrollTop: $($(this).attr('href')).offset().top - 100

		}, 500);

		return false;

	});



	function autoPlayYouTubeModal(){

        var trigger = $("#about-video");

        trigger.click(function() {

            var theModal = $(this).data( "target" ),

            videoSRC = $(this).attr( "data-video-src" ), 

            videoSRCauto = videoSRC+"?autoplay=1" ;

            $(theModal+' iframe').attr('src', videoSRCauto);

            $(theModal+' button.close').click(function () {

                $(theModal+' iframe').attr('src', videoSRC);

            });   

        });

    }

    autoPlayYouTubeModal();

    // on browser tab close
	/*var mouseX = 0;
	var mouseY = 0;
	var popupCounter = 0;
	$(document).mouseleave(function () {
		if (mouseY < 100) {
			if (popupCounter < 1 && !$("body").hasClass("page-template-template-blackfriday")) {
				$('#myModal').modal('show');
			}
			popupCounter ++; 
		} 
	});*/

	// This is new price table js
        
	$('.new-price-table > ul > li').on('click', function() {
		$('.new-price-table > ul > li').removeClass('active');
		$(this).addClass('active');
		var id = $(this).data("id");
		$('.add-to-cart-btn').removeClass('active');
		$(id).addClass('active');
	  });
        
        // This is for review tab
	$('#show-review').on('click', function () {
        $('#product-details .nav-item .nav-link').removeClass("active show");
        $('#reviews-tab').addClass("active show");
        $('#product-details-content .tab-pane').removeClass("active show");
        $('#product-details-content #reviews').addClass("active show");
    });

} )( jQuery );

