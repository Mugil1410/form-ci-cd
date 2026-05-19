function validateName(name) {
    return name.trim().length >= 3;
}

function validateMobile(mobile) {
    return /^[0-9]{10}$/.test(mobile);
}

function validatePAN(pan) {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
}

function validateForm(name, mobile, pan) {

    if (!validateName(name)) {
        return {
            valid: false,
            message: "Invalid Name"
        };
    }

    if (!validateMobile(mobile)) {
        return {
            valid: false,
            message: "Invalid Mobile Number"
        };
    }

    if (!validatePAN(pan)) {
        return {
            valid: false,
            message: "Invalid PAN Number"
        };
    }

    return {
        valid: true,
        message: "Form Submitted Successfully"
    };
}

function submitForm() {

    const name = document.getElementById("name").value;

    const mobile = document.getElementById("mobile").value;

    const pan = document.getElementById("pan").value;

    const result = validateForm(name, mobile, pan);

    const messageDiv = document.getElementById("message");

    if (result.valid) {

        messageDiv.innerHTML =
            `<div class="success">${result.message}</div>`;

    } else {

        messageDiv.innerHTML =
            `<div class="error">${result.message}</div>`;
    }
}

// export for Node.js testing
if (typeof module !== "undefined") {

    module.exports = {
        validateName,
        validateMobile,
        validatePAN,
        validateForm
    };
}