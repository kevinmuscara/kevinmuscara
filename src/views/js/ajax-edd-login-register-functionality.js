
jQuery( document ).ready( function( $ ) {

	//Perform AJAX on login form submit
	jQuery( 'form#edd_login_form' ).on( 'submit', function( e ){
		//jQuery( 'form#edd_login_form p.status' ).text( ajax_login_object.loadingmessage );
		//jQuery( 'form#edd_login_form p.status' ).fadeIn();
		jQuery.ajax( {
			type: 'POST',
			dataType: 'json',
			url: ajax_login_object.ajaxurl,
			data: { 
				'action'  : 'ajaxlogin', //calls wp_ajax_nopriv_ajaxlogin
				'username': jQuery( 'form#edd_login_form #edd_user_login' ).val(), 
				'password': jQuery( 'form#edd_login_form #edd_user_pass' ).val(), 
				'security': jQuery( 'form#edd_login_form #security' ).val(),
			},success: function( data ){
				if ( data.loggedin == true ){
					jQuery( 'form#edd_login_form p.status' ).removeClass( 'alert-danger' );
					jQuery( 'form#edd_login_form p.status' ).addClass( 'alert-success' );
				}
				jQuery( 'form#edd_login_form p.status' ).text( data.message );
				jQuery( 'form#edd_login_form p.status' ).fadeIn();
				if ( data.loggedin == true ){
					var url = jQuery( 'form#edd_login_form #edd_redirect' ).val();
					if ( url == '#' || url == '' ) {
						location.reload();
					} else {
						location.replace( url );
					}
				}
			}
		});
		e.preventDefault();
	});

	//Perform AJAX on register form submit
	jQuery( 'form#edd_register_form' ).on( 'submit', function( e ){
		//jQuery( 'form#edd_register_form p.status' ).text( ajax_login_object.loadingmessage );
		//jQuery( 'form#edd_register_form p.status' ).fadeIn();
		jQuery.ajax( {
			type: 'POST',
			dataType: 'json',
			url: ajax_login_object.ajaxurl,
			data: { 
				'action'  : 'ajaxregister', //calls wp_ajax_nopriv_ajaxregister
				'username': jQuery( 'form#edd_register_form #edd-user-login' ).val(), 
				'password': jQuery( 'form#edd_register_form #edd-user-pass' ).val(),
				'pass_2'  : jQuery( 'form#edd_register_form #edd-user-pass2' ).val(),
				'email'   : jQuery( 'form#edd_register_form #edd-user-email' ).val(),
				'security': jQuery( 'form#edd_register_form #security' ).val(),
			},success: function( data ){
				if ( data.loggedin == true ){
					jQuery( 'form#edd_register_form p.status' ).removeClass( 'alert-danger' );
					jQuery( 'form#edd_register_form p.status' ).addClass( 'alert-success' );
				}
				jQuery( 'form#edd_register_form p.status' ).text( data.message );
				jQuery( 'form#edd_register_form p.status' ).fadeIn();
				if ( data.loggedin == true ){
					var url = jQuery( 'form#edd_register_form #edd_redirect' ).val();
					if ( url == '#' || url == '' ) {
						location.reload();
					} else {
						location.replace( url );
					}
				}
			}
		});
		e.preventDefault();
	});

	//Perform AJAX on forgot password form submit
	jQuery( 'form#reset_password_form' ).on( 'submit', function( e ){
		//jQuery( 'form#reset_password_form p.status' ).text( ajax_login_object.loadingmessage );
		//jQuery( 'form#reset_password_form p.status' ).fadeIn();
		jQuery.ajax( {
			type: 'POST',
			dataType: 'json',
			url: ajax_login_object.ajaxurl,
			data: { 
				'action'  : 'ajaxresetpassword', //calls wp_ajax_nopriv_ajaxregister
				'email'   : jQuery( 'form#reset_password_form #user_login' ).val(),
			},success: function( data ){
				if ( data.status == true ){
					jQuery( 'form#reset_password_form p.status' ).removeClass( 'alert-danger' );
					jQuery( 'form#reset_password_form p.status' ).addClass( 'alert-success' );
				}
				jQuery( 'form#reset_password_form p.status' ).text( data.message );
				jQuery( 'form#reset_password_form p.status' ).fadeIn();
			}
		});
		e.preventDefault();
	});
});