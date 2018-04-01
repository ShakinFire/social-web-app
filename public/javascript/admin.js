$(function() {
    $('[data-toggle="tooltip"]').tooltip(); 

    (function deleteUser() {

        function send(userId, $parentDiv) {
            $.ajax({
                url: 'admin/users/delete/' + userId,
                method: 'POST',
                success:
                    function() {
                        $parentDiv.hide(200);
                    },
                error:
                    function(err) {
                        console.log(err.responseText);
                    }
            });
        }

        $link = $('.delete-user')
        $link.on("click", function() {
            var userId = $(this).attr("user-id");
            var $parent = $(this).parent().parent();
            send(userId, $parent);
        });
    })();

    (function deletePost() {

        function send($parentDiv, id) {
            $.ajax({
                url: "admin/posts/delete/" + id,
                method: "POST",
                success:
                    function(response) {
                        $parentDiv.hide(200);
                    },
                error:
                    function(err) {
                        showAlert(err.responseText);
                    },
            });
        }

        $('.delete-post').on("click", function() {

            const $parent = $(this).parent().parent();
            const postId = $(this).attr("post-Id");

            send($parent, postId);
        });
    })();

    (function showComments() {
        
        function send(postId) {
            $.ajax({
                url: "/profile/posts/" + postId + "/comments",
                method: "GET",
                success:
                    function(response) {
                        var $modal = $('#comments-modal');
                        $modal.find('.modal-body').html(response);
                        $modal.modal('toggle');
                    },
                error:
                    function(err) {
                        showAlert(err.response);
                        console.log(err);
                    },
            });
        };

        $('.chosen-tab-context .total-comments').on("click", function(event) {
            event.preventDefault();
            var postId = $(this).parent().siblings().first().text();
            send(postId);
        })
    })();

    (function searchThroughPosts() {
        var $input = $('#search-box');
        var $postsAuthors = $(".single-post-row td:nth-child(6)");

        $input.on("input", function(event) {
            event.preventDefault();
            var searchString = $input.val().toLowerCase();

            $postsAuthors.each(function() {
                var postAuthor = $(this).text().toLowerCase();
                if (postAuthor.indexOf(searchString) === -1) {
                    $(this).parent().hide();
                } else {
                    $(this).parent().show();
                }
            });
        });
    })();
});