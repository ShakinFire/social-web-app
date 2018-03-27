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
            beforeSend:
                // TO-DO: Put some loading gif and hide it at the success.
                function () {
                    $targetImage.css('opacity', '0.5');
                },
            success:
                function(response) {
                    $targetImage.attr('src', response);
                    $targetImage.css('opacity', '1');
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

        $button.on(" change ", function() {
            if ($button[0].files.length !== 0) {
                $whichImage.val(targetImage);
                sendImage($imageToBeChanged, $form);
            }
        });
    };

    function applyHoverEffect($jQueryObj) {
        $jQueryObj.mouseenter(function(){
            $(this).css('opacity', '0.5');
        }).mouseleave(function() {
            $(this).css('opacity', '1');
        });
    }

    $profileImg = $(" #profile-img ");
    $coverImg = $(" #cover-img ");

    applyHoverEffect($profileImg);
    applyHoverEffect($coverImg);

    $profileImg.on(" click ", showUploadDialog);
    $coverImg.on(" click ", showUploadDialog);

});
