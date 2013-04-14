noBrainerSlider =
    _init: (@$element, options) ->
        @options = $.extend {},
            $.fn.noBrainerSlider.defaultOptions,
            options

        @$$slides = []
        @$$navLinks = []
        @activeSlideId = -1

        @$element.find('.slide').each (i, slide) =>
            @$$slides.push $(slide).addClass('nbs-slide')

        if @options.nav
            @options.nav.find('.slide-nav').each (i, navLink) =>
                @$$navLinks.push $(navLink).data('slideId', i)

        @_addEvenLiteners()

        @gotoSlide 0

        @_autoplay @options.autoplay

        return this


    _addEvenLiteners: () ->
        if @options.nav
            @options.nav.on 'click', '.slide-nav', (e) =>
                e.preventDefault()
                @gotoSlide $(e.target).data('slideId')

        @$element.hover (e) =>
            @_autoplay false
        , (e) =>
            @_autoplay @options.autoplay

        @$element.on TRANSITION_END, '.nbs-slide', (e) =>
            if $(e.target).hasClass('nbs-current')
                for i in [0...@$$slides.length]
                    @$$slides[i].removeClass('nbs-visible')

                @_autoplay @options.autoplay


    gotoSlide: (id) ->
        return if !@_canSwitchToSlide(id)

        @_autoplay false

        if (id < @activeSlideId)
            @$element.addClass('backward')
        else
            @$element.removeClass('backward')

        for i in [0...@$$slides.length]
            $slide = @_clearSlideState(@$$slides[i])

            if (i < id)
                $slide.addClass('nbs-before-current')
            else if (i > id)
                $slide.addClass('nbs-after-current')
            else
                $slide.addClass('nbs-current')

            if i == id
                $slide.addClass('nbs-visible')
                @$$navLinks[i].addClass('active')

            if i == @activeSlideId
                $slide.addClass('nbs-visible')
                @$$navLinks[i].removeClass('active')

        @activeSlideId = id;


    setAutoplay: (autoplay) ->
        @options.autoplay = autoplay
        @_autoplay autoplay


    _autoplay: (autoplay) ->
        if (@autoplayIntervalId)
            clearInterval(@autoplayIntervalId)
            @autoplayIntervalId = 0

        if autoplay
            @autoplayIntervalId = setInterval () =>
                @gotoSlide (@activeSlideId + 1) % @$$slides.length
            , @options.autoplayDelay


    _canSwitchToSlide: (id) ->
        return 0 <= id < @$$slides.length && id != @activeSlideId


    _clearSlideState: ($slide) ->
        $slide.removeClass 'nbs-current nbs-before-current nbs-after-current nbs-visible'


TRANSITION_END = 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd'


$.fn.noBrainerSlider = (options) ->
    this.data 'noBrainerSlider',
        Object.create(noBrainerSlider)._init(this, options)


$.fn.noBrainerSlider.defaultOptions =
    autoplay: false
    autoplayDelay: 5000
