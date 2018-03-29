$(function() {
    $('.like-btn').on('click', function(event) {
        event.preventDefault();
        const $likeCount = $(this).find('#like-number');
        const $changeColor = $(this).find('.fa-thumbs-o-up');
        const $postId = $(this).parent().parent().parent().find('.hiddenId').html();
        $.ajax({
            method: 'GET',
            url: '/like',
            data: { id: $postId },
            success: function(response) {
                let number = +$likeCount.html().replace(/([A-Za-z()])+/g, '');
                if (response) {
                    // like
                    $likeCount.html('Like(' + (number + 1) + ')');
                    $changeColor.css('color', 'rgb(10, 139, 214)');
                } else {
                    // dislike
                    $likeCount.html('Like(' + (number - 1) + ')');
                    $changeColor.css('color', 'rgb(68, 68, 68)');
                }
            }
        });
    });
});