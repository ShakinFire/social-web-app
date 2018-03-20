$(function() {
    $('#post-message').on('input', function() {
        var minHeight = parseInt($(this).css('min-height'));
        $(this).css('height', minHeight + 'px');
        var scrollHeight = $(this).get(0).scrollHeight;
        $(this).css('height', scrollHeight + 'px');
    });
});