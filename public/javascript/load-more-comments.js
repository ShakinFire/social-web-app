$(function() {
    var loadOnPost = {};
    var commentsLoad = 5;

    $(document).on('click', '#load-more-comments', function(event) {
        event.preventDefault();
        var $postId = $(this).closest('#post-comment-wrapper').find('.hiddenId').html();
        var $this = $(this);

        if (loadOnPost[$postId]) {
            loadOnPost[$postId] += commentsLoad;
        } else {
            loadOnPost[$postId] = commentsLoad;
        }

        console.log(loadOnPost);
        $.ajax({
            url: '/comment',
            method: 'GET',
            data: { 
                load: loadOnPost[$postId],
                postId: $postId,
             },
            success: function(response) {
                if (response[response.length - 1] === 'y') {
                    // if we need to leave alone the 'load more comments' button
                    response = response.slice(0, -1); // remove the 'y' at the end
                    $this.parent().prev().after(response);
                } else {
                    // if all the comments are loaded
                    $this.html('');
                    $this.parent().prev().after(response);
                }
            }
        });
    });

    $(document).on('click', '#comment-btn', function(event) {
        event.preventDefault();
        $(this).closest('#post-comment-wrapper').find('#focus-me').focus();
    });
});