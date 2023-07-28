/* 
Last Updated 10-30-17
Made sure everything was up to date
*/


// Basic show / hide to add and remove open/closed classes from the btn and the container.
function simpleShowHide2(btn, className, classSpot, classSpot2, slider) {
	if ( !classSpot ) {
		classSpot = btn;	
	}
	if ( !className ) {
		className = 'open';	
	}
	
	if ( !slider ) {
		classSpot.toggleClass(className);
		if ( classSpot2 ) { 
			classSpot2.toggleClass(className);
		}
	} else {
		btn.toggleClass(className);
		classSpot.toggleClass(className);
		classSpot.slideToggle(className);
		if ( classSpot2 ) { 
			classSpot2.toggleClass(className);
		}
	}
}

if ( window.register ) {
	window.register( '/includes/js/simple-show-hide-script2.js' );
}