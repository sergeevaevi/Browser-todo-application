(function ($) {
    $(window).on('load', function () {
        $('.container__task').mCustomScrollbar();
    });
})(jQuery);

$('.container__task').mCustomScrollbar({
    axis: 'y',              // вертикальный скролл
    theme: 'minimal-dark',  // тема
    scrollInertia: '330',   // продолжительность прокрутки, значение в миллисекундах
    // setHeight: '100%',      // высота блока (переписывает CSS)
    mouseWheel: {
        deltaFactor: 20    // кол-во пикселей на одну прокрутку колёсика мыши
    }
});