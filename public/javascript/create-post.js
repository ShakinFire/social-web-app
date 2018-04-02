$(function() {
    var submit = function(textContent) {
        $.ajax({
            url: '/',
            method: 'POST',
            data: { content: textContent },
            success:
                function(response) {
                    $('#post-message').val('');
                    $('#all-posts-wrapper').prepend(response);
                },
            error:
                function(err) {
                    showAlert(err.responseText);
                }
        });
    }

    $('.post-btn').on('click', function(event) {
        event.preventDefault();
        var textareaContent = $('#post-message').val();
        submit(textareaContent);
    });

    $('#post-message').keypress(function(event) {
        if (event.which === 13 && !event.shiftKey) {
            var textareaContent = $('#post-message').val();
            submit(textareaContent);
            event.preventDefault();
        }
    });
});