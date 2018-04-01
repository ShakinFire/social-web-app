$(function() {

    (function applyDeleteHandlers() {
        function sendDelete(id, $postWrapper) {
            $.ajax({
                method: 'POST',
                url: 'profile/posts/delete/' + id,
                success:
                    function(response) {
                        $postWrapper.hide(200);
                    },
                error:
                    function(err) {
                        showAlert(err.responseText);
                    },
            });
        }

        $(".posts-container .post-delete").on(" click ", function() {
            var id = $(this).attr("post-id");
            var $parent = $(this).parent().parent();
            sendDelete(id, $parent);
        });
    })();

    (function showPostLikes() {

        function send(id) {
            $.ajax({
                url: '/profile/posts/' + id + '/comments',
                method: 'GET',
                success:
                    function(response) {
                        $modal = $('#comments-modal');
                        $modal.find('.modal-body').html(response);
                        $modal.modal('toggle');
                    },
                error:
                    function(err) {
                        console.log(err);
                    }
            });
        }

        var $link = $('#show-comments');
        var postId = $link.attr("post-id");

        $link.on("click", function(event) {
            event.preventDefault();

            // Sending an AJAX to get all the users who liked the post.
            send(postId);
        });
    })();
});
