const btnRegister = document.getElementById('btnRegister');
const selectRole = document.getElementById('select_role');
const inputUsername = document.getElementById('input_username');
const inputPassword = document.getElementById('input_password');
const inputRepeatPassword = document.getElementById('input_repeat_password');
const regexUsername = /^[a-zA-Z0-9]+$/;
const regexPassword = /^[^=;"]+$/;
const baseUrl = 'http://localhost:8081';
const divErrorMessage = document.getElementById('error_message');

function validateUsername() {
    if (regexUsername.test(inputUsername.value)) {
        inputUsername.classList.remove('is-invalid');
    } else {
        inputUsername.classList.add('is-invalid');
    }
}

function validatePassword() {
    if (regexPassword.test(inputPassword.value)) {
        inputPassword.classList.remove('is-invalid');
    } else {
        inputPassword.classList.add('is-invalid');
    }
}

inputUsername.addEventListener('blur', validateUsername);
inputPassword.addEventListener('blur', validatePassword);

function validateForm() {
    if (regexUsername.test(inputUsername.value) && regexPassword.test(inputPassword.value)) {
        return true;
    }
    return false;
}

btnRegister.addEventListener('click', async () => {
    if (validateForm()) {
        if (inputPassword.value === inputRepeatPassword.value) {
            const response = await fetch(`${baseUrl}/registry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: inputUsername.value,
                    password: inputPassword.value,
                    role: selectRole.value
                })
            });

            if (response.ok) {
                if (selectRole.value === 'user')
                    window.location.href = 'inicio.html';
                else {
                    window.location.href = 'admin.html';
                }
            } else {
                divErrorMessage.textContent = errorData.message;
            }
        } else {
            divErrorMessage.textContent = 'Las contraseñas no coinciden';
        }
    }
});