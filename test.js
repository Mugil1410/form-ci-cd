const {
    validateName,
    validateMobile,
    validatePAN,
    validateForm
} = require("./app");

let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        if (fn()) {
            console.log("✅ PASS:", name);
            passed++;
        } else {
            console.log("❌ FAIL:", name);
            failed++;
        }
    } catch (e) {
        console.log("❌ ERROR:", name);
        failed++;
    }
}

// TEST CASES

test("Valid Name", () => validateName("Boohey") === true);
test("Invalid Name", () => validateName("A") === false);

test("Valid Mobile", () => validateMobile("9876543210") === true);
test("Invalid Mobile", () => validateMobile("12345") === false);

test("Valid PAN", () => validatePAN("ABCDE1234F") === true);
test("Invalid PAN", () => validatePAN("12345") === false);

// FULL FORM TEST
test("Full Valid Form", () =>
    validateForm("Boohey", "9876543210", "ABCDE1234F").valid === true
);

test("Full Invalid Form", () =>

    validateForm("A", "123", "ABCDE1234").valid === false
);

// REPORT
console.log("\n========== CI TEST REPORT ==========");
console.log("Total Tests:", passed + failed);
console.log("Passed:", passed);
console.log("Failed:", failed);

if (failed > 0) {
    process.exit(1); // fail CI pipeline
}