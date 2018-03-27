/* eslint-disable */
$(function () {
    
    function sendImage($targetImage, $formToBeSent) {

        form = new FormData($formToBeSent[0]);

        $.ajax({
            url: $formToBeSent.attr('action'),
            method: $formToBeSent.attr('method'),
            data: form,
            contentType: false, 
            processData: false,
            cache: false,
            success:
                // TO-DO: Put some loading gif and hide it at the success.
                function(response) {
                    $targetImage.attr('src', response);
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

        $button.click();

        $button.change(function() {
                $whichImage.val(targetImage);
                sendImage($imageToBeChanged, $form);
        });
    };

    $(" #profile-img ").on(" click ", showUploadDialog);
    $(" #cover-img ").on(" click ", showUploadDialog);

});
