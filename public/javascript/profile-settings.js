$(function () {
    function updateImg() {
        function send($imgToBeChanged, $formToBeSent, targetImg) {

            form = new FormData($formToBeSent[0]);

            $.ajax({
                url: $formToBeSent.attr('action'),
                method: $formToBeSent.attr('method'),
                data: form,
                contentType: false,
                processData: false,
                cache: false,
                beforeSend: function () {
                    $imgToBeChanged.hide();
                    $imgToBeChanged.parent().removeClass('profile-image-hover');
                    $imgToBeChanged.parent().removeClass('cover-image-hover');
                },
                success:
                    function (response) {
                        $imgToBeChanged.parent().addClass('profile-image-hover');
                        $imgToBeChanged.parent().addClass('cover-image-hover');

                        $imgToBeChanged.attr('src', response);
                        $imgToBeChanged.show();

                        var shouldUpdateNavImg = (targetImg === 'profile') ? true : false;
                        if (shouldUpdateNavImg) {
                            var $profileImgAsBtn = $('.profile-img-as-btn');
                            $profileImgAsBtn.css('background-image', "url('" + response + "')");
                        }
                    },
                error: function (err) {
                    showAlert(err.responseText);
                    $imgToBeChanged.parent().addClass('profile-image-hover');
                    $imgToBeChanged.parent().addClass('cover-image-hover');
                    $imgToBeChanged.show();
                }
            });
        };

        function showUploadDialog() {
            $imageToBeChanged = $(this);

            var $form = $(" #upload-form ");
            var $button = $(" #upload-field ");

            var $whichImage = $(" #which-image");
            var targetImage = $imageToBeChanged.hasClass('cover-img') ? 'cover' : 'profile';
            $whichImage.val(targetImage);

            $button.trigger('click');
            $button.one('change', function () {
                send($imageToBeChanged, $form, targetImage);
            });
        };

        $(" #profile-img ").on(" click ", showUploadDialog);
        $(" #cover-img ").on(" click ", showUploadDialog);
    };

    function updateProfileInfo() {

        function showLoadingAnimation($givenForm) {
            $givenForm.css('opacity', '0');
            $givenForm.parent().addClass('form-update-wrapper');
        }

        function hideLoadingAnimation($givenForm) {
            $givenForm.parent().removeClass('form-update-wrapper');
            $givenForm.css('opacity', '1');
        }

        function applyNewData(data, $targetForm) {
            $targetForm.find('input[name="first_name"]').val(data.first_name);
            $targetForm.find('input[name="last_name"]').val(data.last_name);
            $targetForm.find('textarea[name="description"]').val(data.description);
            $targetForm.find('input[name="address"]').val(data.address);
            $targetForm.find('input[name="birthday"]').val(data.birthday);
            $targetForm.find('input[name="email"]').attr("placeholder", data.email).val("");
            $targetForm.find('input[type="password"]').each(function() {
                $(this).val("");
            });
        }

        function send($formGiven) {
            var formJSON = {};
            $formGiven.serializeArray().map(function (field) {
                formJSON[field.name] = field.value
            });

            $.ajax({
                url: $formGiven.attr('action'),
                method: $formGiven.attr('method'),
                data: JSON.stringify(formJSON),
                contentType: 'application/json; charset=utf-8',
                beforeSend: showLoadingAnimation($formGiven),
                success: function (response) {
                    var responseObj = JSON.parse(response);
                    applyNewData(responseObj, $formGiven);
                    hideLoadingAnimation($formGiven);
                },
                error: function (err) {
                    hideLoadingAnimation($formGiven);
                    showAlert(err.responseText);
                },
            });
        }

        function isValid($formGiven) {
            // TO-DO: Client Side validation.
            return true;
        }

        var $form = $('.form-update-info')
        $form.on('submit', function (event) {
            event.preventDefault();

            if (isValid($(this))) {
                send($(this));
            } else {
                showAlert('Please, fill all fields in a correct way.');
            }
        });
    }

    updateImg();
    updateProfileInfo();

});