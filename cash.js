const cardNumberInput = document.getElementById('number');
const expiryDateInput = document.getElementById('expiry-date');
const cvvInput = document.getElementById('cvv');
const fullNameInput = document.getElementById('name');
const checkoutButton = document.getElementById('checkoutbtn');

expiryDateInput.addEventListener('input', () => {
    let value = expiryDateInput.value.replace(/\D/g, '');
    if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    expiryDateInput.value = value;
});

cvvInput.addEventListener('input', () => {
    cvvInput.value = cvvInput.value.replace(/[^0-9]/g, '').slice(0, 3);
});

cardNumberInput.addEventListener('input', () => {
    cardNumberInput.value = cardNumberInput.value.replace(/\D/g, '').slice(0, 16);
});

fullNameInput.addEventListener('input', () => {
    fullNameInput.value = fullNameInput.value.replace(/[^a-zA-Z\s]/g, '');
});

const validateInputs = () => {
    const isFullNameFilled = fullNameInput.value.trim() !== '';
    const isCardNumberValid = cardNumberInput.value.replace(/\s+/g, '').length === 16;
    const isExpiryDateValid = /^\d{2}\/\d{2}$/.test(expiryDateInput.value);
    const isCvvValid = cvvInput.value.length === 3;

    checkoutButton.disabled = !(isFullNameFilled && isCardNumberValid && isExpiryDateValid && isCvvValid);
};

[cardNumberInput, expiryDateInput, cvvInput, fullNameInput].forEach(input => {
    input.addEventListener('input', validateInputs);
});

checkoutButton.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = "otp.html";
});