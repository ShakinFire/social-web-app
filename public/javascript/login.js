$(function() {
    function send($formToBeSent) {
        $.ajax({
            url: $formToBeSent.attr("action"),
            method: $formToBeSent.attr("method"),
            data: $formToBeSent.serialize(),
            success:
                function(response) {
                    window.location.replace('/');
                },
            error: 
                function (err) {
                    showAlert(err.responseText);
                },
        });
    };

    function isValid($formToBeSent) {
        // TO-DO: Client-side validation.
    }

    var $form = $('.login-form');
    $form.on(" submit ", function(event) {
        event.preventDefault();

        try {

        isValid($(this));
        send($(this));

        } catch (err) {
            showAlert(err);
        }
    });
});
