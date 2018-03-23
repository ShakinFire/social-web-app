class AuthController {
    constructor(data) {
        this.data = data;
    }

    isLoggedIn(user) {
        if (user) {
            return true;
        }
        return false;
    }

    register(user) {
       if (this._validate(user)) {
            user.password = user.password[0];
            this.data.user.createCol(user);
            return user;
       }
       return false;
    }

    _validate(user) {
        // TO-DO: when isValid === false return additional information
        // about the check which failed. Put the "failed check" 's name
        // as property of an object.

        let isValid = true;
        const genericValidation = (textValue) => {
            // TO-DO: generic validation.
        };

        const keys = Object.keys(user);
        keys.forEach((key) => {
            const value = user[key];

            // Check if input is valid (secured)
            // A check that will be applied to every property
            if (genericValidation(value)) {
                isValid = false;
                return;
            }

            // doing the property-specific checks.
            switch (key) {
                case 'username':
                    const username = user[key];

                    if (!(2 < username.length && username.length < 31)) {
                        isValid = false;
                    }

                    const regExUser = RegExp('/([^A-Za-z0-9-_])+/gi');
                    if (regExUser.test(username)) {
                        isValid = false;
                    }
                    break;

                case 'password':
                    const passwordFields = user[key];
                    const password = passwordFields[0];

                    if (passwordFields[0] !== passwordFields[1]) {
                        isValid = false;
                    }
                    if (!(5 < password.length && password.length < 31)) {
                        isValid = false;
                    }
                    break;

                case 'email':
                    const email = user[key];
                    const regExEmail = RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');

                    if (regExEmail.test(email)) {
                        isValid = false;
                    }

                    if (!(8 < email.length && email.length < 100)) {
                        isValid = false;
                    }
                    break;

                default:
                    break;
            }
        });

        return isValid;
    }
}

module.exports = AuthController;
