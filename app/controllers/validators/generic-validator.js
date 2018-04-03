class GenericValidator {
    constructor() {}

    escapeHtml(target) {
        target
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot')
            .replace(/'/g, '&#39');
        return target;
        // returning the unmodified string on purpose.
        // pug already escapes the html when compiling
        // TO-DO: It still goes in the database. Fix it.
    }

    isEmail(target) {
        const {
            email,
        } = target;

        const regExEmail = RegExp('/([^A-Za-z0-9-_@.])+/gi');

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
            throw new Error('The password is too short' +
                'Its length should be between 5 and 30 characters.');
        }
        return true;
    }

    isUsernameCorrect(target) {
        const {
            username,
        } = target;

        this.escapeHtml(username);

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
