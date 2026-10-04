document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.signup-form'); // تحديد الفورم
    const inputs = form.querySelectorAll('.signup-input'); // تحديد جميع حقول الإدخال
    const signupButton = form.querySelector('.btn-signup'); // تحديد زر التسجيل

    // دالة للتحقق من أن جميع الحقول مليئة
    function checkForm() {
        let allFilled = true;
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                allFilled = false;
            }
        });
        signupButton.disabled = !allFilled; // تعطيل الزر إذا لم تكن جميع الحقول مليئة
    }

    // إضافة حدث `input` لكل حقل
    inputs.forEach(input => {
        input.addEventListener('input', checkForm);
    });

    // إضافة حدث `submit` للفورم
    form.addEventListener('submit', function (event) {
        if (signupButton.disabled) {
            event.preventDefault(); // منع إرسال الفورم إذا كان الزر معطلًا
            alert('Please fill out all fields before submitting.');
        }
    });
});