$(function () {
    var submit = function(textContent, postId, $this) {
        var $commentCount = $this.closest('#post-comment-wrapper').find('#comment-number');
        $.ajax({
            url: '/comment',
            method: 'POST',
            data: { 
                content: textContent,
                id: postId,
            },
            success: function(response) {
                if (response) {
                    $this.val('');
                    $this.parent().prepend(response);
                    var number = +$commentCount.html().replace(/([A-Za-z()])+/g, '');
                    $commentCount.html('Comment(' + (number + 1) + ')');
                }
            }
        });
    }

    $(document).on('keypress', '.post-comment-message', function(event) {
        if (event.which === 13 && !event.shiftKey) {
            var textareaContent = $(this).val();
            var $postId = $(this).closest('#post-comment-wrapper').find('.hiddenId').html();
            submit(textareaContent, $postId, $(this));
            event.preventDefault();
        }
    });
});