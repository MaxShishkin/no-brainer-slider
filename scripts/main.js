(function() {
  var $autoplayAll, $autoplays, $navigations, $sliders, $slides;

  $sliders = $('.slider');

  $slides = $sliders.find('.slide');

  $navigations = $('.slider-nav');

  $autoplays = $('.autoplay input');

  $autoplayAll = $('.autoplay-all input');

  $sliders.each(function(i) {
    return $(this).noBrainerSlider({
      nav: $($navigations[i]),
      autoplay: false
    });
  });

  $autoplays.on('change', function(e) {
    var index;
    index = $autoplays.index(this);
    return $($sliders[index]).data('noBrainerSlider').setAutoplay(this.checked);
  });

  $autoplayAll.on('change', function(e) {
    return $autoplays.prop('checked', this.checked).trigger('change');
  });

  $(window).resize(function() {
    return $slides.css('visibility', 'visible');
  });

  if (!Modernizr.csstransitions) {
    $('.examples h2').after('<div class="warn">\
        Your browser doesn\'t support css transitions. We\'re doomed.\
        </div>');
  } else {
    if (!Modernizr.csstransforms) {
      $('.examples h2').after('<div class="warn">\
            Your browser doesn\'t support css transformations. Too bad to be true.\
            </div>');
    } else if (!Modernizr.csstransforms3d) {
      $('.examples h2').after('<div class="warn">\
            Your browser doesn\'t support css 3d transformations. Half examples won\'t work.\
            </div>');
    }
  }

}).call(this);
