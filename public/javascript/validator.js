$(function () {
    window.validate = (function () {
        function isEmail(email) {
            if (email.length === 0) {
                return true;
            }

            var regExEmail = new RegExp(/([^A-Za-z0-9-_@.])+/gi);

            if (regExEmail.test(email)) {
                throw new Error('The email contains forbidden characters.');
            }
            if (!(8 < email.length && email.length < 100)) {
                throw new Error('The email doesn\'t match the length requirement.');
            }
            return true;
        }

        function isUsernameCorrect(username) {

            if (username.length === 0) {
                return true;
            }

            if (!(2 < username.length && username.length < 31)) {
                throw new Error('Username\'s length should be between 3 and 30 characters');
            }

            var regExUser = new RegExp(/([^A-Za-z0-9-_])+/gi);
            if (regExUser.test(username)) {
                throw new Error('The username contains forbidden characters.');
            }

            return true;
        }

        function isPasswordCorrect(password) {

            if (password.length === 0) {
                return true;
            }

            if (!(4 < password.length && password.length < 31)) {
                throw new Error('The password is too short' +
                    'Its length should be between 5 and 30 characters.');
            }

            return true;
        }

        function isFirstNameCorrect(firstName) {

            if (firstName.length === 0) {
                return true;
            }

            if (firstName.length > 30) {
                throw new Error(
                    'First name\'s length should not be more than 30 characters');
            }

            var regExName = new RegExp(/([^A-Za-z ])+/gi);
            if (regExName.test(firstName)) {
                throw new Error('Your first name contains forbidden characters.');
            }

            return true;
        }

        function isLastNameCorrect(lastName) {

            if (lastName.length === 0) {
                return true;
            }

            if (lastName.length > 30) {
                throw new Error(
                    'Last name\'s length should not be more than 30 characters');
            }

            var regExName = new RegExp(/([^A-Za-z ])+/gi);
            if (regExName.test(lastName)) {
                throw new Error('Your last name contains forbidden characters.');
            }
            return true;
        }

        function isAddressCorrect(address) {
            if (address.length === 0) {
                return true;
            }

            var regExAddress = new RegExp(/([^#'"A-Za-z0-9-_, ])+/gi);
            if (regExAddress.test(address)) {
                throw new Error('Your address contains invalid characters');
            }

            if (address.length > 100) {
                throw new Error(
                    'Address\'s length should not be more than 100 characters');
            }

            return true;

        }

        return {
            isEmail,
            isUsernameCorrect,
            isFirstNameCorrect,
            isLastNameCorrect,
            isAddressCorrect,
            isPasswordCorrect,
        };
    })();
});