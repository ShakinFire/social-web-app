/* eslint-disable */
$(function () {
    
    function sendImage($imgToBeChanged, $formToBeSent, targetImg) {

        form = new FormData($formToBeSent[0]);

        $.ajax({
            url: $formToBeSent.attr('action'),
            method: $formToBeSent.attr('method'),
            data: form,
            contentType: false, 
            processData: false,
            cache: false,
            beforeSend:
                function() {
                    $imgToBeChanged.hide();
                    $imgToBeChanged.parent().removeClass('profile-image-hover');
                    $imgToBeChanged.parent().removeClass('cover-image-hover');
                },
            success:
                // TO-DO: Put some loading gif and hide it at the success.
                function(response) {
                    $imgToBeChanged.parent().addClass('profile-image-hover');
                    $imgToBeChanged.parent().addClass('cover-image-hover');
 
                    $imgToBeChanged.attr('src', response);
                    $imgToBeChanged.show();

                    var shouldUpdateNavImg = (targetImg === 'profile') ? true : false;
                    if (shouldUpdateNavImg) {
                        $profileImgAsBtn.css('background-image', "url('" + response + "')");
                    }
                },
            error:
                function(err) {
                    console.log(err);
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
        $button.one('change', function() {
            sendImage($imageToBeChanged, $form, targetImage);
        });
    };

    $(" #profile-img ").on(" click ", showUploadDialog);
    $(" #cover-img ").on(" click ", showUploadDialog);

});
