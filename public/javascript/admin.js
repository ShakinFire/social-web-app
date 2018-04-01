$(function() {
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

        $link = $('.delete')
        $link.on("click", function() {
            var userId = $(this).attr("user-id");
            var $parent = $(this).parent().parent();
            send(userId, $parent);
        });
    })();
});