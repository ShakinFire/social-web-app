/* eslint-disable */

$(function () {
    function getInformation(resource) {
        informationContainer = $('.chosen-tab-context').load('profile/' + resource);
    };

    (function showActiveTab() {
        var navHorizontal = $('.nav-profile-horizontal');
        navHorizontal.find('li').on('click', function (event) {
            navHorizontal.find('li.active').removeClass('active');
            $(this).addClass('active');

            var requestedResource = $(this).attr('name');
            getInformation(requestedResource);
        });
    })();
});
