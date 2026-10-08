 const form = document.querySelector('.form');
    const phoneInput = document.getElementById('phone');
    const submitButton = form.querySelector('button[type="submit"]');

    function formatPhone(value) {
        let digits = value.replace(/\D/g, '');

        if (digits.startsWith('375')) {
            digits = digits.slice(3);
        }

        if (digits.startsWith('8')) {
            digits = digits.slice(1);
        }
        digits = digits.slice(0, 9);

        if (!digits) {
            return '';
        }

        let result = '+375 (';

        result += digits.slice(0, 2);

        if (digits.length >= 2) {
            result += ')';
        }

        if (digits.length > 2) {
            result += ` ${digits.slice(2, 5)}`;
        }

        if (digits.length > 5) {
            result += `-${digits.slice(5, 7)}`;
        }

        if (digits.length > 7) {
            result += `-${digits.slice(7, 9)}`;
        }

        return result;
    }

    phoneInput.addEventListener('input', () => {
        phoneInput.value = formatPhone(phoneInput.value);

        phoneInput.setCustomValidity('');
    });

    phoneInput.addEventListener('blur', () => {
        if (
            phoneInput.value &&
            !phoneInput.checkValidity()
        ) {
            phoneInput.setCustomValidity(
                'Введите номер в формате +375 (29) 123-45-67'
            );
        } else {
            phoneInput.setCustomValidity('');
        }
    });

    form.addEventListener('submit', (event) => {
        if (!form.checkValidity()) {
            event.preventDefault();
            form.reportValidity();
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = 'Отправляем...';
    });