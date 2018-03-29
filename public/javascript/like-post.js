$(function() {
    $('.like-btn').on('click', function(event) {
        event.preventDefault();
        const $postId = $('#span-wrapper').children(':first').html();
        console.log($postId);
        console.log('there was an attempt');
        $.ajax({
            method: 'GET',
            url: '/like',
            data: { id: $postId },
            success: function(response) {
                console.log(response);
            }
        });
    });
});