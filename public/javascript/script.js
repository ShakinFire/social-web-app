$(function() {
    $('#post-message').on('input', function() {
        var minHeight = parseInt($(this).css('min-height'));
        $(this).css('height', minHeight + 'px');
        var scrollHeight = $(this).get(0).scrollHeight;
        $(this).css('height', scrollHeight + 'px');
    });

    var images = [
        '../img/img1.jpeg',
        '../img/img2.jpg',
        '../img/img3.jpeg',
        '../img/img4.jpg',
        '../img/img5.jpeg',
        '../img/img6.jpeg',
    ];

    var randomNumber = Math.floor(Math.random() * images.length);
    var bgImg = 'url(' + images[randomNumber] + ')';

    $('.bg-img').css({'background-image':bgImg});

    // TODO: REFACTOR THE CODE TO BE IN MODULES BEFORE IT GROWS AND KILL US
});