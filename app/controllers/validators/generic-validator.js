class GenericValidator {
    constructor() {
    }

    isGoodAtAll(target) {
        return true;
    }

    isEmail(target) {
        const {
            email,
        } = target;

        const regExEmail = RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');

        if (regExEmail.test(email)) {
            throw new Error('The email contains forbidden characters.');
        }
        if (!(8 < email.length && email.length < 100)) {
            throw new Error('The email doesn\'t match the length requirement.');
        }

        return true;
    }

    isPasswordCorrect(target) {
        const {
            password,
        } = target;

        if (!(4 < password.length && password.length < 31)) {
            throw new Error('The password is too short'
             + 'Its length should be between 5 and 30 characters.');
        }
        return true;
    }

    isUsernameCorrect(target) {
        const {
            username,
        } = target;

        if (!(2 < username.length && username.length < 31)) {
            throw new Error('Username\'s length should be between 3 and 30 characters');
        }

        const regExUser = RegExp('/([^A-Za-z0-9-_])+/gi');
        if (regExUser.test(username)) {
            throw new Error('The username contains forbidden characters.');
        }

        return true;
    }
}

module.exports = GenericValidator;
