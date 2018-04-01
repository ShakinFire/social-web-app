/* eslint-disable */

$(function () {
    function getInformation(page, resource) {
        informationContainer = $('.chosen-tab-context').load(page + '/' + resource);
    };

    function showActiveTab($nav, page) {
        $nav.find('li').on('click', function (event) {
            $nav.find('li.active').removeClass('active');
            $(this).addClass('active');

            var requestedResource = $(this).attr('name');
            getInformation(page, requestedResource);
        });
    };

    var $profileNav = $('.nav-profile-horizontal');
    showActiveTab($profileNav, 'profile');

    var $adminNav = $('.nav-admin-horizontal');
    showActiveTab($adminNav, 'admin');
});
