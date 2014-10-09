
<script>
$(document).ready(function(){
	var div = $("#ctl00_rightContent");
  var result = "-notdynamic";

	// Web storage sessions
	if (!sessionStorage.randNum) {
	    sessionStorage.randNum = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
	}

	// Generate that random Integer
	var randInt = sessionStorage.randNum;
	if(randInt == 0){
		div.style( "visibility", "visible", "important");
		div.delay( 3000 ).animate({
		    left:'-=760px'
		  }, 4000, "easeOutQuint", function() {
		});
    result = "-dynamic";
	}
	else {
		div.style( "left", "35px", "important");
		div.style( "visibility", "visible", "important");
	}

  $('#ctl00_rightContent a').each(function () { /* ... */ 
    var href = $(this).attr("href"); // Fetch link URL
    if(href !== undefined)  {
        // Retreiving and updating utm_source
        var index = href.indexOf("utm_source{equals}"); //Index of where found in link string
        if(index != -1){
            var url = href.substr(index + 18) // Slice href at location of 'utm_source' plus length (18)
            var indexx = url.indexOf("{and}utm_medium");
            if(indexx != -1)
                url = url.substr(0, indexx);
            href = href.replace("utm_source{equals}" + url, "utm_source{equals}" + url + result);
            $(this).attr('href', href);
        }
    }
  });
});

(function($) {    
  if ($.fn.style) {
    return;
  }

  // Escape regex chars with \
  var escape = function(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  // For those who need them (< IE 9), add support for CSS functions
  var isStyleFuncSupported = !!CSSStyleDeclaration.prototype.getPropertyValue;
  if (!isStyleFuncSupported) {
    CSSStyleDeclaration.prototype.getPropertyValue = function(a) {
      return this.getAttribute(a);
    };
    CSSStyleDeclaration.prototype.setProperty = function(styleName, value, priority) {
      this.setAttribute(styleName, value);
      var priority = typeof priority != 'undefined' ? priority : '';
      if (priority != '') {
        // Add priority manually
        var rule = new RegExp(escape(styleName) + '\\s*:\\s*' + escape(value) +
            '(\\s*;)?', 'gmi');
        this.cssText =
            this.cssText.replace(rule, styleName + ': ' + value + ' !' + priority + ';');
      }
    };
    CSSStyleDeclaration.prototype.removeProperty = function(a) {
      return this.removeAttribute(a);
    };
    CSSStyleDeclaration.prototype.getPropertyPriority = function(styleName) {
      var rule = new RegExp(escape(styleName) + '\\s*:\\s*[^\\s]*\\s*!important(\\s*;)?',
          'gmi');
      return rule.test(this.cssText) ? 'important' : '';
    }
  }

  // The style function
  $.fn.style = function(styleName, value, priority) {
    // DOM node
    var node = this.get(0);
    // Ensure we have a DOM node
    if (typeof node == 'undefined') {
      return this;
    }
    // CSSStyleDeclaration
    var style = this.get(0).style;
    // Getter/Setter
    if (typeof styleName != 'undefined') {
      if (typeof value != 'undefined') {
        // Set style property
        priority = typeof priority != 'undefined' ? priority : '';
        style.setProperty(styleName, value, priority);
        return this;
      } else {
        // Get style property
        return style.getPropertyValue(styleName);
      }
    } else {
      // Get CSSStyleDeclaration
      return style;
    }
  };
})(jQuery);
</script>
