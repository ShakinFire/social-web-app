$(function() {
    var $dropdown = $('.dropdown');
    var $menuList = $dropdown.find(' .dropdown-menu');
    var $profileImgAsBtn = $dropdown.find(' .profile-img-as-btn');
    var $caret = $dropdown.find(' .caret');

    $caret.on('click', function(event) {
        $menuList.toggle(150);
    });

    $profileImgAsBtn.on('click', function(event) {
        $menuList.toggle(150);
    });

    $.ajax({
        method: 'GET',
        url: 'profile/image',
        success: function(result) {
            $profileImgAsBtn.css('background-image', "url('" + result + "')");
        },
    });
});
