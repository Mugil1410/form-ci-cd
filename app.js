function validateName(name) {
    return name && name.trim().length > 2;
}

function validateMobile(mobile) {
    return /^[0-9]{10}$/.test(mobile);
}

function validatePAN(pan) {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
}

// main validation function
function validateForm(name, mobile, pan) {

    if (!validateName(name)) {
        return { valid: false, message: "Invalid Name" };
    }

    if (!validateMobile(mobile)) {
        return { valid: false, message: "Invalid Mobile" };
    }

    if (!validatePAN(pan)) {
        return { valid: false, message: "Invalid PAN" };
    }

    return { valid: true, message: "All Valid" };
}

// export for CI (Node.js)
if (typeof module !== "undefined") {
    module.exports = {
        validateName,
        validateMobile,
        validatePAN,
        validateForm
    };
}