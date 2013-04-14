$sliders = $('.slider')
$slides = $sliders.find('.slide')
$navigations = $('.slider-nav')
$autoplays = $('.autoplay input')
$autoplayAll = $('.autoplay-all input')


$sliders.each (i) ->
    $(this).noBrainerSlider({
        nav: $($navigations[i]),
        autoplay: false
    })


$autoplays.on 'change', (e) ->
    index = $autoplays.index(this)
    $($sliders[index]).data('noBrainerSlider').setAutoplay(this.checked)


$autoplayAll.on 'change', (e) ->
    $autoplays.prop('checked', this.checked).trigger('change')


# Fix viewport-sized fonts in slider,
# causing repaint on resize
$(window).resize () ->
  $slides.css('visibility', 'visible')
