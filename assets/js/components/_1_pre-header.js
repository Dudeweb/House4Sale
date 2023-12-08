// File#: _1_pre-header
// Usage: codyhouse.co/license
(function() {
  var preHeader = document.getElementsByClassName('js-pre-header');
  if(preHeader.length > 0) {
    var windowResize = false; // will use during window resize - to update --pre-header-height variable
    for(var i = 0; i < preHeader.length; i++) {
      (function(i){ addPreHeaderEvent(preHeader[i]);})(i);
    }

    function addPreHeaderEvent(element) {
      var close = element.getElementsByClassName('js-pre-header__close-btn')[0];
      setPreHeaderCSSVar(element); // update CSS variable

      // on resize - update CSS variable
      var bindResize = preHeaderResize.bind(element);
      window.addEventListener('resize', bindResize);

      if(close) {
        close.addEventListener('click', function(event) {
          event.preventDefault();
          Util.addClass(element, 'pre-header--is-hidden');
          setPreHeaderCSSVar(false);
          window.removeEventListener('resize', bindResize);
        });
      }
    };

    function preHeaderResize() {
      if(windowResize) return;
      windowResize = true;
      var self = this;
      window.requestAnimationFrame(function(){
        setPreHeaderCSSVar(self);
        windowResize = false;
      });
    };

    function setPreHeaderCSSVar(element) { // update pre-header CSS variable
      var height = element ? element.offsetHeight : 0;
      document.documentElement.style.setProperty('--pre-header-height', height+'px');
    };
  }
}());