/* eslint-disable */

$(function () {

    function getInformation(resource) {
        url = '/profile/' + resource;
        informationContainer = $('.chosen-tab-context').load(url);
    };

    (function showActiveTab() {
        var navHorizontal = $('.nav-profile-horizontal');

        navHorizontal.find('li').on('click', function (event) {
            event.preventDefault();

            navHorizontal.find('li.active').removeClass('active');

            $(this).addClass('active');

            const requestedResource = $(this).attr('name')
            getInformation(requestedResource);
        });
    })();
});
