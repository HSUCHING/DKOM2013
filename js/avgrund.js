/**
 * Created with JetBrains WebStorm.
 * User: I068959
 * Date: 2/4/13
 * Time: 3:02 PM
 * To change this template use File | Settings | File Templates.
 */
/*!
 * avgrund 0.1
 * http://lab.hakim.se/avgrund
 * MIT licensed
 *
 * Copyright (C) 2012 Hakim El Hattab, http://hakim.se
 */
var Avgrund = (function(){

    var container = document.documentElement,
        popup = document.querySelector( '.avgrund-popup-animate' ),
        cover = document.querySelector( '.avgrund-cover' ),
        currentState = null;

    var menyarrowchange=document.querySelector('.meny-arrow');

    container.className = container.className.replace( /\s+$/gi, '' ) + ' avgrund-ready';

    // Deactivate on ESC
    function onDocumentKeyUp( event ) {
        if( event.keyCode === 27 ) {
            deactivate();
        }
    }

    // Deactivate on click outside
    function onDocumentClick( event ) {
        if( event.target === cover ) {
            deactivate();
        }
    }

    function activate( state ) {
        document.addEventListener( 'keyup', onDocumentKeyUp, false );
        document.addEventListener( 'click', onDocumentClick, false );
        document.addEventListener( 'touchstart', onDocumentClick, false );

        removeClass( popup, currentState );
        addClass( popup, 'no-transition' );
        addClass( popup, state );

        menyarrowchange.hidden=true;

        document.removeEventListener('mousemove',meny.mousemoveChange,false);

        setTimeout( function() {
            removeClass( popup, 'no-transition' );
            addClass( container, 'avgrund-active' );
        }, 0 );

        currentState = state;
    }

    function deactivate() {
        document.removeEventListener( 'keyup', onDocumentKeyUp, false );
        document.removeEventListener( 'click', onDocumentClick, false );
        document.removeEventListener( 'touchstart', onDocumentClick, false );

        menyarrowchange.hidden=false;
        document.addEventListener('mousemove',meny.mousemoveChange,false);


        removeClass( container, 'avgrund-active' );
        removeClass( popup, 'avgrund-popup-animate')
    }

    function disableBlur() {
        addClass( document.documentElement, 'no-blur' );
    }

    function addClass( element, name ) {
        element.className = element.className.replace( /\s+$/gi, '' ) + ' ' + name;
    }

    function removeClass( element, name ) {
        element.className = element.className.replace( name, '' );
    }

    function show(selector){
        popup = document.querySelector( selector );
        addClass(popup, 'avgrund-popup-animate');
        activate();
        return this;
    }
    function hide() {
        deactivate();
    }

    return {
        activate: activate,
        deactivate: deactivate,
        disableBlur: disableBlur,
        show: show,
        hide: hide
    }

})();

function openDialog() {
    Avgrund.show( "#default-popup" );
}
function closeDialog() {
    Avgrund.hide();
    impressLayer.goback();
}