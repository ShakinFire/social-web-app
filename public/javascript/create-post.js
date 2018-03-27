$(function() {
    $('.post-btn').on('click', function(event) {
        event.preventDefault();
        var textareaContent = $('#post-message').val();
        $.ajax({
            url: '/',
            method: 'POST',
            data: { content: textareaContent },
            success: function(response) {
                $('#all-posts-wrapper').prepend(response);
            }
        });
    });
});