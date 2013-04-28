(function() {
  var TRANSITION_END, noBrainerSlider;

  noBrainerSlider = {
    _init: function($element, options) {
      var _this = this;
      this.$element = $element;
      this.options = $.extend({}, $.fn.noBrainerSlider.defaultOptions, options);
      this.$$slides = [];
      this.$$navLinks = [];
      this.activeSlideId = -1;
      this.$element.find('.slide').each(function(i, slide) {
        return _this.$$slides.push($(slide).addClass('nbs-slide'));
      });
      if (this.options.nav) {
        this.options.nav.find('.slide-nav').each(function(i, navLink) {
          return _this.$$navLinks.push($(navLink).data('slideId', i));
        });
      }
      this._addEvenLiteners();
      this.gotoSlide(0);
      this._autoplay(this.options.autoplay);
      return this;
    },
    _addEvenLiteners: function() {
      var _this = this;
      if (this.options.nav) {
        this.options.nav.on('click', '.slide-nav', function(e) {
          e.preventDefault();
          return _this.gotoSlide($(e.target).data('slideId'));
        });
      }
      this.$element.hover(function(e) {
        return _this._autoplay(false);
      }, function(e) {
        return _this._autoplay(_this.options.autoplay);
      });
      return this.$element.on(TRANSITION_END, '.nbs-slide', function(e) {
        var i, _i, _ref;
        if ($(e.target).hasClass('nbs-current')) {
          for (i = _i = 0, _ref = _this.$$slides.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            _this.$$slides[i].removeClass('nbs-visible');
          }
          return _this._autoplay(_this.options.autoplay);
        }
      });
    },
    gotoSlide: function(id) {
      var $slide, i, _i, _ref;
      if (!this._canSwitchToSlide(id)) {
        return;
      }
      if (id < this.activeSlideId) {
        this.$element.addClass('backward');
      } else {
        this.$element.removeClass('backward');
      }
      for (i = _i = 0, _ref = this.$$slides.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        $slide = this._clearSlideState(this.$$slides[i]);
        if (i < id) {
          $slide.addClass('nbs-before-current');
        } else if (i > id) {
          $slide.addClass('nbs-after-current');
        } else {
          $slide.addClass('nbs-current');
        }
        if (i === id) {
          $slide.addClass('nbs-visible');
          this.$$navLinks[i].addClass('active');
        }
        if (i === this.activeSlideId) {
          $slide.addClass('nbs-visible');
          this.$$navLinks[i].removeClass('active');
        }
      }
      if (Modernizr.csstransitions) {
        this._autoplay(false);
      } else {
        this._autoplay(this.options.autoplay);
      }
      return this.activeSlideId = id;
    },
    setAutoplay: function(autoplay) {
      this.options.autoplay = autoplay;
      return this._autoplay(autoplay);
    },
    _autoplay: function(autoplay) {
      var _this = this;
      if (this.autoplayIntervalId) {
        clearInterval(this.autoplayIntervalId);
        this.autoplayIntervalId = 0;
      }
      if (autoplay) {
        return this.autoplayIntervalId = setInterval(function() {
          return _this.gotoSlide((_this.activeSlideId + 1) % _this.$$slides.length);
        }, this.options.autoplayDelay);
      }
    },
    _canSwitchToSlide: function(id) {
      return (0 <= id && id < this.$$slides.length) && id !== this.activeSlideId;
    },
    _clearSlideState: function($slide) {
      return $slide.removeClass('nbs-current nbs-before-current nbs-after-current nbs-visible');
    }
  };

  TRANSITION_END = 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd';

  $.fn.noBrainerSlider = function(options) {
    return this.data('noBrainerSlider', Object.create(noBrainerSlider)._init(this, options));
  };

  $.fn.noBrainerSlider.defaultOptions = {
    autoplay: false,
    autoplayDelay: 5000
  };

  if (!Object.create) {
    Object.create = function(o) {
      var F;
      if (arguments.length > 1) {
        throw new Error('Object.create implementation only accepts the first parameter.');
      }
      F = function() {};
      F.prototype = o;
      return new F;
    };
  }

}).call(this);
