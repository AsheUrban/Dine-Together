export const validateSignUp = (username, email, password, passwordConfirm) => {
    const errors = {};

    if(!username.trim()) {
        errors.username = 'Username is required.';
    }

    if(!email.trim()) {
        errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Please enter a valid email';
    }

    if(!password) {
        errors.password = 'Password is required';
    } else if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters.';
    } else if (password.length > 72) {
        errors.password = 'Password must be no more than 72 characters.';
    } else {
        // eslint-disable-next-line no-useless-escape
        const specialCharCount = (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/g) || []).length;
        if(specialCharCount < 2) {
            errors.password = 'Password must include at least 2 special characters.';
        }
    }

    if(!passwordConfirm) {
        errors.passwordConfirm = 'Please confirm your password.';
    } else if (password !== passwordConfirm) {
        errors.passwordConfirm = 'Passwords do not match.';
    }

    return Object.keys(errors).length === 0 ? null : errors;
};

export const validateSignIn = (email, password) => {
    const errors = {};

    if(!email.trim()) {
        errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Please enter a valid email.';
    }

    if(!password) {
        errors.password = 'Password is required.';
    }

    return Object.keys(errors).length === 0 ? null : errors;
};
