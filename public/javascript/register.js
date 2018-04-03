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

    function isValid($formGiven) {
        var username = $formGiven.find('input[name="username"]').val();
        var password = $formGiven.find('input[name="password"]').val();
        var email = $formGiven.find('input[name="email"]').val();
        
        try {
            validate.isUsernameCorrect(username);
            validate.isPasswordCorrect(password);
            validate.isEmail(email);
            return true;
        } catch (err) {
            showAlert(err.message);
            return false;
        }

    };

    var $form = $('.registration-form');

    $form.on(" submit ", function(event) {
        event.preventDefault();

        if (isValid($(this))) {
            send($(this));
        }
    });
});
