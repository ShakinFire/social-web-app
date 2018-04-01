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

    (function showPostComments() {

        function send(id) {
            $.ajax({
                url: '/profile/posts/' + id + '/comments',
                method: 'GET',
                success:
                    function(response) {
                        var $modal = $('#comments-modal');
                        $modal.find('.modal-body').html(response);
                        $modal.modal('toggle');
                    },
                error:
                    function(err) {
                        console.log(err);
                    }
            });
        };

        $('.chosen-tab-context .show-comments').on("click", function(event) {
            event.preventDefault();

            var postId = $(this).attr("post-id");

            // Sending an AJAX to get all comments associated with the post.
            send(postId);
        });
    })();
});
