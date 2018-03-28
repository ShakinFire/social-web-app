$(function() {
    var queryParam = 0;
    let work = false;

    $(window).scroll(function () {
        if ($(this).scrollTop() + 1 >= $('body').height() - $(window).height()) {
            if (!work) {
                work = true;
                queryParam += 10;
                $.ajax({
                    method: 'GET',
                    url: '/',
                    data: { load: queryParam },
                    success: function(response) {
                        $('#all-posts-wrapper').append(response);
                        setTimeout(function() {
                            work = false;
                        }, 3000);
                    },
                });
            }
        }
    });
});