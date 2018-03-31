$(function() {
    $(document).on('click', '.like-btn', function(event) {
        event.preventDefault();
        var $likeCount = $(this).find('#like-number');
        var $changeColor = $(this).find('.fa-thumbs-o-up');
        var $postId = $(this).parent().parent().parent().find('.hiddenId').html();
        $.ajax({
            method: 'GET',
            url: '/like',
            data: { id: $postId },
            success: function(response) {
                var number = +$likeCount.html().replace(/([A-Za-z()])+/g, '');
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