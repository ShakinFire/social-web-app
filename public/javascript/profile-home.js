$(function() {
    $('.table tr').on('mouseenter', function() {
        $(this).addClass('active');
    }).on('mouseleave', function() {
        $(this).removeClass('active');
    });
});