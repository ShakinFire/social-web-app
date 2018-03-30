const GenericValidator = require('./generic-validator');

class UserUpdateValidator extends GenericValidator {
    constructor() {
        super();
    }

    /* TO-DO: Add validation. */
    isDescriptionCorrect() {
        return true;
    }

    isFirstNameCorrect() {
        return true;
    }

    isLastNameCorrect() {
        return true;
    }

    isBirthdayCorrect() {
        return true;
    }

    isAddressCorrect() {
        return true;
    }
}

module.exports = UserUpdateValidator;
