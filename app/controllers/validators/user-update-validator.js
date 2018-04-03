const GenericValidator = require('./generic-validator');

class UserUpdateValidator extends GenericValidator {
    constructor() {
        super();
    }

    /* TO-DO: Add validation. */
    isDescriptionCorrect(data) {
        let {
            description,
        } = data;

        description = this.escapeHtml(description);

        return true;
    }

    isFirstNameCorrect(data) {
        let firstName = data.first_name;
        firstName = this.escapeHtml(firstName);

        if (firstName.length > 30) {
            throw new Error(
                'First name\'s length should not be more than 30 characters');
        }

        const regExName = new RegExp(/([^A-Za-z])+/gi);
        if (regExName.test(firstName)) {
            throw new Error('Your first name contains forbidden characters.');
        }

        return true;
    }

    isLastNameCorrect(data) {
        let lastName = data.last_name;
        lastName = this.escapeHtml(lastName);

        if (lastName.length > 30) {
            throw new Error(
                'Last name\'s length should not be more than 30 characters');
        }

        const regExName = new RegExp(/([^A-Za-z])+/gi);
        if (regExName.test(lastName)) {
            throw new Error('Your last name contains forbidden characters.');
        }
        return true;
    }

    isBirthdayCorrect(data) {
        let {
            birthday,
        } = data;
        birthday = this.escapeHtml(birthday);

        const regExDate = new RegExp(/([^A-Za-z0-9-_])+/gi);
        if (regExDate.test(birthday)) {
            throw new Error('You\'re trying to submit invalid birthday date.');
        }
        return true;
    }

    isAddressCorrect(data) {
        let {
            address,
        } = data;
        address = this.escapeHtml(address);

        const regExAddress = new RegExp(/([^#'"A-Za-z0-9-_, ])+/gi);
        if (regExAddress.test(address)) {
            throw new Error('Your address contains invalid characters');
        }

        if (address.length > 100) {
            throw new Error(
                'Address\'s length should not be more than 100 characters');
        }

        return true;
    }
}

module.exports = UserUpdateValidator;
