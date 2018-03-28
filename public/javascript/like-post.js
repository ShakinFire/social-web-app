$(function() {
    $('#like-btn').on('click', function(event) {
        event.preventDefault();
        const $postId = $('.hiddenId');

        $.ajax({
            method: 'GET',
            url: '/like',
            data: { id: $postId },
            processData: false,
            success: function(response) {
                console.log(response);
            }
        });
    });
});